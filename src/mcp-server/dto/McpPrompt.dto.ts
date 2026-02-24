import { ApiProperty } from "@nestjs/swagger";

export class McpPromptDto {
  @ApiProperty({ type: "string", description: "Propmt name" })
  name!: string;

  @ApiProperty({
    type: "string",
    description: "Propmt title",
    nullable: true,
  })
  title?: string;

  @ApiProperty({
    type: "string",
    description: "Propmt description",
    nullable: true,
  })
  description?: string;

  @ApiProperty({
    type: "object",
    description: "Tool validation schema",
    nullable: true,
    additionalProperties: false,
  })
  inputSchema?: any;
}
