import {BotEventDto} from './lark-bot.dto'

export abstract class LarkBotCli {
  abstract options: Options

  abstract onMessage(message: BotEventDto): void
}

export class Options {
  debug?: boolean
  appId: string
  appSecret: string
  appVerificationToken: string
}
