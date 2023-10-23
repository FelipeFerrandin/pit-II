import { Inject, Injectable } from "@nestjs/common";
import { ICustomerRepository } from "./customer.repository";
import { CustomerCreateCompleteDTO, CustomerCreateDTO, CustomerDTO, CustomerUpdateDTO } from "./customer.dto";
import { EntityNotFoundException } from "../framework/error/EntityNotFoundException";
import { EncryptionUtil } from "../framework/util/EncryptionUtil";
import { BusinessRuleException } from "../framework/error/BusinessRuleException";
import { ICustomerAddressService } from "../customerAdress/customerAddress.service";
import { customer as Customer } from "@prisma/client";
import { TransactionManager } from "../framework/database/TransactionManager";


export interface ICustomerService {
  findById(aIdCustomer: number): Promise<CustomerDTO>;

  createComplete(aCustomerCreateCompleteDTO: CustomerCreateCompleteDTO): Promise<void>;

  update(aCustomerUpdateDTO: CustomerUpdateDTO): Promise<Customer>;

  updatePassword(aIdCustomer: number, aOldPassword: string, aPassword: string): Promise<Customer>;

  delete(aIdCustomer: number): Promise<Customer>;
}

@Injectable()
export class CustomerService implements ICustomerService {

  constructor(
    @Inject("ICustomerRepository") private readonly mCustomerRepository: ICustomerRepository,
    @Inject("ICustomerAddressService") private readonly mCustomerAddressService: ICustomerAddressService,
    private readonly mTransactionManager: TransactionManager
  ) {
  }

  private async create(aCustomerCreateDTO: CustomerCreateDTO): Promise<Customer> {
    return this.mCustomerRepository.create(aCustomerCreateDTO);
  }

  async createComplete(aCustomerCreateCompleteDTO: CustomerCreateCompleteDTO): Promise<void> {
    return this.mTransactionManager.run(async () => {
      const lCustomer = await this.create(aCustomerCreateCompleteDTO.customer);
      await this.mCustomerAddressService.create(lCustomer.id_customer, aCustomerCreateCompleteDTO.address);
    });
  }

  async delete(aIdCustomer: number): Promise<Customer> {
    await this.findById(aIdCustomer);
    return this.mCustomerRepository.delete(aIdCustomer);
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
      birth_date: new Date(lCustomer.birth_date).toISOString(),
      phone_number: lCustomer.phone_number
    };

  }

  async update(aCustomerUpdateDTO: CustomerUpdateDTO): Promise<Customer> {
    return this.mCustomerRepository.update(aCustomerUpdateDTO);
  }

  async updatePassword(aIdCustomer: number, aOldPassword: string, aPassword: string): Promise<Customer> {
    const lCustomer = await this.mCustomerRepository.findById(aIdCustomer);
    if (lCustomer == null) throw new EntityNotFoundException(`Customer with ID ${aIdCustomer} was not found`);
    const lCheckedPassword = !(await EncryptionUtil.compare(aOldPassword, lCustomer.password));
    if (lCheckedPassword) throw new BusinessRuleException("Password entered is invalid");

    return this.mCustomerRepository.updatePassword(aIdCustomer, aPassword);
  }

}