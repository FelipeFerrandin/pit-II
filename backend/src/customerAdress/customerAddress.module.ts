import { Module } from "@nestjs/common";
import { CustomerAddressController } from "./customerAddress.controller";
import { CustomerAddressRepository } from "./customerAddress.repository";
import { CustomerAddressService } from "./customerAddress.service";

@Module({
  imports: [],
  controllers: [CustomerAddressController],
  providers: [
    {
      provide: "ICustomerAddressRepository",
      useClass: CustomerAddressRepository
    },
    {
      provide: "ICustomerAddressService",
      useClass: CustomerAddressService
    }]
})
export class CustomerAddressModule {
}