import { Module } from "@nestjs/common";
import { OrderProductController } from "./orderProduct.controller";
import { OrderProductRepository } from "./orderProduct.repository";
import { OrderProductService } from "./orderProduct.service";

@Module({
  imports: [],
  controllers: [OrderProductController],
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