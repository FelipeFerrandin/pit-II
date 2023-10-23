import { Inject, Injectable } from "@nestjs/common";
import { ICustomerAddressRepository } from "./customerAddress.repository";
import { CustomerAddressCreateDTO, CustomerAddressDTO, CustomerAddressUpdateDTO } from "./customerAddress.dto";
import { EntityNotFoundException } from "../framework/error/EntityNotFoundException";
import { customer_address as CustomerAddress } from "@prisma/client";


export interface ICustomerAddressService {
  listByIdCustomer(aIdCustomer: number): Promise<CustomerAddressDTO[]>;

  getById(aIdCustomerAddress: number): Promise<CustomerAddressDTO>;

  create(aIdCustomer: bigint, aCustomerAddressCreateDTO: CustomerAddressCreateDTO): Promise<CustomerAddress>;

  update(aCustomerAddressUpdateDTO: CustomerAddressUpdateDTO): Promise<CustomerAddress>;

  delete(aIdCustomerAddress: number): Promise<CustomerAddress>;
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

  async create(aIdCustomer: bigint, aCustomerAddressCreateDTO: CustomerAddressCreateDTO): Promise<CustomerAddress> {
    return this.mCustomerAddressRepository.create(aIdCustomer, aCustomerAddressCreateDTO);
  }

  async delete(aIdCustomerAddress: number): Promise<CustomerAddress> {
    await this.getById(aIdCustomerAddress);
    return this.mCustomerAddressRepository.delete(aIdCustomerAddress);
  }

  async update(aCustomerAddressUpdateDTO: CustomerAddressUpdateDTO): Promise<CustomerAddress> {
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