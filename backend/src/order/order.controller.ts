import { Controller, Get, Inject } from "@nestjs/common";
import { IOrderService } from "./order.service";

@Controller()
export class OrderController {
  constructor(
    @Inject("IOrderService") private readonly mOrderService: IOrderService
  ) {
  }

  @Get()
  getHello(): string {
    return this.mOrderService.getHello();
  }
}
