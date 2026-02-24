import { IMcpTool, McpTool } from '@muzikanto/nestjs-mcp';
// @ts-ignore
import { Telegraf } from 'telegraf';
import z from 'zod';

const schema = {
  chatId: z.string().describe('Telegram chat id'),  // строка с описанием
  text: z.string().describe('Message text'),  // строка с описанием
};

@McpTool()
export class TelegramSendMessageTool implements IMcpTool<
  { chatId: string; text: string },
  { success: boolean }
> {
  name = 'telegram.sendMessage';

  inputSchema = schema;

  constructor(private readonly bot: Telegraf) {}

  async execute(input: { chatId: string; text: string }) {
    await this.bot.telegram.sendMessage(input.chatId, input.text);
    return { success: true };
  }
}