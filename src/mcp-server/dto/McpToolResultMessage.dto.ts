import { ApiProperty } from "@nestjs/swagger";

export class McpToolResultMessageDto {
  @ApiProperty({ type: "string", description: "Message type" })
  type!: 'text';

  @ApiProperty({ type: "string", description: "Message text" })
  text!: string;
}
