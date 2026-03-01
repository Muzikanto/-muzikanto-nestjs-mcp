import {
  McpBadRequestException,
  McpUnauthorizedException,
} from '@muzikanto/nestjs-mcp';
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';

@Catch(McpUnauthorizedException)
export class AuthFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    return {
      isError: true,
      messages: [
        { role: 'user', content: (exception as Error).message || 'No access' },
      ],
    };
  }
}

@Catch(McpBadRequestException)
export class BadRequestFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    return {
      isError: true,
      messages: [
        {
          role: 'user',
          content: (exception as Error).message || 'invalid arguments',
        },
      ],
    };
  }
}
