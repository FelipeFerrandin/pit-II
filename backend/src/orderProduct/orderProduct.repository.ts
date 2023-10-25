import { Injectable } from "@nestjs/common";
import { PrismaService } from "../framework/database/PrismaService";
import { order_product as OrderProduct } from "@prisma/client";

export interface IOrderProductRepository {
  create(aIdOrder: bigint, aOrderProductCreateDTO: OrderProductCreateDTO): Promise<OrderProduct>;

  findProductsInOrderByIdOrder(aIdOrder: number): Promise<OrderProduct[]>;
}

@Injectable()
export class OrderProductRepository implements IOrderProductRepository {
  constructor(private readonly mPrismaDatabase: PrismaService) {
  }

  async create(aIdOrder: bigint, aOrderProductCreateDTO: OrderProductCreateDTO): Promise<OrderProduct> {
    return this.mPrismaDatabase.order_product.create({
      data: {
        id_order: aIdOrder,
        id_product: aOrderProductCreateDTO.id_product,
        subtotal: aOrderProductCreateDTO.subtotal,
        quantity: aOrderProductCreateDTO.quantity
      }
    });
  }

  async findProductsInOrderByIdOrder(aIdOrder: number): Promise<OrderProduct[]> {
    return this.mPrismaDatabase.order_product.findMany({
      where: {
        id_order: aIdOrder
      }
    });
  }

}