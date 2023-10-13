import { Inject, Injectable } from "@nestjs/common";
import { ICustomerAddressRepository } from "./customerAddress.repository";
import { CustomerAddressCreateDTO, CustomerAddressDTO, CustomerAddressUpdateDTO } from "./customerAddress.dto";
import { EntityNotFoundException } from "../framework/error/EntityNotFoundException";


export interface ICustomerAddressService {
  listByIdCustomer(aIdCustomer: number): Promise<CustomerAddressDTO[]>;

  getById(aIdCustomerAddress: number): Promise<CustomerAddressDTO>;

  create(aCustomerAddressCreateDTO: CustomerAddressCreateDTO): Promise<void>;

  update(aCustomerAddressUpdateDTO: CustomerAddressUpdateDTO): Promise<void>;

  delete(aIdCustomerAddress: number): Promise<void>;
}

@Injectable()
export class CustomerAddressService implements ICustomerAddressService {

  constructor(
    @Inject("ICustomerAddressRepository") private readonly mCustomerAddressRepository: ICustomerAddressRepository
  ) {
  }

  async listByIdCustomer(aIdCustomer: number): Promise<CustomerAddressDTO[]> {
    const lListCustomerAddress = await this.mCustomerAddressRepository.listByIdCustomer(aIdCustomer);

    return lListCustomerAddress.map((iCustomerAddress) => <CustomerAddressDTO>{
      id_customer_address: iCustomerAddress.id_customer_address,
      id_customer: iCustomerAddress.id_customer,
      public_place: iCustomerAddress.public_place,
      district: iCustomerAddress.district,
      number: iCustomerAddress.number,
      city: iCustomerAddress.city,
      state: iCustomerAddress.state,
      country: iCustomerAddress.country
    });
  }

  async create(aCustomerAddressCreateDTO: CustomerAddressCreateDTO): Promise<void> {
    return this.mCustomerAddressRepository.create(aCustomerAddressCreateDTO);
  }

  async delete(aIdCustomerAddress: number): Promise<void> {
    await this.getById(aIdCustomerAddress);
    return this.mCustomerAddressRepository.delete(aIdCustomerAddress);
  }

  async update(aCustomerAddressUpdateDTO: CustomerAddressUpdateDTO): Promise<void> {
    await this.getById(aCustomerAddressUpdateDTO.id_customer_address);
    return this.mCustomerAddressRepository.update(aCustomerAddressUpdateDTO);
  }

  async getById(aIdCustomerAddress: number): Promise<CustomerAddressDTO> {
    const lCustomerAddress = await this.mCustomerAddressRepository.getById(aIdCustomerAddress);
    if (lCustomerAddress == null) throw new EntityNotFoundException(`Customer address with ID ${aIdCustomerAddress} was not found`);

    return {
      id_customer_address: lCustomerAddress.id_customer_address,
      id_customer: lCustomerAddress.id_customer,
      public_place: lCustomerAddress.public_place,
      district: lCustomerAddress.district,
      number: lCustomerAddress.number,
      city: lCustomerAddress.city,
      state: lCustomerAddress.state,
      country: lCustomerAddress.country
    };

  }


}