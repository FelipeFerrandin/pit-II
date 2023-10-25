import { Inject, Injectable } from "@nestjs/common";
import { IOrderRepository } from "./order.repository";
import { IOrderProductService } from "../orderProduct/orderProduct.service";
import { OrderCreateDTO } from "./order.dto";
import { IProductService } from "../product/product.service";
import { BusinessRuleException } from "../framework/error/BusinessRuleException";
import { TransactionManager } from "../framework/database/TransactionManager";
import { order as Order } from "@prisma/client";


export interface IOrderService {
  create(aIdCustomer: bigint, aOrderCreateDTO: OrderCreateDTO): Promise<void>;

  finishPendingOrders(): Promise<void>;
}

@Injectable()
export class OrderService implements IOrderService {

  constructor(
    @Inject("IOrderRepository") private readonly mOrderRepository: IOrderRepository,
    @Inject("IOrderProductService") private readonly mOrderProductService: IOrderProductService,
    @Inject("IProductService") private readonly mProductService: IProductService,
    private readonly mTransactionManager: TransactionManager
  ) {
  }

  async create(aIdCustomer: bigint, aOrderCreateDTO: OrderCreateDTO): Promise<void> {
    return await this.mTransactionManager.run(async () => {
      const lOrder = await this.mOrderRepository.create(aIdCustomer, aOrderCreateDTO.id_customer_address);
      let lTotal = 0.0;

      for (const iOrderCreateProductDTO of aOrderCreateDTO.products) {

        const lProductDTO = await this.mProductService.getById(iOrderCreateProductDTO.id_product);

        if (iOrderCreateProductDTO.quantity > lProductDTO.quantity) throw new BusinessRuleException("Product is out of stock");

        lTotal += lProductDTO.price * iOrderCreateProductDTO.quantity;

        await this.mOrderProductService.create(
          lOrder.id_order, {
            id_product: iOrderCreateProductDTO.id_product,
            subtotal: lProductDTO.price * iOrderCreateProductDTO.quantity,
            quantity: iOrderCreateProductDTO.quantity
          });

        // await this.mProductService.updateQuantityById(iOrderCreateProductDTO.id_product, lProductDTO.quantity - iOrderCreateProductDTO.quantity)
      }

      await this.mOrderRepository.updateTotalValue(lOrder.id_order, lTotal);

    });
  }

  async finishPendingOrders() {
    const lListOrders = await this.mOrderRepository.findFinishPendingOrders();
    for (const iOrder of lListOrders) {
      await this.mOrderRepository.finish(iOrder.id_order);
    }
  }
}