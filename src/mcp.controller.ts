import { Controller, Post, Body, Header, Get } from "@nestjs/common";
import { McpMessage, McpService } from "./mcp.service";
import { McpMessageDto } from "./dto/McpMessage.dto";
import { ApiBadRequestResponse, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { McpToolDto } from "./dto/McpTool.dto";
import { McpToolsDto } from "./dto/McpTools.dto";

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
}
