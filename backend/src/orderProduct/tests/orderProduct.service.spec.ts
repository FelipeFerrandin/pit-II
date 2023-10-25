import { Test, TestingModule } from "@nestjs/testing";
import { PrismaModule } from "../../framework/database/PrismaModule";
import { IOrderProductService } from "../orderProduct.service";
import { OrderProductModule } from "../orderProduct.module";

describe("OrderProductService", () => {
  let mIOrderProductService: IOrderProductService;

  beforeEach(async () => {

    const lModule: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, OrderProductModule]
    }).compile();

    mIOrderProductService = lModule.get<IOrderProductService>("IOrderProductService");
  });

  it("should be defined", () => {
    expect(mIOrderProductService).toBeDefined();
  });

  it("should create product", async () => {
    await expect(mIOrderProductService.findProductsInOrderByIdOrder(1)
    ).resolves.not.toThrow();
  });

});