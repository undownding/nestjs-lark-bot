import 'reflect-metadata'
import {Type} from 'class-transformer'

export class Options {
  debug?: boolean
  endpoint?: string
  appId: string
  appSecret: string
  appVerificationToken?: string
}

export abstract class BaseResponse<T> {
  code: number
  message: string
  data?: T
}

export class SessionData {
  'open_id': string
  'employee_id': string
  'union_id': string
  'session_key': string
  'tenant_key': string
  'access_token': string
  'expires_in': number
  'refresh_token': string
}

export type SessionResponseDto = BaseResponse<SessionData>

export class TokenResponse {
  code: number
  tenant_access_token: string
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

  public challenge?: string
}

export type ResourceType = 'image' | 'file'
