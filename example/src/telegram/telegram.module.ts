// telegraf.module.ts
import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigService } from '@nestjs/config';
import { McpClientModule } from '@muzikanto/nestjs-mcp';

@Module({
  imports: [
    McpClientModule.forRoot({ useValue: { url: 'http://127.0.0.1:3000/api' } }),
    TelegrafModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        const token = config.get('TELEGRAM_TOKEN');
        if (!token) {
          throw new Error('TELEGRAM_TOKEN is not set');
        }

        return {
          token,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [TelegramService],
})
export class TelegramModule {}
