import { Controller, Get, Inject } from "@nestjs/common";
import { IProductService } from "./product.service";

@Controller()
export class ProductController {
  constructor(
    @Inject("IProductService") private readonly mProductService: IProductService
  ) {
  }

  @Get()
  getHello(): string {
    return this.mProductService.getHello();
  }
}
