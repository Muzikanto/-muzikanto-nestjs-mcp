import { DynamicModule, Module } from "@nestjs/common";
import { DiscoveryModule } from "@nestjs/core";
import { McpService } from "./mcp.service";
import { McpExplorer } from "./mcp.explorer";
import { McpController } from "./mcp.controller";

@Module({})
export class McpModule {
  public static forRoot(): DynamicModule {
    return {
      module: McpModule,
      imports: [DiscoveryModule],
      providers: [McpService, McpExplorer],
      exports: [McpService],
      controllers: [McpController],
    };
  }
}
