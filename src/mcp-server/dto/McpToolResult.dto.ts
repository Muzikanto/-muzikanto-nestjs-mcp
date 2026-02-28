import { ApiProperty } from "@nestjs/swagger";
import { McpToolResultMessageDto } from "./McpToolResultMessage.dto";

export class McpToolResultDto<Result = any> {
  @ApiProperty({ description: "Tool result", nullable: true })
  structuredContent?: Result;

  @ApiProperty({ type: McpToolResultMessageDto, isArray: true })
  messages!: McpToolResultMessageDto[];

  @ApiProperty({ type: "boolean", nullable: true })
  isError?: boolean;
}
