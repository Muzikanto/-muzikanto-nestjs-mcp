import { McpMessage } from "../mcp.service";

export class McpMessageDto implements McpMessage {
    type!: string;

    payload!: any;
}