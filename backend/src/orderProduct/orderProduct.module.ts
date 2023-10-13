import { Module } from "@nestjs/common";
import { OrderProductRepository } from "./orderProduct.repository";
import { OrderProductService } from "./orderProduct.service";

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
    }]
})
export class OrderProductModule {
}