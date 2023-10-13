import { Injectable } from "@nestjs/common";
import { PrismaService } from "../framework/database/PrismaService";
import { customer as Customer } from "@prisma/client";
import { CustomerCreateDTO, CustomerUpdateDTO } from "./customer.dto";
import { YesNo } from "../framework/constants/ApplicationConstants";
import moment from "moment/moment";
import { EncryptionUtil } from "../framework/util/EncryptionUtil";

export interface ICustomerRepository {
  findById(aIdCustomer: number): Promise<Customer | null>;

  create(aCustomerCreateDTO: CustomerCreateDTO): Promise<void>;

  update(aCustomerUpdateDTO: CustomerUpdateDTO): Promise<void>;

  updatePassword(aIdCustomer: number, aPassword: string): Promise<void>;

  deleteAccount(aIdCustomer: number): Promise<void>;
}

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(private readonly mPrismaDatabase: PrismaService) {
  }

  async create(aCustomerCreateDTO: CustomerCreateDTO): Promise<void> {
    this.mPrismaDatabase.customer.create({
      data: {
        name: aCustomerCreateDTO.name,
        last_name: aCustomerCreateDTO.last_name,
        complete_name: `${aCustomerCreateDTO.name.trim()} ${aCustomerCreateDTO.last_name.trim()}`,
        email: aCustomerCreateDTO.email,
        password: EncryptionUtil.encrypt(aCustomerCreateDTO.password),
        birth_date: aCustomerCreateDTO.birth_date,
        phone_number: aCustomerCreateDTO.phone_number,
        updated_at: moment().toDate(),
        created_at: moment().toDate(),
        active: YesNo.SIM
      }
    });
  }

  async deleteAccount(aIdCustomer: number): Promise<void> {
    this.mPrismaDatabase.customer.update({
      data: {
        updated_at: moment().toDate(),
        active: YesNo.NAO
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
          active: YesNo.SIM
        }
      }
    );
  }

  async update(aCustomerUpdateDTO: CustomerUpdateDTO): Promise<void> {
    this.mPrismaDatabase.customer.update({
      data: {
        name: aCustomerUpdateDTO.name,
        last_name: aCustomerUpdateDTO.last_name,
        complete_name: `${aCustomerUpdateDTO.name.trim()} ${aCustomerUpdateDTO.last_name.trim()}`,
        birth_date: aCustomerUpdateDTO.birth_date,
        phone_number: aCustomerUpdateDTO.phone_number,
        updated_at: moment().toDate()
      },
      where: {
        id_customer: aCustomerUpdateDTO.id_customer
      }
    });
  }

  async updatePassword(aIdCustomer: number, aPassword: string): Promise<void> {
    this.mPrismaDatabase.customer.update({
      data: {
        password: EncryptionUtil.encrypt(aPassword),
        updated_at: moment().toDate()
      },
      where: {
        id_customer: aIdCustomer
      }
    });
  }


}