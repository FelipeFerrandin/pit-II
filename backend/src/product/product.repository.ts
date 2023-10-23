import { Injectable } from "@nestjs/common";
import { PrismaService } from "../framework/database/PrismaService";
import { product as Product } from "@prisma/client";
import { YesNo } from "../framework/constants/ApplicationConstants";
import { ProductCreateDTO, ProductUpdateDTO } from "./product.dto";

export interface IProductRepository {
  listAll(aSkip: number, aTake: number, aNameProduct: string): Promise<Product[]>;

  getById(aIdProduct: bigint): Promise<Product | null>;

  create(aProductCreateDTO: ProductCreateDTO): Promise<void>;

  updateQuantityById(aIdProduct: number, aQuantity: number): Promise<void>;

  update(aProductCreateDTO: ProductUpdateDTO): Promise<void>;

  delete(aIdProduct: number): Promise<void>;
}

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(private readonly mPrismaDatabase: PrismaService) {
  }

  async listAll(aSkip: number, aTake: number, aNameProduct: string = "%%"): Promise<Product[]> {
    return await this.mPrismaDatabase.product.findMany({
      skip: aSkip,
      take: aTake,
      where: {
        name: {
          contains: aNameProduct
        },
        active: YesNo.Yes
      }
    });
  }

  async getById(aIdProduct: bigint): Promise<Product | null> {
    return await this.mPrismaDatabase.product.findFirst({
        where: {
          id_product: aIdProduct,
          active: YesNo.Yes
        }
      }
    );
  }

  async create(aProductCreateDTO: ProductCreateDTO): Promise<void> {
    this.mPrismaDatabase.product.create({
      data: {
        price: aProductCreateDTO.price,
        quantity: aProductCreateDTO.quantity,
        name: aProductCreateDTO.name,
        image_base64: aProductCreateDTO.image_base64,
        description: aProductCreateDTO.description,
        updated_at: new Date(),
        created_at: new Date(),
        active: YesNo.Yes
      }
    });
  }


  async updateQuantityById(aIdProduct: number, aQuantity: number): Promise<void> {
    this.mPrismaDatabase.product.update({
      data: {
        quantity: aQuantity,
        updated_at: new Date(),
        active: YesNo.Yes
      },
      where: {
        id_product: aIdProduct
      }
    });
  }

  async update(aProductCreateDTO: ProductUpdateDTO): Promise<void> {
    this.mPrismaDatabase.product.update({
      data: {
        name: aProductCreateDTO.name,
        quantity: aProductCreateDTO.quantity,
        price: aProductCreateDTO.price,
        image_base64: aProductCreateDTO.image_base64,
        description: aProductCreateDTO.description,
        updated_at: new Date(),
        active: YesNo.Yes
      },
      where: {
        id_product: aProductCreateDTO.id_product
      }
    });
  }

  async delete(aIdProduct: number): Promise<void> {
    this.mPrismaDatabase.product.update({
      data: {
        updated_at: new Date(),
        active: YesNo.No
      },
      where: {
        id_product: aIdProduct
      }
    });
  }


}