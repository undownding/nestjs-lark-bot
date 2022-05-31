import {DynamicModule, Module} from '@nestjs/common'
import {LarkBotService} from './lark-bot.service'
import {LARK_BOT} from './lark-bot.constants'

@Module({})
export class LarkBotModule {
  static register(botImpl): DynamicModule {
    return {
      module: LarkBotModule,
      imports: [botImpl],
      providers: [
        LarkBotService,
        {
          provide: LARK_BOT,
          useClass: botImpl,
        },
      ],
      exports: [LarkBotService],
    }
  }
}
