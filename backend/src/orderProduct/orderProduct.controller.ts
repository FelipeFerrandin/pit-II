import { Controller, Get, Inject } from "@nestjs/common";
import { IOrderProductService } from "./orderProduct.service";

@Controller()
export class OrderProductController {
  constructor(
    @Inject("IOrderProductService") private readonly mOrderProductService: IOrderProductService
  ) {
  }

  @Get()
  getHello(): string {
    return this.mOrderProductService.getHello();
  }
}
