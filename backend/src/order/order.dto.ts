class OrderCreateDTO {
  id_customer_address : number
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