import { Controller, Get, Inject } from "@nestjs/common";
import { ICustomerService } from "./customer.service";

@Controller()
export class CustomerController {
  constructor(
    @Inject('ICustomerService') private readonly mCustomerService: ICustomerService
  ) {}

  @Get()
  getHello(): string {
    return this.mCustomerService.getHello();
  }
}
