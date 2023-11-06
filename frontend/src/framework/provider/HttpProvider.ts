import axios, { type AxiosInstance } from "axios";
import { useApplicationStore } from "@/stores/application";

export default class HttpProvider {
  public axiosInstanceBase: AxiosInstance;

  constructor() {
    this.axiosInstanceBase = HttpProvider.createAxiosInstanceBase();
  }

  private static createAxiosInstanceBase() {
    const instance = axios.create({
      baseURL: "http://localhost:3000",
      headers: {
        "Content-Type": "application/json"
      }
    });

    this.addAuthorizationToken(instance);

    return instance;
  }

  private static addAuthorizationToken(instance: AxiosInstance) {
    const lStore = useApplicationStore();
    if (lStore.token) {
      instance.defaults.headers.common["Authorization"] = `Bearer ${lStore.token}`;
    }
  }
}