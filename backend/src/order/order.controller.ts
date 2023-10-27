import { Controller, Inject } from "@nestjs/common";
import { IOrderService } from "./order.service";

@Controller()
export class OrderController {
  constructor(
    @Inject("IOrderService") private readonly mOrderService: IOrderService
  ) {

    //TODO listagem de ordens realizadas
  }

}
