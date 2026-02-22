import { DynamicModule, Global, Module, ModuleMetadata, Provider } from "@nestjs/common";
import { DiscoveryModule } from "@nestjs/core";
import { McpService } from "./mcp.service";
import { McpExplorer } from "./mcp.explorer";
import { McpController } from "./mcp.controller";

type Metadata = Pick<ModuleMetadata, 'providers' | 'imports' | 'exports'>;

@Global()
@Module({})
export class McpModule {
  public static forRoot(metadata: Metadata = {}): DynamicModule {
    return {
      module: McpModule,
      imports: [DiscoveryModule, ...(metadata.imports || [])],
      providers: [McpService, McpExplorer, ...(metadata.providers || [])],
      exports: [McpService, ...(metadata.providers || [])],
      controllers: [McpController],
    };
  }
}
