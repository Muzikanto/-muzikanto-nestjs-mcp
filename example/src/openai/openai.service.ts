import {
  McpClientService,
  McpOpenAiHelper,
} from '@muzikanto/nestjs-mcp/client';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { ChatCompletion, ChatCompletionMessageParam, ChatCompletionTool } from 'openai/resources';


@Injectable()
export class OpenAiService {
  private readonly client: OpenAI;
  private tools: ChatCompletionTool[] = [];

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
    if (!this.tools.length) {
      this.tools = await this.mcpClient
        .getAllTools()
        .then((res) => McpOpenAiHelper.convertTools(res.tools));
    }

    const completion = await this.handleMessage([
      {
        role: 'user',
        content: prompt,
      }
    ])

    const completion2 = await this.handleTool(completion);

    return completion2.choices[0].message;
  }

  private async handleTool(completion: ChatCompletion): Promise<ChatCompletion> {
    const first = completion.choices[0];

    if (
      first.finish_reason === 'tool_calls' &&
      first.message.tool_calls?.length
    ) {
      const toolCall = McpOpenAiHelper.convertToolCall(
        first.message.tool_calls[0] as any,
      );
      const toolResult = await this.mcpClient.callMcpTool(
        toolCall.name,
        toolCall.payload,
      );

      return this.handleMessage([
        {
          role: 'user',
          content: toolResult.messages
        }
      ]);
    }

    return completion;
  }

  private async handleMessage(messages: ChatCompletionMessageParam[]): Promise<ChatCompletion> {
    const completion = await this.client.chat.completions.create({
      model: 'arcee-ai/trinity-large-preview:free',
      messages,
      tool_choice: 'auto',
      tools: this.tools,
    });

    return completion;
  }
}
