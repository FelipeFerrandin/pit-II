import { OrderProductCustomizedDTO } from "../orderProduct/orderProduct.dto";

class OrderCreateDTO {
  id_customer_address: number;
  products: OrderCreateProductsDTO[];
}

class OrderCreateProductsDTO {
  id_product: bigint;
  quantity: number;
}

class OrderListDTO {
  id_order: number;
  id_customer: number;
  id_customer_address: number;
  status: string;
  total: number;
  products: OrderProductCustomizedDTO[] = []
}



export {
  OrderListDTO,
  OrderCreateDTO,
  OrderCreateProductsDTO
};