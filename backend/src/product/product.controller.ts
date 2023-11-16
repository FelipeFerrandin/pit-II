import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { IProductService } from "./product.service";
import { ProductCreateDTO, ProductUpdateDTO } from "./product.dto";
import { AuthGuard } from "../framework/util/AuthGuard";

@Controller("product")
export class ProductController {
  constructor(
    @Inject("IProductService") private readonly mProductService: IProductService
  ) {
  }

  @Get()
  listAll(
    @Query("productName") aProductName: string,
    @Query("skip") aSkip: string,
    @Query("take") aTake: string
  ) {
    return this.mProductService.listAll(+aSkip, +aTake, aProductName);
  }

  @Get("/:aIdProduct")
  getById(@Param("aIdProduct") aIdProduct: string) {
    return this.mProductService.getById(BigInt(+aIdProduct));
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() aProductCreateDTO: ProductCreateDTO) {
    return this.mProductService.create(aProductCreateDTO);
  }

  @Put()
  @UseGuards(AuthGuard)
  update(@Body() aProductUpdateDTO: ProductUpdateDTO) {
    return this.mProductService.update(aProductUpdateDTO);
  }

  @Delete("/:aIdProduct")
  @UseGuards(AuthGuard)
  delete(@Param("aIdProduct") aIdProduct: string) {
    return this.mProductService.delete(BigInt(+aIdProduct));
  }


}
