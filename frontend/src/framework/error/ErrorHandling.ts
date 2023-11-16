import axios from "axios";

export default class ErrorHandling {
  static process(aMessage: unknown): string {
    if (axios.isAxiosError(aMessage)) {
      console.error(aMessage.response?.data);
      return Array.isArray(aMessage.response?.data.message) ? aMessage.response?.data.message.join(", ") : aMessage.response?.data.message;
    } else {
      return (aMessage as string);
    }
  }
}

