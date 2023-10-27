import { ICustomerAddressService } from "../customerAddress.service";
import { CustomerAddressModule } from "../customerAddress.module";
import { PrismaModule } from "../../framework/database/PrismaModule";
import { Test, TestingModule } from "@nestjs/testing";

describe("CustomerAddressService", () => {
  let mICustomerAddressService: ICustomerAddressService;

  beforeEach(async () => {

    const lModule: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, CustomerAddressModule]
    }).compile();

    mICustomerAddressService = lModule.get<ICustomerAddressService>("ICustomerAddressService");
  });

  it("should be defined", () => {
    expect(mICustomerAddressService).toBeDefined();
  });

  it("should update customer address", async () => {
    await expect(mICustomerAddressService.update({
        id_customer_address: 1,
        country: "Test 123",
        number: 1234,
        district: "Test 1234",
        state: "EUA",
        public_place: "Test Public",
        city: "Te"
      })
    ).resolves.not.toThrow();
  });

  it("should get by id customer address", async () => {
    await expect(mICustomerAddressService.getById(1)
    ).resolves.not.toThrow();
  });

  it("should delete customer address", async () => {
    await expect(mICustomerAddressService.delete(2)
    ).resolves.not.toThrow();
  });

  it("should list customer address", async () => {
    await expect(mICustomerAddressService.listByIdCustomer(1)
    ).resolves.not.toThrow();
  });

});