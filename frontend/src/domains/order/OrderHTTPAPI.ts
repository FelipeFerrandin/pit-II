import HttpProvider from "@/framework/provider/HttpProvider";
import type { AxiosResponse } from "axios";
import { OrderCreateDTO, OrderListDTO } from "@/domains/order/OrderDTO";

export default class OrderHTTPAPI {
  private httpProvider: HttpProvider;

  constructor() {
    this.httpProvider = new HttpProvider();
  }

  public getFinishOrders(aIdCustomer: number): Promise<AxiosResponse<OrderListDTO[]>> {
    return this.httpProvider.axiosInstanceBase.get(`/order/${aIdCustomer}`);
  }

  public createOrder(aIdCustomer: number, aOrderCreateDTO: OrderCreateDTO) {
    return this.httpProvider.axiosInstanceBase.post(`/order/${aIdCustomer}`, aOrderCreateDTO);
  }

}