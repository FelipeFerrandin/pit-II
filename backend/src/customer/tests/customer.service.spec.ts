import { ICustomerService } from "../customer.service";
import { Test, TestingModule } from "@nestjs/testing";
import { CustomerModule } from "../customer.module";
import { PrismaModule } from "../../framework/database/PrismaModule";
import { CustomerAddressModule } from "../../customerAdress/customerAddress.module";

describe("CustomerService", () => {
  let mICustomerService: ICustomerService;

  beforeEach(async () => {

    const lModule: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, CustomerAddressModule, CustomerModule]
    }).compile();

    mICustomerService = lModule.get<ICustomerService>("ICustomerService");
  });

  it("should be defined", () => {
    expect(mICustomerService).toBeDefined();
  });

  it("should create complete customer", async () => {
    await expect(mICustomerService.createComplete({
        address: {
          city: "Curitiba",
          number: 10,
          country: "Brazil",
          district: "test",
          public_place: "test",
          state: "PR"
        },

        customer: {
          password: "123",
          birth_date: "2002-02-07",
          email: "test@test1.com",
          name: "Felipe",
          last_name: "Ferrandin",
          phone_number: "419999999999"
        }
      })
    ).resolves.not.toThrow();
  });

  it("should update customer", async () => {
    await expect(mICustomerService.update({
        id_customer: 1,
        name: "Felipe4",
        last_name: "Ferrandin4",
        birth_date: "2002-02-07",
        phone_number: "419999999999"
      })
    ).resolves.not.toThrow();
  });

  it("should update password customer", async () => {
    await expect(mICustomerService.updatePassword(1, "123", "12345")
    ).resolves.not.toThrow();
  });

  it("should delete customer", async () => {
    await expect(mICustomerService.delete(3)
    ).resolves.not.toThrow();
  });

});