import { IMcpTool, McpTool } from '../src/decorators/mcp-tool.decorator';
// @ts-ignore
import { Telegraf } from 'telegraf';

@McpTool()
export class TelegramSendMessageTool implements IMcpTool<
  { chatId: string; text: string },
  { success: boolean }
> {
  name = 'telegram.sendMessage';

  inputSchema = {
    type: "object",
    properties: {
      chatId: {
        type: "string",
        description: "Telegram chat id"
      },
      text: {
        type: "string",
        description: "Message text"
      }
    },
    required: ["chatId", "text"]
  };

  constructor(private readonly bot: Telegraf) {}

  async execute(input: { chatId: string; text: string }) {
    await this.bot.telegram.sendMessage(input.chatId, input.text);
    return { success: true };
  }
}