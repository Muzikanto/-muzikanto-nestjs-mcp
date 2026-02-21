import 'reflect-metadata';

export interface IMcpTool {
  name: string;
  description?: string;
  inputSchema?: object | object[];
  execute(input: any): Promise<any>;
}

export const MCP_TOOL_METADATA = 'mcp:tool-class';

/**
 * Декоратор класса для MCP тулзы
 * @param name — уникальное имя тулзы
 */
export const McpTool = (name: string) => {
  return (target: any) => {
    Reflect.defineMetadata(MCP_TOOL_METADATA, { name }, target);
  };
};