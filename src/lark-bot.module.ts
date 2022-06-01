import {DynamicModule, Module, Type} from '@nestjs/common'
import {LarkBotService} from './lark-bot.service'
import {LARK_BOT} from './lark-bot.constants'
import {LarkBotCli} from './lark-bot.cli'
import {ConfigModule, ConfigService} from '@nestjs/config'

@Module({})
export class LarkBotModule {
  static register<T extends LarkBotCli>(cliType: Type<T>, cliFactory: (ConfigService) => T): DynamicModule {
    return {
      module: LarkBotModule,
      imports: [
        ConfigModule,
        cliType,
      ],
      providers: [
        LarkBotService,
        {
          inject: [ConfigService],
          provide: LARK_BOT,
          useFactory: cliFactory,
        },
      ],
      exports: [LarkBotService],
    }
  }
}
