import { Module } from "@nestjs/common";
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";
import { CustomerRepository } from "./customer.repository";

@Module({
  imports: [],
  controllers: [CustomerController],
  providers: [
    {
      provide: 'ICustomerRepository',
      useClass: CustomerRepository
    },
    {
    provide: "ICustomerService",
    useClass: CustomerService
  }]
})
export class CustomerModule {
}