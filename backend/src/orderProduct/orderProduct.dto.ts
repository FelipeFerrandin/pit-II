class OrderProductCreateDTO {
  id_product: bigint;
  subtotal: number;
  quantity: number;
}

class OrderProductDTO {
  id_order_product: number;
  id_product: number;
  id_order: number;
  subtotal: number;
  quantity: number;
}