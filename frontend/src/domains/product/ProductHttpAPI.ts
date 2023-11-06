import HttpProvider from "@/framework/provider/HttpProvider";
import type { AxiosResponse } from "axios";
import { ProductDTO } from "@/domains/product/ProductDTO";

export  default class ProductHttpAPI {
  private httpProvider: HttpProvider;

  constructor() {
    this.httpProvider = new HttpProvider();
  }

  public listProducts(): Promise<AxiosResponse<ProductDTO[]>> {
    return this.httpProvider.axiosInstanceBase.get(`/product?productName=%%&skip=0&take=1000`);
  }

  public getProductById(aIdProduct: number): Promise<AxiosResponse<ProductDTO>> {
    return this.httpProvider.axiosInstanceBase.get(`/product/${aIdProduct}`);
  }
}