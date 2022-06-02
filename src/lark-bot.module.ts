import {CacheModule, DynamicModule, Module, Type} from '@nestjs/common'
import {LarkBotService} from './lark-bot.service'
import {LARK_BOT, LARK_OPTIONS} from './lark-bot.constants'
import {Options} from './lark-bot.dto'
import {LarkBotController} from './lark-bot.controller'

export class OptionsProvider {
  imports?: Array<any>
  inject?: Array<any>
  useFactory?: (...args: any[]) => Options
}

@Module({})
export class LarkBotModule {
  static register<T extends LarkBotService>(botService: Type<T>, options: Options): DynamicModule {
    return {
      module: LarkBotModule,
      controllers: [LarkBotController],
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

  static registerFactory<T extends LarkBotService>(
    botService: Type<T>, optionsProvider: OptionsProvider
  ): DynamicModule {
    return {
      module: LarkBotModule,
      imports: optionsProvider.imports,
      controllers: [LarkBotController],
      providers: [
        {
          provide: LARK_OPTIONS,
          inject: optionsProvider.inject,
          useFactory: optionsProvider.useFactory,
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
          inject: optionsProvider.inject,
          useFactory: optionsProvider.useFactory,
        },
      ],
    }
  }
}
