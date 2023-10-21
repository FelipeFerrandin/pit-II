import { Global, Module } from "@nestjs/common";
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";
import { CustomerRepository } from "./customer.repository";

@Global()
@Module({
  controllers: [CustomerController],
  providers: [
    {
      provide: "ICustomerRepository",
      useClass: CustomerRepository
    },
    {
      provide: "ICustomerService",
      useClass: CustomerService
    }
  ],
  exports : [
    {
      provide: "ICustomerRepository",
      useClass: CustomerRepository
    },
    {
      provide: "ICustomerService",
      useClass: CustomerService
    }
  ]
})
export class CustomerModule {
}