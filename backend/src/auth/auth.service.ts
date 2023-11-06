import { Inject, Injectable } from "@nestjs/common";
import { EncryptionUtil } from "../framework/util/EncryptionUtil";
import { BusinessRuleException } from "../framework/error/BusinessRuleException";
import { ICustomerRepository } from "../customer/customer.repository";
import { JwtService } from "@nestjs/jwt";
import { AuthDTO } from "./auth.dto";

export interface IAuthService {
  createJWTWithEmailAndPassword(aEmail: string, aPassword: string): Promise<AuthDTO>;
}

@Injectable()
export class AuthService implements IAuthService {

  constructor(
    @Inject("ICustomerRepository") private readonly mCustomerRepository: ICustomerRepository,
    private readonly mJwtService: JwtService
  ) {
  }

  async createJWTWithEmailAndPassword(aEmail: string, aPassword: string): Promise<AuthDTO> {
    const lCustomer = await this.mCustomerRepository.findByEmail(aEmail);
    const lCheckedPassword = !(await EncryptionUtil.compare(aPassword, lCustomer.password));
    if (lCheckedPassword) throw new BusinessRuleException("Password entered is invalid");
    const lPayload = { sub: Number(lCustomer.id_customer), username: lCustomer.email };

    return {
      access_token: await this.mJwtService.signAsync(lPayload)
    };
  }

}