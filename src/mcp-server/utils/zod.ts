import { z } from "zod/v3";
import { z as z4 } from "zod/v4";
import convert from "zod-to-json-schema";

// Функция преобразования Zod в JSON Schema
export function zodToJsonSchema(schema: Record<string, any>, deep = 0): any {
  if (schema && deep === 0) {
    const properties: any = {};
    const required: string[] = [];

    for (const [key, value] of Object.entries(schema)) {
      const jsonSchemaProp = convert(value);
      properties[key] = jsonSchemaProp;
      if (
        !(
          value instanceof z.ZodOptional ||
          value instanceof z.ZodNullable ||
          value instanceof z4.ZodOptional ||
          value instanceof z4.ZodNullable
        )
      ) {
        required.push(key);
      }
    }

    return {
      type: "object",
      properties,
      required,
    };
  }

  return {};
}
