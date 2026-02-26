import { McpDynamicService } from "@muzikanto/nestjs-mcp";
import { Injectable } from "@nestjs/common";
import { ExampleInterceptor } from "./example.interceptor";
import { ExampleGuard } from "./example.guard";

@Injectable()
export class McpDynamic {
  constructor(protected readonly mcpDynamicService: McpDynamicService) {}

  onModuleInit() {
    this.mcpDynamicService.registerTool({
      name: "dynamic_tool",
      title: "Dynamic tool",
      execute: () => Promise.resolve("test"),
      guards: [ExampleGuard],
      interceptors: [ExampleInterceptor],
    });

    this.mcpDynamicService.registerPrompt({
      name: "dynamic_prompt",
      title: "Dynamic prompt",
      execute: () => Promise.resolve([{ role: "assistant", content: "test" }]),
      guards: [ExampleGuard],
      interceptors: [ExampleInterceptor],
    });

    this.mcpDynamicService.registerResource<{ testId: string }>({
      name: "dynamic_resource",
      title: "Dynamic resource",
      uri: "dynamic://test/{testId}",
      execute: (uri, input) =>
        Promise.resolve([{ uri: uri.href, text: `ID: ${input.testId}` }]),
      guards: [ExampleGuard],
      interceptors: [ExampleInterceptor],
    });
  }
}
