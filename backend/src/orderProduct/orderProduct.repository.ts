import { Injectable } from "@nestjs/common";
import { PrismaService } from "../framework/database/PrismaService";

export interface IOrderProductRepository {

}

@Injectable()
export class OrderProductRepository implements IOrderProductRepository {
  constructor(private readonly mPrismaDatabase: PrismaService) {
  }



}