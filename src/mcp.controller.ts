import { Controller, Post, Body, Header, Get } from "@nestjs/common";
import { McpMessage, McpService } from "./mcp.service";
import { McpMessageDto } from "./dto/McpMessage.dto";

@Controller("mcp")
export class McpController {
  constructor(private readonly service: McpService) {}

  @Post()
  @Header("Content-Type", "application/json")
  async handle(@Body() body: McpMessageDto) {
    return this.service.sendMessage(body);
  }

  @Get("tools")
  async getTools() {
    const tools = this.service.listTools();
    return { tools };
  }
}
