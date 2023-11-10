import HttpProvider from "@/framework/provider/HttpProvider";
import type { AxiosResponse } from "axios";
import { AuthDTO, AuthLoginDTO } from "@/domains/auth/AuthDTO";

export default class AuthHTTPAPI {
  private httpProvider: HttpProvider;

  constructor() {
    this.httpProvider = new HttpProvider();
  }

  public login(aAuthLoginDTO: AuthLoginDTO): Promise<AxiosResponse<AuthDTO>> {
    return this.httpProvider.axiosInstanceBase.post(`/auth/login`, aAuthLoginDTO);
  }

}