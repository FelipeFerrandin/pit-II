class ProductDTO {
  id_product: bigint = BigInt(0);
  name: string = "";
  price: number = 0.0;
  description: string = "";
  quantity: number = 0;
  image_base64: string = "";
}

class ProductCartDTO {
  id_product: bigint = BigInt(0);
  name: string = "";
  price: number = 0.0;
  description: string = "";
  quantity: number = 0;
  max_quantity: number = 0;
  image_base64: string = "";
}

export {
  ProductCartDTO,
  ProductDTO
};