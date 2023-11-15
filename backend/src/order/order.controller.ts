import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { IOrderService } from "./order.service";
import { OrderCreateDTO } from "./order.dto";

@Controller("order")
export class OrderController {
  constructor(
    @Inject("IOrderService") private readonly mOrderService: IOrderService
  ) {
  }

  @Get("/:aIdCustomer")
  getFinishOrders(@Param("aIdCustomer") aIdCustomer: string) {
    return this.mOrderService.findFinishOrders(+aIdCustomer);
  }

  @Post("/:aIdCustomer")
  createOrder(@Param("aIdCustomer") aIdCustomer: string, @Body() aOrderCreateDTO: OrderCreateDTO) {
    return this.mOrderService.create(BigInt(+aIdCustomer), aOrderCreateDTO);
  }

}
