import { Body, Controller, Inject, Post } from "@nestjs/common";
import { IAuthService } from "./auth.service";
import { AuthLoginDTO } from "./auth.dto";

@Controller("auth")
export class AuthController {
  constructor(
    @Inject("IAuthService") private readonly mAuthService: IAuthService
  ) {
  }

  @Post("/login")
  async login(@Body() aAuthLoginDTO: AuthLoginDTO) {
    return this.mAuthService.createJWTWithEmailAndPassword(aAuthLoginDTO.email, aAuthLoginDTO.password);
  }

}