import { Inject } from "@nestjs/common";
import { IHttpAdapter } from "./utils/http-adapter";

export const MCP_CONFIG_TOKEN = "mcl:config-token";

export type IMcpConfig = {
  name?: string;
  version?: string;
  description?: string;
  title?: string;
  icons?: {
    src: string;
  }[];
  httpAdapter: IHttpAdapter;
};

export const InjectMcpConfig = () => Inject(MCP_CONFIG_TOKEN);
