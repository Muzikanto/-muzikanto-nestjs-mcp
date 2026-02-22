import { Controller, Post, Body, Header, Get, Param } from "@nestjs/common";
import { McpService } from "./mcp.service";
import { McpMessageDto } from "./dto/McpMessage.dto";
import { ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { McpToolsDto } from "./dto/McpTools.dto";
import { McpPromptsDto } from "./dto/McpPrompts.dto";
import { McpPromptMessagesDto } from "./dto/McpPromptMessages.dto";

@Controller("mcp")
export class McpController {
  constructor(private readonly service: McpService) {}

  @Post()
  @Header("Content-Type", "application/json")
  @ApiOperation({
    summary: 'Request tool',
  })
  @ApiResponse({
    status: 200,
    description: 'Tool execution result',
  })
  @ApiBadRequestResponse({
    description: 'Invalid request body',
  })
  async handle(@Body() body: McpMessageDto) {
    return this.service.sendMessage(body);
  }

  @Get("tools")
  @ApiOperation({
    summary: 'Get tool list',
  })
  @ApiResponse({
    status: 200,
    description: 'Tools list',
    type: McpToolsDto,
  })
  async getTools(): Promise<McpToolsDto> {
    const tools = this.service.listTools();
    return { tools };
  }

  @Get("prompts")
  @ApiOperation({
    summary: 'Get prompt list',
  })
  @ApiResponse({
    status: 200,
    description: 'Prompts list',
    type: McpPromptsDto,
  })
  async getPrompts(): Promise<McpPromptsDto> {
    const prompts = this.service.listPrompts();
    return { prompts };
  }

  @Post("prompts/:name")
  @ApiOperation({
    summary: 'Generate messages by prompt name',
  })
  @ApiBody({
    description: 'Any body structure',
    type: Object, // Указываем, что тело может быть любым объектом
  })
  @ApiResponse({
    status: 200,
    description: 'Prompt messages',
    type: McpPromptMessagesDto,
  })
  @ApiNotFoundResponse({
    description: 'Not found prompt',
  })
  @ApiBadRequestResponse({
    description: 'Invalid prompt arguments',
  })
  async getPrompt(@Param('name') name: string, @Body() body: object): Promise<McpPromptMessagesDto> {
    const messages = await this.service.getPrompt(name, body);
    return {
      messages,
    };
  }
}
