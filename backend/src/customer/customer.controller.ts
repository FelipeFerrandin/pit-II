import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ICustomerService } from "./customer.service";
import { ICustomerAddressService } from "../customerAdress/customerAddress.service";
import { CustomerCreateCompleteDTO, CustomerUpdateDTO, CustomerUpdatePasswordDTO } from "./customer.dto";
import { CustomerAddressCreateDTO, CustomerAddressUpdateDTO } from "../customerAdress/customerAddress.dto";
import { AuthGuard } from "../framework/util/AuthGuard";

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
  @UseGuards(AuthGuard)
  async listByIdCustomer(@Param("aIdCustomer") aIdCustomer: number) {
    return this.mCustomerAddressService.listByIdCustomer(aIdCustomer);
  }

  @Get("/address/:aIdCustomerAddress")
  @UseGuards(AuthGuard)
  async getAddressById(@Param("aIdCustomerAddress") aIdCustomerAddress: number) {
    return this.mCustomerAddressService.getById(aIdCustomerAddress);
  }

  @Post()
  async create(@Body() aCustomerCreateCompleteDTO: CustomerCreateCompleteDTO) {
    await this.mCustomerService.createComplete(aCustomerCreateCompleteDTO);
  }

  @Post("/address/:aIdCustomer")
  async createAddress(
    @Param("aIdCustomer") aIdCustomer: bigint,
    @Body() aCustomerAddressCreateDTO: CustomerAddressCreateDTO
  ) {
    await this.mCustomerAddressService.create(aIdCustomer, aCustomerAddressCreateDTO);
  }

  @Put()
  @UseGuards(AuthGuard)
  async update(@Body() aCustomerUpdateDTO: CustomerUpdateDTO) {
    await this.mCustomerService.update(aCustomerUpdateDTO);
  }

  @Put("/address")
  @UseGuards(AuthGuard)
  async updateAddress(@Body() aCustomerAddressUpdateDTO: CustomerAddressUpdateDTO) {
    await this.mCustomerAddressService.update(aCustomerAddressUpdateDTO);
  }

  @Put("/password/:aIdCustomer")
  @UseGuards(AuthGuard)
  async updatePassword(
    @Param("aIdCustomer") aIdCustomer: number,
    @Body() aCustomerUpdatePasswordDTO: CustomerUpdatePasswordDTO
  ) {
    await this.mCustomerService.updatePassword(
      aIdCustomer,
      aCustomerUpdatePasswordDTO.old_password,
      aCustomerUpdatePasswordDTO.new_password
    );
  }

  @Delete("/:aIdCustomer")
  @UseGuards(AuthGuard)
  async deleteAccount(@Param("aIdCustomer") aIdCustomer: number) {
    await this.mCustomerService.delete(aIdCustomer);
  }

  @Delete("/address/:aIdCustomerAddress")
  @UseGuards(AuthGuard)
  async deleteAddress(@Param("aIdCustomerAddress") aIdCustomerAddress: number) {
    await this.mCustomerAddressService.delete(aIdCustomerAddress);
  }

}
