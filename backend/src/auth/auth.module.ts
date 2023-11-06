import { Global, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";

@Global()
@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      global: true,
      secret: "FELIPE",
      signOptions: { expiresIn: "7d" }
    })
  ],
  providers: [
    {
      provide: "IAuthService",
      useClass: AuthService
    }
  ],
  exports: [
    {
      provide: "IAuthService",
      useClass: AuthService
    }
  ]
})
export class AuthModule {
}