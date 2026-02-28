import { IMcpTool, IMcpToolResult, McpTool } from '@muzikanto/nestjs-mcp';
import {
  NotImplementedException,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TestGuard } from '../lifecicle/test.guard';
import { z } from 'zod/v3';
import { TestInterceptor } from '../lifecicle/test.interceptor';
import { TestFilter } from '../lifecicle/test.filter';

const inputSchema = {
  chatId: z.string().describe('Telegram chat id'), // строка с описанием
  text: z.string().describe('Message text'), // строка с описанием
};

const outputSchema = {
  success: z.boolean().describe('Success'),
};

@UseFilters(TestFilter)
@UseInterceptors(TestInterceptor)
@UseGuards(TestGuard)
@McpTool()
export class ExampleTool implements IMcpTool<
  { chatId: string; text: string },
  { success: true }
> {
  name = 'telegram.sendMessage';
  title = 'Telegram send';
  description = 'Telegram can sand messages via telegraf';
  inputSchema = inputSchema;
  outputSchema = outputSchema;

  async execute(input: {
    chatId: string;
    text: string;
  }): Promise<IMcpToolResult<{ success: true }>> {
    // throw new NotImplementedException();
    return {
      structuredContent: { success: true },
      messages: [
        {
          type: 'text',
          text: `Success sent "${input.text}" to user ${input.chatId}`,
        },
      ],
    };
  }
}
