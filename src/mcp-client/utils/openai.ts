import { McpToolDto } from "../../mcp-server/dto/McpTool.dto";

type OpenAiCall = { function: { name: string; arguments: string } };

export class McpOpenAiHelper {
  public static convertTools(tools: McpToolDto[]) {
    return tools.map((tool) => McpOpenAiHelper.convertTool(tool));
  }

  public static convertTool(tool: McpToolDto) {
    return {
      type: "function" as const,
      function: {
        name: tool.name,
        description: tool.description,
        parameters: tool.inputSchema,
      },
    };
  }

  public static convertToolCalls(toolCalls: OpenAiCall[]) {
    return toolCalls.map((toolCall) =>
      McpOpenAiHelper.convertToolCall(toolCall),
    );
  }

  public static convertToolCall({
    function: { name, arguments: args },
  }: OpenAiCall) {
    const argsJson = JSON.parse(args || "{}");

    return {
      name,
      payload: argsJson,
    };
  }
}
