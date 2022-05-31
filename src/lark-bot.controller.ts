import {Controller, Get} from '@nestjs/common'
import {LarkBotService} from './lark-bot.service'

@Controller()
export class LarkBotController {
  constructor(private readonly appService: LarkBotService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }
}
