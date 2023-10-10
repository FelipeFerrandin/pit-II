import { Injectable } from "@nestjs/common";
import { PrismaService } from "../framework/database/PrismaService";

export interface ICustomerRepository {

}

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(private readonly mPrismaDatabase: PrismaService) {
  }



}