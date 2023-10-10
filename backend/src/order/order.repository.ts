import { Injectable } from "@nestjs/common";
import { PrismaService } from "../framework/database/PrismaService";

export interface IOrderRepository {

}

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(private readonly mPrismaDatabase: PrismaService) {
  }



}