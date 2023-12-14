import { Logger } from "@/lib/logger";
import appConfig from "work/config/app.config";

export const logger = Logger({ level: appConfig.env === "prod" ? 0 : 1 });
