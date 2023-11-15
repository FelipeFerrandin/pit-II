import { Inject, Injectable } from "@nestjs/common";
import { IOrderRepository } from "./order.repository";
import { IOrderProductService } from "../orderProduct/orderProduct.service";
import { OrderCreateDTO, OrderListDTO } from "./order.dto";
import { IProductService } from "../product/product.service";
import { BusinessRuleException } from "../framework/error/BusinessRuleException";
import { TransactionManager } from "../framework/database/TransactionManager";
import { OrderProductCustomizedDTO } from "../orderProduct/orderProduct.dto";


export interface IOrderService {
  create(aIdCustomer: bigint, aOrderCreateDTO: OrderCreateDTO): Promise<void>;

  finishPendingOrders(): Promise<void>;

  findFinishOrders(aIdCustomer: number): Promise<OrderListDTO[]>;
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

  async findFinishOrders(aIdCustomer: number): Promise<OrderListDTO[]> {
    const lListOrder = await this.mOrderRepository.findFinishOrders(aIdCustomer);
    const lListOrderListDTO: OrderListDTO[] = [];

    for (const iOrder of lListOrder) {
      const lOrderProductsDTO = await this.mOrderProductService.findProductsInOrderByIdOrder(Number(iOrder.id_order));
      const lListOrderProductCustomizedDTO: OrderProductCustomizedDTO[] = [];

      for (const iOrderProductDTO of lOrderProductsDTO) {
        const lProductDTO = await this.mProductService.getById(BigInt(iOrderProductDTO.id_product));
        const lOrderProductCustomizedDTO = <OrderProductCustomizedDTO>{
          id_product: Number(iOrderProductDTO.id_product),
          subtotal: Number(iOrderProductDTO.subtotal),
          id_order_product: Number(iOrderProductDTO.id_order_product),
          quantity: iOrderProductDTO.quantity,
          name: lProductDTO.name,
          description: lProductDTO.description,
          image_base64: lProductDTO.image_base64
        };
        lListOrderProductCustomizedDTO.push(lOrderProductCustomizedDTO)
      }

      const lOrderListDTO = <OrderListDTO><unknown>{
        id_order: Number(iOrder.id_order),
        id_customer: Number(iOrder.id_customer),
        id_customer_address: Number(iOrder.id_customer_address),
        status: iOrder.status,
        total: Number(iOrder.total),
        products: lListOrderProductCustomizedDTO
      };

      lListOrderListDTO.push(lOrderListDTO);

    }

    return lListOrderListDTO;

  }

}