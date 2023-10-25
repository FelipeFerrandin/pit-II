import { Global, Module } from "@nestjs/common";
import { OrderProductRepository } from "./orderProduct.repository";
import { OrderProductService } from "./orderProduct.service";

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: "IOrderProductRepository",
      useClass: OrderProductRepository
    },
    {
      provide: "IOrderProductService",
      useClass: OrderProductService
    }],
  exports: [
    {
      provide: "IOrderProductRepository",
      useClass: OrderProductRepository
    },
    {
      provide: "IOrderProductService",
      useClass: OrderProductService
    }]
})
export class OrderProductModule {
}