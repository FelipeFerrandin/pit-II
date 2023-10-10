import { Inject, Injectable } from "@nestjs/common";
import { IProductRepository } from "./product.repository";


export interface IProductService {
  getHello(): string;
}

@Injectable()
export class ProductService implements IProductService {

  constructor(
    @Inject("IProductRepository") private readonly mProductRepository: IProductRepository
  ) {
  }

  getHello(): string {
    return "Hello World!";
  }
}