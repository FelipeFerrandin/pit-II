import { Inject, Injectable } from "@nestjs/common";
import { ICustomerRepository } from "./customer.repository";


export interface ICustomerService {
  getHello(): string;
}

@Injectable()
export class CustomerService implements ICustomerService {

  constructor(
    @Inject('ICustomerRepository') private readonly mCustomerRepository: ICustomerRepository
  ) {}

  getHello(): string {
    return "Hello World!";
  }
}