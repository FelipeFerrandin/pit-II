import { IsDecimal, IsNotEmpty, MaxLength, Min } from "class-validator";

class ProductDTO {
  id_product: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
  image_base64: string;
}

class ProductCreateDTO {
  @IsNotEmpty({ message: "Name place is invalid" })
  @MaxLength(255, { message: "Name place is too long" })
  name: string;

  @IsDecimal({ locale: "pt-BR", decimal_digits: "15,2" }, { message: "Price is invalid" })
  price: number;

  @IsNotEmpty({ message: "Description place is invalid" })
  @MaxLength(255, { message: "Description place is too long" })
  description: string;

  @Min(1, { message: "Quantity is invalid" })
  quantity: number;

  image_base64: string;
}

class ProductUpdateDTO {
  @Min(1, { message: "Product id is invalid" })
  id_product: bigint;

  @IsNotEmpty({ message: "Name place is invalid" })
  @MaxLength(255, { message: "Name place is too long" })
  name: string;

  @IsDecimal({ locale: "pt-BR", decimal_digits: "15,2" }, { message: "Price is invalid" })
  price: number;

  @IsNotEmpty({ message: "Description place is invalid" })
  @MaxLength(255, { message: "Description place is too long" })
  description: string;

  @Min(1, { message: "Quantity is invalid" })
  quantity: number;

  image_base64: string;
}

export {
  ProductCreateDTO,
  ProductUpdateDTO,
  ProductDTO
};