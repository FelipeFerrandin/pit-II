class OrderListDTO {
  id_order: number = 0;
  id_customer: number = 0;
  id_customer_address: number = 0;
  status: string = "";
  total: number = 0;
  products: OrderProductCustomizedDTO[] = [];
}

class OrderProductCustomizedDTO {
  id_order_product: number = 0;
  id_product: number = 0;
  name: string = "";
  description: string = "";
  image_base64: string = "";
  subtotal: number = 0;
  quantity: number = 0;
}

class OrderCreateDTO {
  id_customer_address: number = 0;
  products: OrderCreateProductsDTO[] = [];
}

class OrderCreateProductsDTO {
  id_product: number = 0;
  quantity: number = 0;
}


export {
  OrderCreateProductsDTO,
  OrderCreateDTO,
  OrderListDTO
};