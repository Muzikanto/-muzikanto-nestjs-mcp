import {
  CanActivate,
  DynamicModule,
  Global,
  Module,
  ModuleMetadata,
  Provider,
} from "@nestjs/common";
import { DiscoveryModule } from "@nestjs/core";
import { McpService } from "./services/mcp.service";
import { McpExplorer } from "./mcp.explorer";
import { McpController } from "./controllers/mcp.controller";
import { McpSseController } from "./controllers/mcp.sse.controller";
import { MCP_GUARD } from "./utils/inject-tokens";
import { IMcpConfig, MCP_CONFIG_TOKEN } from "./config";
import { DEFAULT_FASTIFY_ADAPTER, IHttpAdapter } from "./utils/http-adapter";
import { McpDynamicService } from "./services/mcp-dynamic.service";
import { McpSseService } from "./services/mcp.sse.service";

type Metadata = Pick<ModuleMetadata, "providers" | "imports" | "exports"> & {
  // config
  name?: string;
  description?: string;
  title?: string;
  icons?: {
    src: string;
  }[];
  version?: string;
  /**
   * @default { sse: true, http: true }
   */
  transports?: {
    sse?: boolean;
    http?: boolean;
  };
  // utils
  httpAdapter?: IHttpAdapter;
  guard?: Provider<CanActivate>;
};

const publicGuard: CanActivate = { canActivate: () => Promise.resolve(true) };

@Global()
@Module({})
export class McpModule {
  public static forRoot(metadata: Metadata = {}): DynamicModule {
    // TODO remove defaut in next major version
    const transports = metadata.transports || { sse: true, http: true };
    const configProviver: Provider<IMcpConfig> = {
      provide: MCP_CONFIG_TOKEN,
      useValue: {
        name: metadata.name,
        version: metadata.version,
        description: metadata.description,
        title: metadata.title,
        icons: metadata.icons,
        httpAdapter: metadata.httpAdapter || DEFAULT_FASTIFY_ADAPTER,
      },
    };
    const guardProvider: Provider<CanActivate> = metadata.guard
      ? { provide: MCP_GUARD, useExisting: metadata.guard }
      : {
          provide: MCP_GUARD,
          useValue: publicGuard,
        };

    return {
      module: McpModule,
      imports: [DiscoveryModule, ...(metadata.imports || [])],
      providers: [
        McpService,
        ...(transports.sse ? [McpSseService] : []),
        McpExplorer,
        McpDynamicService,
        configProviver,
        guardProvider,
        ...(metadata.guard ? [metadata.guard] : []),
        ...(metadata.providers || []),
      ],
      exports: [McpDynamicService, ...(metadata.exports || [])],
      controllers: [
        ...(transports.http ? [McpController] : []),
        ...(transports.sse ? [McpSseController] : []),
      ],
    };
  }
}
