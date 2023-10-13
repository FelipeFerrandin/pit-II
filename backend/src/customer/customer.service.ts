import { Inject, Injectable } from "@nestjs/common";
import { ICustomerRepository } from "./customer.repository";
import { CustomerCreateDTO, CustomerDTO, CustomerUpdateDTO } from "./customer.dto";
import { EntityNotFoundException } from "../framework/error/EntityNotFoundException";
import moment from "moment";
import { EncryptionUtil } from "../framework/util/EncryptionUtil";
import { BusinessRuleException } from "../framework/error/BusinessRuleException";


export interface ICustomerService {
  findById(aIdCustomer: number): Promise<CustomerDTO>;

  create(aCustomerCreateDTO: CustomerCreateDTO): Promise<void>;

  update(aCustomerUpdateDTO: CustomerUpdateDTO): Promise<void>;

  updatePassword(aIdCustomer: number, aOldPassword: string, aPassword: string): Promise<void>;

  deleteAccount(aIdCustomer: number): Promise<void>;
}

@Injectable()
export class CustomerService implements ICustomerService {

  constructor(
    @Inject("ICustomerRepository") private readonly mCustomerRepository: ICustomerRepository
  ) {
  }

  async create(aCustomerCreateDTO: CustomerCreateDTO): Promise<void> {
    // TODO create complete
    return Promise.resolve(undefined);
  }

  async deleteAccount(aIdCustomer: number): Promise<void> {
    await this.findById(aIdCustomer);
    return this.mCustomerRepository.deleteAccount(aIdCustomer);
  }

  async findById(aIdCustomer: number): Promise<CustomerDTO> {
    const lCustomer = await this.mCustomerRepository.findById(aIdCustomer);
    if (lCustomer == null) throw new EntityNotFoundException(`Customer with ID ${aIdCustomer} was not found`);

    return {
      id_customer: lCustomer.id_customer,
      name: lCustomer.name,
      last_name: lCustomer.last_name,
      complete_name: lCustomer.complete_name,
      email: lCustomer.email,
      birth_date: moment(lCustomer.birth_date).format("dd-MM-yyyy"),
      phone_number: lCustomer.phone_number
    };

  }

  async update(aCustomerUpdateDTO: CustomerUpdateDTO): Promise<void> {
    // TODO create complete ?
    return Promise.resolve(undefined);
  }

  async updatePassword(aIdCustomer: number, aOldPassword: string, aPassword: string): Promise<void> {
    const lCustomer = await this.mCustomerRepository.findById(aIdCustomer);
    if (lCustomer == null) throw new EntityNotFoundException(`Customer with ID ${aIdCustomer} was not found`);
    const lDecryptedPassword = EncryptionUtil.decrypt(lCustomer.password);
    if (aOldPassword != lDecryptedPassword) throw new BusinessRuleException("Password entered is invalid");
    return this.mCustomerRepository.updatePassword(aIdCustomer, aPassword);
  }

}