import { Inject, Injectable } from "@nestjs/common";
import { IOrderRepository } from "./order.repository";
import { IOrderProductService } from "../orderProduct/orderProduct.service";
import { OrderCreateDTO } from "./order.dto";
import { IProductService } from "../product/product.service";
import { BusinessRuleException } from "../framework/error/BusinessRuleException";


export interface IOrderService {
}

@Injectable()
export class OrderService implements IOrderService {

  constructor(
    @Inject("IOrderRepository") private readonly mOrderRepository: IOrderRepository,
    @Inject("IOrderProductService") private readonly mOrderProductService: IOrderProductService,
    @Inject("IProductService") private readonly mProductService: IProductService
  ) {
  }

  async create(aIdCustomer: bigint, aOrderCreateDTO: OrderCreateDTO): Promise<void> {
    //TODO colocar em uma transacao
    const lOrder = await this.mOrderRepository.create(aIdCustomer);

    for (const iOrderCreateProductDTO of aOrderCreateDTO.products) {

      const lProductDTO = await this.mProductService.getById(iOrderCreateProductDTO.id_product);

      if (iOrderCreateProductDTO.quantity > lProductDTO.quantity) throw new BusinessRuleException("Product is out of stock");

      await this.mOrderProductService.create(
        lOrder.id_order, {
          id_product: iOrderCreateProductDTO.id_product,
          subtotal: lProductDTO.price * iOrderCreateProductDTO.quantity,
          quantity: iOrderCreateProductDTO.quantity
        });

    }

  }


  //TODO fazer um servico para finalizar pedido pendente

}