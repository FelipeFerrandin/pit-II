import { Injectable } from "@nestjs/common";
import { PrismaService } from "../framework/database/PrismaService";
import { YesNo } from "../framework/constants/ApplicationConstants";
import { OrderEnum } from "./order.enum";
import { order as Order } from "@prisma/client";

export interface IOrderRepository {
  create(aIdCustomer: bigint, aIdCustomerAddress: number): Promise<Order>;

  updateTotalValue(aIdOrder: bigint, aTotal: number): Promise<Order>;

  finish(aIdOrder: bigint): Promise<Order>;

  findFinishPendingOrders(): Promise<Order[]>;

  findFinishOrders(aIdCustomer: number): Promise<Order[]>;
}

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(private readonly mPrismaDatabase: PrismaService) {
  }

  async updateTotalValue(aIdOrder: bigint, aTotal: number): Promise<Order> {
    return this.mPrismaDatabase.order.update({
      data: {
        total: aTotal,
        updated_at: new Date()
      },
      where: {
        id_order: aIdOrder
      }
    });
  }

  async create(aIdCustomer: bigint, aIdCustomerAddress: number): Promise<Order> {
    return this.mPrismaDatabase.order.create({
      data: {
        id_customer: aIdCustomer,
        status: OrderEnum.PENDENTE.valueOf(),
        id_customer_address: aIdCustomerAddress,
        total: 0,
        active: YesNo.Yes,
        created_at: new Date(),
        updated_at: new Date()
      }
    });
  }

  async finish(aIdOrder: bigint): Promise<Order> {
    return this.mPrismaDatabase.order.update({
      data: {
        status: OrderEnum.FINALIZADO.valueOf(),
        active: YesNo.Yes,
        updated_at: new Date()
      },
      where: {
        id_order: aIdOrder
      }
    });
  }

  async findFinishPendingOrders(): Promise<Order[]> {
    return this.mPrismaDatabase.order.findMany({
      where: {
        status: OrderEnum.PENDENTE,
        active: YesNo.Yes
      }
    });
  }

  async findFinishOrders(aIdCustomer: number): Promise<Order[]> {
    return this.mPrismaDatabase.order.findMany({
      where: {
        id_customer: aIdCustomer,
        active: YesNo.Yes
      }
    });
  }

}