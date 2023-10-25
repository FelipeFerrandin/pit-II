import { Inject, Injectable } from "@nestjs/common";
import { IProductRepository } from "./product.repository";
import { ProductCreateDTO, ProductDTO, ProductUpdateDTO } from "./product.dto";
import { product as Product } from "@prisma/client";
import { BusinessRuleException } from "../framework/error/BusinessRuleException";
import { EntityNotFoundException } from "../framework/error/EntityNotFoundException";


export interface IProductService {
  listAll(aSkip: number, aTake: number, aNameProduct: string): Promise<ProductDTO[]>;

  getById(aIdProduct: bigint): Promise<ProductDTO>;

  create(aProductCreateDTO: ProductCreateDTO): Promise<Product>;

  updateQuantityById(aIdProduct: bigint, aQuantity: number): Promise<Product>;

  update(aProductCreateDTO: ProductUpdateDTO): Promise<Product>;

  delete(aIdProduct: bigint): Promise<Product>;
}

@Injectable()
export class ProductService implements IProductService {

  constructor(
    @Inject("IProductRepository") private readonly mProductRepository: IProductRepository
  ) {
  }

  async create(aProductCreateDTO: ProductCreateDTO): Promise<Product> {
    return this.mProductRepository.create(aProductCreateDTO);
  }

  async delete(aIdProduct: bigint): Promise<Product> {
    await this.getById(aIdProduct)
    return this.mProductRepository.delete(aIdProduct);
  }

  async update(aProductCreateDTO: ProductUpdateDTO): Promise<Product> {
    await this.getById(aProductCreateDTO.id_product)
    return this.mProductRepository.update(aProductCreateDTO);
  }

  async updateQuantityById(aIdProduct: bigint, aQuantity: number): Promise<Product> {
    if (aQuantity < 0) throw new BusinessRuleException("Invalid quantity reported");
    await this.getById(aIdProduct)
    return this.mProductRepository.updateQuantityById(aIdProduct, aQuantity);
  }

  async getById(aIdProduct: bigint): Promise<ProductDTO> {
    const lProduct = await this.mProductRepository.getById(aIdProduct);
    if (lProduct == null) throw new EntityNotFoundException(`product not found with ID ${aIdProduct}`);

    return {
      id_product: lProduct.id_product,
      name: lProduct.name,
      price: lProduct.price.toNumber(),
      description: lProduct.description,
      quantity: lProduct.quantity,
      image_base64: lProduct.image_base64
    };
  }

  async listAll(aSkip: number, aTake: number, aNameProduct: string): Promise<ProductDTO[]> { //TODO objeto de paginacao
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