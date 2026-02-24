import { Injectable } from "@nestjs/common";
import "reflect-metadata";

import type * as z3 from "zod/v3";

type AnySchema = z3.ZodTypeAny;
type ZodRawShapeCompat = Record<string, AnySchema>;

export type IMcpPromptMessage = {
  role: "user" | "assistant" | "system";
  content?: string;
  tool_call?: { name: string; arguments: object };
};

export interface IMcpPrompt<
  Payload = any,
  Result extends IMcpPromptMessage[] = IMcpPromptMessage[],
> {
  name: string;
  title?: string;
  description?: string;
  inputSchema?: ZodRawShapeCompat;
  execute(input: Payload): Promise<Result>;
}

export const MCP_PROMPT_METADATA = "mcp:prompt-class";

/**
 * Декоратор класса для MCP prompt
 */
export const McpPrompt = () => {
  return (target: any) => {
    Injectable()(target);
    Reflect.defineMetadata(MCP_PROMPT_METADATA, {}, target);
  };
};
