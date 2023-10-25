import { Inject, Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { IOrderService } from "./order.service";

@Injectable()
export class OrderJob {

  constructor(
    @Inject("IOrderService") private readonly mOrderService: IOrderService
  ) {
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async finishPendingOrders() {
    await this.mOrderService.finishPendingOrders();
  }
}