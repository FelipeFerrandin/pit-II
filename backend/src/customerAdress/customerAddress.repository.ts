import { Injectable } from "@nestjs/common";
import { PrismaService } from "../framework/database/PrismaService";

export interface ICustomerAddressRepository {

}

@Injectable()
export class CustomerAddressRepository implements ICustomerAddressRepository {
  constructor(private readonly mPrismaDatabase: PrismaService) {
  }



}