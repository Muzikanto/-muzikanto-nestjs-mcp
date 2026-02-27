import { McpUnauthorizedException } from '@muzikanto/nestjs-mcp';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
} from '@nestjs/common';

@Catch(McpUnauthorizedException)
export class TestFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    return {
      isError: true,
      messages: [{ type: 'text', text: (exception as Error).message || 'No access' }],
    };
  }
}
