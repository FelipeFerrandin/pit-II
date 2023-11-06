import { Test, TestingModule } from "@nestjs/testing";
import { PrismaModule } from "../../framework/database/PrismaModule";
import { CustomerAddressModule } from "../../customerAdress/customerAddress.module";
import { CustomerModule } from "../../customer/customer.module";
import { IAuthService } from "../auth.service";
import { AuthModule } from "../auth.module";

describe("AuthService", () => {
  let mIAuthService: IAuthService;

  beforeEach(async () => {

    const lModule: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, CustomerAddressModule, CustomerModule, AuthModule]
    }).compile();

    mIAuthService = lModule.get<IAuthService>("IAuthService");
  });

  it("should be defined", () => {
    expect(mIAuthService).toBeDefined();
  });

  it("should create token", async () => {
    const lFunction = mIAuthService.createJWTWithEmailAndPassword("test@test1.com", "123");
    await expect(lFunction).resolves.not.toThrow();
  });
});