import { Module } from "@nestjs/common";
import { CustomerModule } from "./customer/customer.module";
import { PrismaModule } from "./framework/database/PrismaModule";
import { CustomerAddressModule } from "./customerAdress/customerAddress.module";
import { OrderProductModule } from "./orderProduct/orderProduct.module";
import { ProductModule } from "./product/product.module";
import { ScheduleModule } from "@nestjs/schedule";
import { OrderModule } from "./order/order.module";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PrismaModule,
    CustomerAddressModule,
    CustomerModule,
    OrderProductModule,
    ProductModule,
    OrderModule
  ]
})
export class AppModule {
}
