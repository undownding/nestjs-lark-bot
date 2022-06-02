import {Body, Controller, ForbiddenException, Get, HttpCode, Inject, Post} from '@nestjs/common'
import {LarkBotService} from './lark-bot.service'
import {LARK_BOT} from './lark-bot.constants'
import {BotMessageDto, SessionResponseDto} from './lark-bot.dto'

@Controller('lark')
export class LarkBotController {
  @Inject(LARK_BOT)
  private readonly botService: LarkBotService

  @Get('/options')
  async printOptions(): Promise<string> {
    if (this.botService.options.debug) {
      return JSON.stringify(this.botService.options)
    }
    throw new ForbiddenException()
  }

  @Post('/callback')
  @HttpCode(200)
  async handleLarkRequest(@Body() body: BotMessageDto): Promise<unknown> {
    if (body.challenge) {
      return {challenge: body.challenge}
    }
    switch (body.header.event_type) {
      case 'im.message.receive_v1':
        return this.botService.onMessage(body.event)
      default:
    }
  }
}
