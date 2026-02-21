import { Injectable } from '@nestjs/common';
import { IMcpTool, McpTool } from '../decorators/mcp-tool.decorator';

@McpTool()
@Injectable()
export class PaymentTool implements IMcpTool<{ cartId: string; }, { status: string, cartId: string }> {
  name = 'example';

  inputSchema = {
    cartId: { type: 'string', description: 'ID корзины' },
  };

  async execute(input: { cartId: string }) {
    return { status: 'confirmed', cartId: input.cartId };
  }
}
