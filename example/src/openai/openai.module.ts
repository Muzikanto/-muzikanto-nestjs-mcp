import { Global, Module } from '@nestjs/common';
import { OpenAiController } from './openai.controller';
import { OpenAiService } from './openai.service';
import { McpClientModule } from '@muzikanto/nestjs-mcp';

@Global()
@Module({
  imports: [
    McpClientModule.forRoot({ useValue: { url: 'http://127.0.0.1:3000/api' } }),
  ],
  controllers: [OpenAiController],
  providers: [OpenAiService],
  exports: [OpenAiService],
})
export class OpenAiModule {}
