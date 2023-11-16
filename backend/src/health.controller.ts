import { Controller, Get } from "@nestjs/common";
import HealthDTO from "./framework/util/HealthDTO";

@Controller("health-check")
export class HealthController {

  @Get()
  getHealth(): HealthDTO {
    return { message: "Application is running" };
  }
}