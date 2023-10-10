import { Controller, Get, Inject } from "@nestjs/common";
import { ICustomerAddressService } from "./customerAddress.service";

@Controller()
export class CustomerAddressController {
  constructor(
    @Inject('ICustomerAddressService') private readonly mCustomerAddressService: ICustomerAddressService
  ) {}

  @Get()
  getHello(): string {
    return this.mCustomerAddressService.getHello();
  }
}
