import { Module } from "@nestjs/common";
import { CustomerModule } from "./customer/customer.module";
import { PrismaModule } from "./framework/database/PrismaModule";
import { CustomerAddressModule } from "./customerAdress/customerAddress.module";
import { OrderProductModule } from "./orderProduct/orderProduct.module";
import { ProductModule } from "./product/product.module";

@Module({
  imports: [
    PrismaModule,
    CustomerModule,
    CustomerAddressModule,
    OrderProductModule,
    ProductModule
  ]
})
export class AppModule {
}
