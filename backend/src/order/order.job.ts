import { Inject, Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { IOrderService } from "./order.service";

@Injectable()
export class OrderJob {

  constructor(
    @Inject("IOrderService") private readonly mOrderService: IOrderService
  ) {
  }

  @Cron("60 * * * * *")
  async finishPendingOrders() {
    await this.mOrderService.finishPendingOrders();
  }
}