import { Injectable } from "@nestjs/common";
import { PrismaService } from "../framework/database/PrismaService";
import { customer as Customer } from "@prisma/client";
import { CustomerCreateDTO, CustomerUpdateDTO } from "./customer.dto";
import { YesNo } from "../framework/constants/ApplicationConstants";
import { EncryptionUtil } from "../framework/util/EncryptionUtil";

export interface ICustomerRepository {
  findById(aIdCustomer: number): Promise<Customer | null>;

  create(aCustomerCreateDTO: CustomerCreateDTO): Promise<Customer>;

  update(aCustomerUpdateDTO: CustomerUpdateDTO): Promise<Customer>;

  updatePassword(aIdCustomer: number, aPassword: string): Promise<Customer>;

  delete(aIdCustomer: number): Promise<Customer>;

  findByEmail(aEmail: string): Promise<Customer>;
}

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(private readonly mPrismaDatabase: PrismaService) {
  }

  async create(aCustomerCreateDTO: CustomerCreateDTO): Promise<Customer> {
    return this.mPrismaDatabase.customer.create({
      data: {
        name: aCustomerCreateDTO.name,
        last_name: aCustomerCreateDTO.last_name,
        complete_name: `${aCustomerCreateDTO.name.trim()} ${aCustomerCreateDTO.last_name.trim()}`,
        email: aCustomerCreateDTO.email,
        password: await EncryptionUtil.encrypt(aCustomerCreateDTO.password),
        birth_date: new Date(aCustomerCreateDTO.birth_date).toISOString(),
        phone_number: aCustomerCreateDTO.phone_number,
        updated_at: new Date(),
        created_at: new Date(),
        active: YesNo.Yes
      }
    });
  }

  async delete(aIdCustomer: number): Promise<Customer> {
    return this.mPrismaDatabase.customer.update({
      data: {
        updated_at: new Date(),
        active: YesNo.No
      },
      where: {
        id_customer: aIdCustomer
      }
    });
  }

  async findById(aIdCustomer: number): Promise<Customer | null> {
    return await this.mPrismaDatabase.customer.findFirst({
        where: {
          id_customer: aIdCustomer,
          active: YesNo.Yes
        }
      }
    );
  }

  async update(aCustomerUpdateDTO: CustomerUpdateDTO): Promise<Customer> {
    return this.mPrismaDatabase.customer.update({
      data: {
        name: aCustomerUpdateDTO.name,
        last_name: aCustomerUpdateDTO.last_name,
        complete_name: `${aCustomerUpdateDTO.name.trim()} ${aCustomerUpdateDTO.last_name.trim()}`,
        birth_date: new Date(aCustomerUpdateDTO.birth_date).toISOString(),
        phone_number: aCustomerUpdateDTO.phone_number,
        updated_at: new Date()
      },
      where: {
        id_customer: aCustomerUpdateDTO.id_customer
      }
    });
  }

  async updatePassword(aIdCustomer: number, aPassword: string): Promise<Customer> {
    return this.mPrismaDatabase.customer.update({
      data: {
        password: await EncryptionUtil.encrypt(aPassword),
        updated_at: new Date()
      },
      where: {
        id_customer: aIdCustomer
      }
    });
  }

  async findByEmail(aEmail: string): Promise<Customer> {
    return this.mPrismaDatabase.customer.findUnique({
      where: {
        email: aEmail
      }
    });
  }


}