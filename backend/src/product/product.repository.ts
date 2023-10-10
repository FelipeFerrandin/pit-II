import { Injectable } from "@nestjs/common";
import { PrismaService } from "../framework/database/PrismaService";

export interface IProductRepository {

}

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(private readonly mPrismaDatabase: PrismaService) {
  }



}