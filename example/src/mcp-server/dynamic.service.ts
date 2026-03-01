import { McpDynamicService } from '@muzikanto/nestjs-mcp';
import { Injectable } from '@nestjs/common';
import { TestGuard } from './lifecicle/test.guard';
import { TestInterceptor } from './lifecicle/test.interceptor';
import z from 'zod/v3';
import { AuthFilter, BadRequestFilter } from './lifecicle/test.filter';

@Injectable()
export class DynamicService {
  constructor(protected readonly mcpDynamicService: McpDynamicService) {}

  onModuleInit() {
    this.mcpDynamicService.registerTool({
      name: 'get_temperature',
      title: 'Get temperature',
      execute: () =>
        Promise.resolve({
          data: 'test',
          messages: [
            {
              type: 'text' as const,
              text: "It's 30 degrees Celsius outside now",
            },
          ],
        }),
      guards: [TestGuard],
      interceptors: [TestInterceptor],
      filters: [AuthFilter, BadRequestFilter],
    });

    this.mcpDynamicService.registerPrompt({
      name: 'dynamic_prompt',
      title: 'Dynamic prompt',
      inputSchema: {
        chatId: z.number().describe('chat Id'),
      },
      execute: (input: { chatId: number }) =>
        Promise.resolve({
          messages: [
            {
              role: 'system',
              content: `Use telegram.sendMessage tool chatId: ${input.chatId}`,
            },
            { role: 'user', content: `Please send to me: Hello world.` },
          ],
        }),
      guards: [TestGuard],
      interceptors: [TestInterceptor],
      filters: [AuthFilter, BadRequestFilter],
    });

    this.mcpDynamicService.registerResource<{ testId: string }>({
      name: 'dynamic_resource',
      title: 'Dynamic resource',
      uri: 'dynamic://test/{testId}',
      execute: (uri, input) =>
        Promise.resolve({
          contents: [{ uri: uri.href, text: `ID: ${input.testId}` }],
        }),
      guards: [TestGuard],
      interceptors: [TestInterceptor],
      list: async () => {
        return [
          { uri: 'dynamic://test/1', name: 'dynamice_1', title: 'Dynamic 1' },
        ];
      },
    });
  }
}
