import {
  McpClientService,
  McpOpenAiHelper,
} from '@muzikanto/nestjs-mcp/client';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { ChatCompletionTool } from 'openai/resources';

let cachedTools: ChatCompletionTool[];

@Injectable()
export class OpenAiService {
  private readonly client: OpenAI;

  constructor(
    protected readonly configService: ConfigService,
    protected readonly mcpClient: McpClientService,
  ) {
    this.client = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: configService.get('OPENAI_API_KEY'),
    });
  }

  async chat(prompt: string) {
    if (!cachedTools) {
      cachedTools = await this.mcpClient
        .getAllTools()
        .then((res) => McpOpenAiHelper.convertTools(res.tools));
    }

    const completion = await this.client.chat.completions.create({
      model: 'arcee-ai/trinity-large-preview:free',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      tool_choice: 'auto',
      tools: cachedTools,
    });

    const first = completion.choices[0];

    if (
      first.finish_reason === 'tool_calls' &&
      first.message.tool_calls?.length
    ) {
      const toolCall = McpOpenAiHelper.convertToolCall(
        first.message.tool_calls[0],
      );
      const toolResult = await this.mcpClient.callMcpTool(
        toolCall.name,
        toolCall.payload,
      );

      return toolResult;
    }

    return first.message;
  }
}
