class AuthLoginDTO {
  email: string = "";
  password: string = "";
}

class AuthDTO {
  id_customer: number = 0;
  access_token: string = "";
}

export {
  AuthDTO,
  AuthLoginDTO
};