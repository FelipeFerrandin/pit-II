import { Injectable } from "@nestjs/common";
import { PrismaService } from "../framework/database/PrismaService";
import { YesNo } from "../framework/constants/ApplicationConstants";
import { customer_address as CustomerAddress } from "@prisma/client";
import { CustomerAddressCreateDTO, CustomerAddressUpdateDTO } from "./customerAddress.dto";

export interface ICustomerAddressRepository {

  listByIdCustomer(aIdCustomer: number): Promise<CustomerAddress[]>;

  getById(aIdCustomerAddress: number): Promise<CustomerAddress | null>;

  create(aIdCustomer: bigint, aCustomerAddressCreateDTO: CustomerAddressCreateDTO) : Promise<CustomerAddress>;

  update(aCustomerAddressUpdateDTO: CustomerAddressUpdateDTO): Promise<void>;

  delete(aIdCustomerAddress: number): Promise<void>;
}

@Injectable()
export class CustomerAddressRepository implements ICustomerAddressRepository {
  constructor(private readonly mPrismaDatabase: PrismaService) {
  }

  async listByIdCustomer(aIdCustomer: number): Promise<CustomerAddress[]> {
    return await this.mPrismaDatabase.customer_address.findMany({
      where: {
        id_customer: aIdCustomer,
        active: YesNo.SIM
      }
    });
  }

  async getById(aIdCustomerAddress: number): Promise<CustomerAddress | null> {
    return await this.mPrismaDatabase.customer_address.findFirst({
        where: {
          id_customer_address: aIdCustomerAddress,
          active: YesNo.SIM
        }
      }
    );
  }

  async create(aIdCustomer: bigint, aCustomerAddressCreateDTO: CustomerAddressCreateDTO): Promise<CustomerAddress> {
    return this.mPrismaDatabase.customer_address.create({
      data: {
        id_customer: aIdCustomer,
        public_place: aCustomerAddressCreateDTO.public_place,
        district: aCustomerAddressCreateDTO.district,
        number: aCustomerAddressCreateDTO.number,
        city: aCustomerAddressCreateDTO.city,
        state: aCustomerAddressCreateDTO.state,
        country: aCustomerAddressCreateDTO.country,
        updated_at: new Date(),
        created_at: new Date(),
        active: YesNo.SIM
      }
    });
  }

  async update(aCustomerAddressUpdateDTO: CustomerAddressUpdateDTO): Promise<void> {
    this.mPrismaDatabase.customer_address.update({
      data: {
        public_place: aCustomerAddressUpdateDTO.public_place,
        district: aCustomerAddressUpdateDTO.district,
        number: aCustomerAddressUpdateDTO.number,
        city: aCustomerAddressUpdateDTO.city,
        state: aCustomerAddressUpdateDTO.state,
        country: aCustomerAddressUpdateDTO.country,
        updated_at: new Date()
      },
      where: {
        id_customer_address: aCustomerAddressUpdateDTO.id_customer_address
      }
    });
  }

  async delete(aIdCustomerAddress: number): Promise<void> {
    this.mPrismaDatabase.customer_address.update({
      data: {
        updated_at: new Date(),
        active: YesNo.NAO
      },
      where: {
        id_customer_address: aIdCustomerAddress
      }
    });
  }

}