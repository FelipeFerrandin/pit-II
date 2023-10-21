import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from "@nestjs/common";
import { IProductService } from "./product.service";
import { ProductCreateDTO, ProductUpdateDTO } from "./product.dto";

@Controller("product")
export class ProductController {
  constructor(
    @Inject("IProductService") private readonly mProductService: IProductService
  ) {
  }

  @Get()
  listAll(
    @Query("productName") aProductName: string,
    @Query("skip") aSkip: number,
    @Query("take") aTake: number
  ) {
    return this.mProductService.listAll(aSkip, aTake, aProductName);
  }

  @Get("/:aIdProduct")
  getById(@Param("aIdProduct") aIdProduct: bigint) {
    return this.mProductService.getById(aIdProduct);
  }

  @Post()
  create(@Body() aProductCreateDTO: ProductCreateDTO) {
    return this.mProductService.create(aProductCreateDTO);
  }

  @Put()
  update(@Body() aProductUpdateDTO: ProductUpdateDTO) {
    return this.mProductService.update(aProductUpdateDTO);
  }

  @Delete("/:aIdProduct")
  delete(@Param("aIdProduct") aIdProduct: number) {
    return this.mProductService.delete(aIdProduct);
  }


}
