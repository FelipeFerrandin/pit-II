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

class OrderProductCustomizedDTO {
  id_order_product: number;
  id_product: number;
  name: string;
  description: string;
  image_base64: string;
  subtotal: number;
  quantity: number;
}

export {
  OrderProductDTO,
  OrderProductCreateDTO,
  OrderProductCustomizedDTO
};