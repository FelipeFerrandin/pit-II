import { Inject, Injectable } from "@nestjs/common";
import { ICustomerRepository } from "./customer.repository";
import { CustomerCreateCompleteDTO, CustomerCreateDTO, CustomerDTO, CustomerUpdateDTO } from "./customer.dto";
import { EntityNotFoundException } from "../framework/error/EntityNotFoundException";
import moment from "moment";
import { EncryptionUtil } from "../framework/util/EncryptionUtil";
import { BusinessRuleException } from "../framework/error/BusinessRuleException";
import { ICustomerAddressService } from "../customerAdress/customerAddress.service";


export interface ICustomerService {
  findById(aIdCustomer: number): Promise<CustomerDTO>;

  createComplete(aCustomerCreateCompleteDTO: CustomerCreateCompleteDTO): Promise<void>;

  update(aCustomerUpdateDTO: CustomerUpdateDTO): Promise<void>;

  updatePassword(aIdCustomer: number, aOldPassword: string, aPassword: string): Promise<void>;

  delete(aIdCustomer: number): Promise<void>;
}

@Injectable()
export class CustomerService implements ICustomerService {

  constructor(
    @Inject("ICustomerRepository") private readonly mCustomerRepository: ICustomerRepository,
    @Inject("ICustomerAddressService") private readonly mCustomerAddressService: ICustomerAddressService
  ) {
  }

  private async create(aCustomerCreateDTO: CustomerCreateDTO): Promise<void> {
    return this.mCustomerRepository.create(aCustomerCreateDTO);
  }

  async createComplete(aCustomerCreateCompleteDTO: CustomerCreateCompleteDTO): Promise<void> {
    await this.create(aCustomerCreateCompleteDTO.customer);
    await this.mCustomerAddressService.create(aCustomerCreateCompleteDTO.address);
  }

  async delete(aIdCustomer: number): Promise<void> {
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
      birth_date: moment(lCustomer.birth_date).format("dd-MM-yyyy"),
      phone_number: lCustomer.phone_number
    };

  }

  async update(aCustomerUpdateDTO: CustomerUpdateDTO): Promise<void> {
    return this.mCustomerRepository.update(aCustomerUpdateDTO);
  }

  async updatePassword(aIdCustomer: number, aOldPassword: string, aPassword: string): Promise<void> {
    const lCustomer = await this.mCustomerRepository.findById(aIdCustomer);
    if (lCustomer == null) throw new EntityNotFoundException(`Customer with ID ${aIdCustomer} was not found`);
    const lDecryptedPassword = EncryptionUtil.decrypt(lCustomer.password);
    if (aOldPassword != lDecryptedPassword) throw new BusinessRuleException("Password entered is invalid");
    return this.mCustomerRepository.updatePassword(aIdCustomer, aPassword);
  }

}