import { IMcpPrompt, McpPrompt } from '../src/decorators/mcp-prompt.decorator';

@McpPrompt()
export class TelegramAutoReplyPrompt implements IMcpPrompt<{ text: string; chatId: number; }> {
  name = 'telegram_auto_reply';
  description = 'Generate a short, fiendly reply to an incoming Telegram message and send it back to the same chat using teegram.sendMessage tool';

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

  async execute({ text, chatId }: { text: string; chatId: number }) {
    return [
      {
        role: "system",
        content: `You are a friendly Telegram bot. Reply briefly and to the point.`
      },
      {
        role: "user",
        content: text
      },
      {
        role: "assistant",
        tool_call: {
          name: "telegram.sendMessage",
          arguments: {
            chatId,
            text: "{{model_output}}"
          }
        }
      }
    ];
  }
}
