import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from "@nestjs/common";
import { ICustomerService } from "./customer.service";
import { ICustomerAddressService } from "../customerAdress/customerAddress.service";
import { CustomerCreateCompleteDTO, CustomerUpdateDTO, CustomerUpdatePasswordDTO } from "./customer.dto";
import { CustomerAddressCreateDTO, CustomerAddressUpdateDTO } from "../customerAdress/customerAddress.dto";

@Controller("customer")
export class CustomerController {
  constructor(
    @Inject("ICustomerService") private readonly mCustomerService: ICustomerService,
    @Inject("ICustomerAddressService") private readonly mCustomerAddressService: ICustomerAddressService
  ) {
  }

  @Get("/:aIdCustomer")
  async findById(@Param("aIdCustomer") aIdCustomer: number) {
    return this.mCustomerService.findById(aIdCustomer);
  }

  @Get("/list-address/:aIdCustomer")
  async listByIdCustomer(@Param("aIdCustomer") aIdCustomer: number) {
    return this.mCustomerAddressService.listByIdCustomer(aIdCustomer);
  }

  @Get("/address/:aIdCustomerAddress")
  async getAddressById(@Param("aIdCustomerAddress") aIdCustomerAddress: number) {
    return this.mCustomerAddressService.getById(aIdCustomerAddress);
  }

  @Post()
  async create(@Body() aCustomerCreateCompleteDTO: CustomerCreateCompleteDTO) {
    return this.mCustomerService.createComplete(aCustomerCreateCompleteDTO);
  }

  @Post("/address/:aIdCustomer")
  async createAddress(
    @Param("aIdCustomer") aIdCustomer: bigint,
    @Body() aCustomerAddressCreateDTO: CustomerAddressCreateDTO
  ) {
    return this.mCustomerAddressService.create(aIdCustomer, aCustomerAddressCreateDTO);
  }

  @Put()
  async update(@Body() aCustomerUpdateDTO: CustomerUpdateDTO) {
    return this.mCustomerService.update(aCustomerUpdateDTO);
  }

  @Put("/address")
  async updateAddress(@Body() aCustomerAddressUpdateDTO: CustomerAddressUpdateDTO) {
    return this.mCustomerAddressService.update(aCustomerAddressUpdateDTO);
  }

  @Put("/password/:aIdCustomer")
  async updatePassword(
    @Param("aIdCustomer") aIdCustomer: number,
    @Body() aCustomerUpdatePasswordDTO: CustomerUpdatePasswordDTO
  ) {
    return this.mCustomerService.updatePassword(
      aIdCustomer,
      aCustomerUpdatePasswordDTO.old_password,
      aCustomerUpdatePasswordDTO.new_password
    );
  }

  @Delete("/:aIdCustomer")
  async deleteAccount(@Param("aIdCustomer") aIdCustomer: number) {
    return this.mCustomerService.delete(aIdCustomer);
  }

  @Delete("/address/:aIdCustomerAddress")
  async deleteAddress(@Param("aIdCustomerAddress") aIdCustomerAddress: number) {
    return this.mCustomerAddressService.delete(aIdCustomerAddress);
  }

}
