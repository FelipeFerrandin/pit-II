import { Test, TestingModule } from "@nestjs/testing";
import { PrismaModule } from "../../framework/database/PrismaModule";
import { IOrderService } from "../order.service";
import { OrderModule } from "../order.module";
import { OrderProductModule } from "../../orderProduct/orderProduct.module";
import { ProductModule } from "../../product/product.module";

describe("OrderService", () => {
  let mIOrderService: IOrderService;

  beforeEach(async () => {

    const lModule: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, OrderProductModule, ProductModule, OrderModule]
    }).compile();

    mIOrderService = lModule.get<IOrderService>("IOrderService");
  });

  it("should be defined", () => {
    expect(mIOrderService).toBeDefined();
  });

  it("should create order", async () => {
    await expect(mIOrderService.create(BigInt(1), {
        id_customer_address: 1,
        products: [
          {
            id_product: BigInt(1),
            quantity: 1
          },
          {
            id_product: BigInt(2),
            quantity: 2
          }
        ]
      })
    ).resolves.not.toThrow();
  });

});