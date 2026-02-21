import { DiscoveryService } from '@nestjs/core';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { McpService } from './mcp.service';
import { MCP_TOOL_METADATA } from './decorators/mcp-tool.decorator';

@Injectable()
export class McpExplorer implements OnModuleInit {
  constructor(
    private readonly discovery: DiscoveryService,
    private readonly mcpService: McpService,
  ) {}

  onModuleInit() {
    const providers = this.discovery.getProviders();

    providers.forEach(({ instance, metatype }) => {
      if (!instance || !metatype) return;

      const metadata = Reflect.getMetadata(MCP_TOOL_METADATA, metatype);
      if (!metadata) return;

      // Проверка интерфейса
      if (typeof instance.execute !== 'function') {
        throw new Error(
          `MCP Tool ${metadata.name} must implement IMcpTool with execute() method`,
        );
      }

      this.mcpService.registerTool(metadata.name, instance);
    });
  }
}