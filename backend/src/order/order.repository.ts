import { Injectable } from "@nestjs/common";
import { PrismaService } from "../framework/database/PrismaService";
import { YesNo } from "../framework/constants/ApplicationConstants";
import { OrderEnum } from "./order.enum";
import { order as Order } from "@prisma/client";

export interface IOrderRepository {
  create(aIdCustomer: bigint): Promise<Order>;

  finish(aIdCustomer: bigint, aTotal: number): Promise<void>;
}

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(private readonly mPrismaDatabase: PrismaService) {
  }

  async create(aIdCustomer: bigint): Promise<Order> {
    return this.mPrismaDatabase.order.create({
      data: {
        id_customer: aIdCustomer,
        status: OrderEnum.PENDENTE.valueOf(),
        total: 0,
        active: YesNo.Yes,
        created_at: new Date(),
        updated_at: new Date()
      }
    });
  }

  async finish(aIdCustomer: bigint, aTotal: number): Promise<void> {
    this.mPrismaDatabase.order.create({
      data: {
        id_customer: aIdCustomer,
        status: OrderEnum.FINALIZADO.valueOf(),
        total: aTotal,
        active: YesNo.Yes,
        created_at: new Date(),
        updated_at: new Date()
      }
    });
  }

}