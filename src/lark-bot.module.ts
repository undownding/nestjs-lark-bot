import {Module} from '@nestjs/common'
import {LarkBotController} from './lark-bot.controller'
import {LarkBotService} from './lark-bot.service'

@Module({
  imports: [],
  controllers: [LarkBotController],
  providers: [LarkBotService],
})
export class LarkBotModule {}
