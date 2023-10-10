import { Inject, Injectable } from "@nestjs/common";
import { IOrderRepository } from "./order.repository";


export interface IOrderService {
  getHello(): string;
}

@Injectable()
export class OrderService implements IOrderService {

  constructor(
    @Inject("IOrderRepository") private readonly mOrderRepository: IOrderRepository
  ) {
  }

  getHello(): string {
    return "Hello World!";
  }
}