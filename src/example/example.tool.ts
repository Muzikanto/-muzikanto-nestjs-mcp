import { Injectable } from '@nestjs/common';
import { z } from 'zod';
import { IMcpTool, McpTool } from '../decorators/mcp-tool.decorator';

@McpTool('example')
@Injectable()
export class PaymentTool implements IMcpTool {
  name = 'example';

  static inputSchema = z.object({
    cartId: z.string().describe('ID'),
  });

  async execute(input: { cartId: string }) {
    return { status: 'confirmed', cartId: input.cartId };
  }
}
