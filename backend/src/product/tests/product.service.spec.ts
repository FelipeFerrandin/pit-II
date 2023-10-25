import { Test, TestingModule } from "@nestjs/testing";
import { PrismaModule } from "../../framework/database/PrismaModule";
import { ProductModule } from "../product.module";
import { IProductService } from "../product.service";

describe("ProductService", () => {
  let mIProductService: IProductService;

  beforeEach(async () => {

    const lModule: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, ProductModule]
    }).compile();

    mIProductService = lModule.get<IProductService>("IProductService");
  });

  it("should be defined", () => {
    expect(mIProductService).toBeDefined();
  });

  it("should create product", async () => {
    await expect(mIProductService.create({
        name: "Test",
        description: "Test",
        quantity: 10,
        image_base64: "Test",
        price: 10.0
      })
    ).resolves.not.toThrow();
  });

  it("should update product", async () => {
    await expect(mIProductService.update({
        id_product: BigInt(2),
        name: "Test2",
        description: "Test2",
        quantity: 10,
        image_base64: "Test3",
        price: 12.0
      })
    ).resolves.not.toThrow();
  });

  it("should update quantity product", async () => {
    await expect(mIProductService.updateQuantityById(BigInt(2), 1)
    ).resolves.not.toThrow();
  });

  it("should delete product", async () => {
    await expect(mIProductService.delete(BigInt(1))
    ).resolves.not.toThrow();
  });

  it("should list all products", async () => {
    await expect(mIProductService.listAll(0,10,"%%")).resolves.not.toThrow();
  });

});