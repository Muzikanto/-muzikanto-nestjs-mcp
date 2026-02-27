import { ApiProperty } from "@nestjs/swagger";
import { McpToolResultMessageDto } from "./McpToolResultMessage.dto";

export class McpToolResultDto {
  @ApiProperty({ description: "Tool result", nullable: true })
  data?: any;

  @ApiProperty({ type: McpToolResultMessageDto, isArray: true })
  messages!: McpToolResultMessageDto[];
}
