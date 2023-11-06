class ProductDTO {
  id_product: bigint = BigInt(0);
  name: string = "";
  price: number = 0.0;
  description: string = "";
  quantity: number = 0;
  image_base64: string = "";
}

export {
  ProductDTO
};