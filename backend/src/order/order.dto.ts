class OrderCreateDTO {
  products: OrderCreateProductsDTO[];
}

class OrderCreateProductsDTO {
  id_product: bigint;
  quantity: number;
}

export {
  OrderCreateDTO,
  OrderCreateProductsDTO
};