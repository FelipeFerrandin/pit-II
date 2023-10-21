import { Global, Module } from "@nestjs/common";
import { CustomerAddressRepository } from "./customerAddress.repository";
import { CustomerAddressService } from "./customerAddress.service";

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: "ICustomerAddressRepository",
      useClass: CustomerAddressRepository
    },
    {
      provide: "ICustomerAddressService",
      useClass: CustomerAddressService
    }],
  exports: [
    {
      provide: "ICustomerAddressRepository",
      useClass: CustomerAddressRepository
    },
    {
      provide: "ICustomerAddressService",
      useClass: CustomerAddressService
    }
  ]
})
export class CustomerAddressModule {
}