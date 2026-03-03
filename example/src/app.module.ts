import { Module } from '@nestjs/common';
import { McpServerModule } from './mcp-server/mcp.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TestOpenAiModule } from './openai/openai.module';
import { TelegramModule } from './telegram/telegram.module';
import { OpenAIModule } from '@muzikanto/nestjs-openai';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    OpenAIModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return {
          baseURL: config.get('OPENAI_API_BASE_URL'),
          apiKey: config.get('OPENAI_API_KEY')
        };
      },
      inject: [ConfigService],
    }),
    TestOpenAiModule,
    McpServerModule,
    TelegramModule,
  ],
})
export class AppModule {}
