import { Inject, Injectable } from "@nestjs/common";
import { IProductRepository } from "./product.repository";
import { ProductCreateDTO, ProductDTO, ProductUpdateDTO } from "./product.dto";


export interface IProductService {
  listAll(aSkip: number, aTake: number, aNameProduct: string): Promise<ProductDTO[]>;

  getById(aIdProduct: bigint): Promise<ProductDTO>;

  create(aProductCreateDTO: ProductCreateDTO): Promise<void>;

  updateQuantityById(aIdProduct: number, aQuantity: number): Promise<void>;

  update(aProductCreateDTO: ProductUpdateDTO): Promise<void>;

  delete(aIdProduct: number): Promise<void>;
}

@Injectable()
export class ProductService implements IProductService {

  constructor(
    @Inject("IProductRepository") private readonly mProductRepository: IProductRepository
  ) {
  }

  async create(aProductCreateDTO: ProductCreateDTO): Promise<void> {
    return this.mProductRepository.create(aProductCreateDTO);
  }

  async delete(aIdProduct: number): Promise<void> {
    return this.mProductRepository.delete(aIdProduct);
  }

  async update(aProductCreateDTO: ProductUpdateDTO): Promise<void> {
    return this.mProductRepository.update(aProductCreateDTO);
  }

  async updateQuantityById(aIdProduct: number, aQuantity: number): Promise<void> {
    return this.mProductRepository.updateQuantityById(aIdProduct, aQuantity);
  }

  async getById(aIdProduct: bigint): Promise<ProductDTO> {
    const lProduct = await this.mProductRepository.getById(aIdProduct);
    return {
      id_product: lProduct.id_product,
      name: lProduct.name,
      price: lProduct.price.toNumber(),
      description: lProduct.description,
      quantity: lProduct.quantity,
      image_base64: lProduct.image_base64
    };
  }

  async listAll(aSkip: number, aTake: number, aNameProduct: string): Promise<ProductDTO[]> {
    const lListProduct = await this.mProductRepository.listAll(aSkip, aTake, aNameProduct);
    return lListProduct.map((iProduct) => <ProductDTO>{
      id_product: iProduct.id_product,
      name: iProduct.name,
      price: iProduct.price.toNumber(),
      description: iProduct.description,
      quantity: iProduct.quantity,
      image_base64: iProduct.image_base64
    });
  }

}