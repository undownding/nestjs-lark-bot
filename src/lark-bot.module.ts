import {DynamicModule, Module, Type} from '@nestjs/common'
import {LarkBotService} from './lark-bot.service'
import {LARK_BOT, LARK_OPTIONS} from './lark-bot.constants'
import {ConfigModule} from '@nestjs/config'
import {Options} from './lark-bot.dto'

@Module({})
export class LarkBotModule {
  static register<T extends LarkBotService>(botService: Type<T>, options: Options): DynamicModule {
    return {
      module: LarkBotModule,
      imports: [
        ConfigModule,
        botService,
      ],
      providers: [
        {
          provide: LARK_OPTIONS,
          useValue: options,
        },
        {
          provide: LARK_BOT,
          useClass: botService,
        },
      ],
      exports: [
        {
          provide: LARK_BOT,
          useExisting: botService,
        },
        {
          provide: LARK_OPTIONS,
          useValue: options,
        },
      ],
    }
  }
}
