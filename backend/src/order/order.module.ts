import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderRepository } from "./order.repository";
import { OrderService } from "./order.service";

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [
    {
      provide: "IOrderRepository",
      useClass: OrderRepository
    },
    {
      provide: "IOrderService",
      useClass: OrderService
    }]
})
export class OrderModule {
}