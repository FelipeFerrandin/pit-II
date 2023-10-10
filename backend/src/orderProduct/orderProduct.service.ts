import { Inject, Injectable } from "@nestjs/common";
import { IOrderProductRepository } from "./orderProduct.repository";


export interface IOrderProductService {
  getHello(): string;
}

@Injectable()
export class OrderProductService implements IOrderProductService {

  constructor(
    @Inject("IOrderProductRepository") private readonly mOrderProductRepository: IOrderProductRepository
  ) {
  }

  getHello(): string {
    return "Hello World!";
  }
}