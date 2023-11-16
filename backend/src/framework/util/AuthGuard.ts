import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private mJwtService: JwtService) {
  }

  async canActivate(aContext: ExecutionContext): Promise<boolean> {
    const lRequest = aContext.switchToHttp().getRequest();
    const lToken = this.extractTokenFromHeader(lRequest);
    if (!lToken) throw new UnauthorizedException();
    try {
      await this.mJwtService.verifyAsync(lToken, { secret: "FELIPE" });
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(aRequest: Request): string | undefined {
    const [type, token] = aRequest.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}