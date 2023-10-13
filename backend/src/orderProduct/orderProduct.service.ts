import { Inject, Injectable } from "@nestjs/common";
import { IOrderProductRepository } from "./orderProduct.repository";


export interface IOrderProductService {
  create(aIdOrder: bigint, aOrderProductCreateDTO: OrderProductCreateDTO): Promise<void>;

  findProductsInOrderByIdOrder(aIdOrder: number): Promise<OrderProductDTO[]>;
}

@Injectable()
export class OrderProductService implements IOrderProductService {

  constructor(
    @Inject("IOrderProductRepository") private readonly mOrderProductRepository: IOrderProductRepository
  ) {
  }

  async create(aIdOrder: bigint, aOrderProductCreateDTO: OrderProductCreateDTO): Promise<void> {
    return this.mOrderProductRepository.create(aIdOrder, aOrderProductCreateDTO);
  }

  async findProductsInOrderByIdOrder(aIdOrder: number): Promise<OrderProductDTO[]> {
    const lListOrderProductDTO = await this.mOrderProductRepository.findProductsInOrderByIdOrder(aIdOrder);
    return lListOrderProductDTO.map((iOrderProduct) => <OrderProductDTO><unknown>{
      id_order_product: iOrderProduct.id_order_product,
      id_product: iOrderProduct.id_product,
      id_order: iOrderProduct.id_order,
      subtotal: iOrderProduct.subtotal,
      quantity: iOrderProduct.quantity
    });
  }


}