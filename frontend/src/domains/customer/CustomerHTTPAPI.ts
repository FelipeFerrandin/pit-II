import HttpProvider from "@/framework/provider/HttpProvider";
import type { AxiosResponse } from "axios";
import type { CustomerDTO } from "@/domains/customer/CustomerDTO";
import {
  CustomerAddressDTO,
  CustomerAddressUpdateDTO,
  CustomerUpdateDTO,
  CustomerUpdatePasswordDTO
} from "@/domains/customer/CustomerDTO";

export default class CustomerHTTPAPI {
  private httpProvider: HttpProvider;

  constructor() {
    this.httpProvider = new HttpProvider();
  }

  public getCustomerById(aIdCustomer: number): Promise<AxiosResponse<CustomerDTO>> {
    return this.httpProvider.axiosInstanceBase.get(`/customer/${aIdCustomer}`);
  }

  public getCustomerAddressById(aIdCustomer: number): Promise<AxiosResponse<CustomerAddressDTO[]>> {
    return this.httpProvider.axiosInstanceBase.get(`/customer/list-address/${aIdCustomer}`);
  }

  public updateCustomer(aCustomerUpdateDTO: CustomerUpdateDTO) {
    return this.httpProvider.axiosInstanceBase.put(`/customer`, aCustomerUpdateDTO);
  }

  public updateCustomerAddress(aCustomerAddressUpdateDTO: CustomerAddressUpdateDTO) {
    return this.httpProvider.axiosInstanceBase.put(`/customer/address`, aCustomerAddressUpdateDTO);
  }

  public updatePassword(aIdCustomer: number, aCustomerUpdatePasswordDTO: CustomerUpdatePasswordDTO) {
    return this.httpProvider.axiosInstanceBase.put(`/customer/password/${aIdCustomer}`, aCustomerUpdatePasswordDTO);
  }

}