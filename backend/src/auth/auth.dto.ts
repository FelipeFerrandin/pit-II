import { IsNotEmpty } from "class-validator";

class AuthDTO {
  access_token: string;
}

class AuthLoginDTO {
  @IsNotEmpty({ message: "Email place is invalid" })
  email: string;
  @IsNotEmpty({ message: "Password place is invalid" })
  password: string;
}

export {
  AuthLoginDTO,
  AuthDTO
};