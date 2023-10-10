import { Inject, Injectable } from "@nestjs/common";
import { ICustomerAddressRepository } from "./customerAddress.repository";


export interface ICustomerAddressService {
  getHello(): string;
}

@Injectable()
export class CustomerAddressService implements ICustomerAddressService {

  constructor(
    @Inject("ICustomerAddressRepository") private readonly mCustomerAddressRepository: ICustomerAddressRepository
  ) {
  }

  getHello(): string {
    return "Hello World!";
  }
}