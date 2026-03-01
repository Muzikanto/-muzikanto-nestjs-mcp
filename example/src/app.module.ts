import { Module } from '@nestjs/common';
import { McpServerModule } from './mcp-server/mcp.module';
import { ConfigModule } from '@nestjs/config';
import { OpenAiModule } from './openai/openai.module';
import { TelegramModule } from './telegram/telegram.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    OpenAiModule,
    McpServerModule,
    TelegramModule,
  ],
})
export class AppModule {}
