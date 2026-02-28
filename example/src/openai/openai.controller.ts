import { Body, Controller, Post } from '@nestjs/common';
import { OpenAiService } from './openai.service';
import { ApiProperty } from '@nestjs/swagger';

class BodyDto {
  @ApiProperty({
    type: 'string',
    default: 'Please send mesage to telegram. chatId: 100, text: \"Hello\"',
  })
  text!: string;
}

@Controller('openai')
export class OpenAiController {
  constructor(private readonly openAiService: OpenAiService) {}

  @Post('chat')
  async chat(@Body() body: BodyDto) {
    const response = await this.openAiService.chat(body.text);

    return response;
  }
}
