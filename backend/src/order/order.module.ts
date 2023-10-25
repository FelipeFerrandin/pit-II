import { Global, Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderRepository } from "./order.repository";
import { OrderService } from "./order.service";
import { OrderJob } from "./order.job";

@Global()
@Module({
  imports: [],
  controllers: [OrderController],
  providers: [
    OrderJob,
    {
      provide: "IOrderRepository",
      useClass: OrderRepository
    },
    {
      provide: "IOrderService",
      useClass: OrderService
    }],
  exports: [
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