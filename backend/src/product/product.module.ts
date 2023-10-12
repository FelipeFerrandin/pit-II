import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductRepository } from "./product.repository";
import { ProductService } from "./product.service";

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    {
      provide: "IProductRepository",
      useClass: ProductRepository
    },
    {
      provide: "IProductService",
      useClass: ProductService
    }]
})
export class ProductModule {
}