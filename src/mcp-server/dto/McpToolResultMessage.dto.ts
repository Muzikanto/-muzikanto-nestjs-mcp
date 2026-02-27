import { ApiProperty } from "@nestjs/swagger";

export class McpToolResultMessageDto {
  @ApiProperty({ type: "string", description: "Message type" })
  type!: string;

  @ApiProperty({ type: "string", description: "Message text" })
  text!: string;
}
