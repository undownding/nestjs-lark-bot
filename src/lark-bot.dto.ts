import 'reflect-metadata'
import {Type} from 'class-transformer'

export class Options {
  debug?: boolean
  appId: string
  appSecret: string
  appVerificationToken?: string
}

class Header {
  public event_id?: string
  public token?: string
  public create_time?: string
  public event_type?: string
  public tenant_key?: string
  public app_id?: string
}

class Sender {
  public id?: string
  public id_type?: string
  public sender_type?: string
  public tenant_key?: string
}

class Body {
  public content?: string
}

export class Mentions {
  public key?: string
  public id?: string
  public id_type?: string
  public name?: string
  public tenant_key?: string
}

export class BotEventDto {
  @Type(() => Sender)
  public sender?: Sender

  @Type(() => Body)
  public body?: Body

  @Type(() => Mentions)
  public mentions?: Mentions[]

  public message_id?: string
  public root_id?: string
  public parent_id?: string
  public msg_type?: string
  public create_time?: string
  public update_time?: string
  public deleted?: boolean
  public updated?: boolean
  public chat_id?: string

  public upper_message_id?: string
}

export class BotMessageDto {
  @Type(() => Header)
  public header?: Header

  @Type(() => BotEventDto)
  public event?: BotEventDto

  public schema?: string
}

export type ResourceType = 'image' | 'file'
