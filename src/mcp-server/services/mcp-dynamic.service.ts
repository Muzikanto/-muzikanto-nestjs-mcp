import {
  CanActivate,
  ExceptionFilter,
  Injectable,
  NestInterceptor,
  Type,
} from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";

import { McpService } from "../services/mcp.service";
import { IMcpTool } from "../decorators/mcp-tool.decorator";
import { IMcpResource } from "../decorators/mcp-resource.decorator";
import { IMcpPrompt } from "../decorators/mcp-prompt.decorator";
import {
  EXCEPTION_FILTERS_METADATA,
  GUARDS_METADATA,
  INTERCEPTORS_METADATA,
} from "@nestjs/common/constants";

export type IMcpDynamicTool<
  Input,
  Result extends Record<string, unknown>,
> = IMcpTool<Input, Result> & {
  guards?: Type<CanActivate>[];
  interceptors?: Type<NestInterceptor>[];
  filters?: Type<ExceptionFilter>[];
};

export type IMcpDynamicPrompt<Input> = IMcpPrompt<Input> & {
  guards?: Type<CanActivate>[];
  interceptors?: Type<NestInterceptor>[];
  filters?: Type<ExceptionFilter>[];
};

export type IMcpDynamicResource<Input> = IMcpResource<Input> & {
  guards?: Type<CanActivate>[];
  interceptors?: Type<NestInterceptor>[];
  filters?: Type<ExceptionFilter>[];
};

@Injectable()
export class McpDynamicService {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly mcpService: McpService,
  ) {}

  /** Динамически регистрирует MCP tools */
  async registerTool<Input, Result extends Record<string, unknown>>(
    tool: IMcpDynamicTool<Input, Result>,
  ) {
    const DynamicToolClass = class {
      name = tool.name;
      title = tool.title;
      description = tool.description;
      execute = tool.execute;
      inputSchema = tool.inputSchema;
      outputSchema = tool.outputSchema;
      annotations = tool.annotations;
      _meta = tool._meta;
    };

    if (tool.guards) {
      this.applyGuards(DynamicToolClass, tool.guards);
    }
    if (tool.interceptors) {
      this.applyInterceptors(DynamicToolClass, tool.interceptors);
    }
    if (tool.filters) {
      this.applyFilters(DynamicToolClass, tool.filters);
    }

    const instance = await this.moduleRef.create(DynamicToolClass);

    this.mcpService.registerTool(instance.name, {
      instance,
      metatype: DynamicToolClass,
    });
  }

  /** Динамически регистрирует MCP prompts */
  async registerPrompt<Input>(prompt: IMcpDynamicPrompt<Input>) {
    const DynamicPromptClass = class {
      name = prompt.name;
      title = prompt.title;
      description = prompt.description;
      execute = prompt.execute;
      inputSchema = prompt.inputSchema;
    };

    if (prompt.guards) {
      this.applyGuards(DynamicPromptClass, prompt.guards);
    }
    if (prompt.interceptors) {
      this.applyInterceptors(DynamicPromptClass, prompt.interceptors);
    }
    if (prompt.filters) {
      this.applyFilters(DynamicPromptClass, prompt.filters);
    }

    const instance = await this.moduleRef.create(DynamicPromptClass);

    this.mcpService.registerPrompt(instance.name, {
      instance,
      metatype: DynamicPromptClass,
    });
  }

  /** Динамически регистрирует MCP resources */
  async registerResource<Input>(resource: IMcpDynamicResource<Input>) {
    const DynamicResourceClass = class {
      name = resource.name;
      title = resource.title;
      uri = resource.uri;
      description = resource.description;
      execute = resource.execute;
      list = resource.list;
      annotations = resource.annotations;
      _meta = resource._meta;
    };
    if (resource.guards) {
      this.applyGuards(DynamicResourceClass, resource.guards);
    }
    if (resource.interceptors) {
      this.applyInterceptors(DynamicResourceClass, resource.interceptors);
    }
    if (resource.filters) {
      this.applyFilters(DynamicResourceClass, resource.filters);
    }

    const instance = await this.moduleRef.create(DynamicResourceClass);

    this.mcpService.registerResource(instance.name, {
      instance,
      metatype: DynamicResourceClass,
    });
  }

  protected applyGuards(item: Function, guards: Type<CanActivate>[]) {
    Reflect.defineMetadata(GUARDS_METADATA, guards, item);
  }

  protected applyInterceptors(
    item: Function,
    interceptors: Type<NestInterceptor>[],
  ) {
    Reflect.defineMetadata(INTERCEPTORS_METADATA, interceptors, item);
  }

  protected applyFilters(item: Function, filters: Type<ExceptionFilter>[]) {
    Reflect.defineMetadata(EXCEPTION_FILTERS_METADATA, filters, item);
  }
}
