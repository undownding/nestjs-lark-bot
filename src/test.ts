import 'reflect-metadata'
import {Type} from 'class-transformer'

export default class test {
  public schema?: string
  @Type(() => Header)
  public header?: Header
}

export class Header {
  public event_id?: string
  public token?: string
  public create_time?: string
  public event_type?: string
  public tenant_key?: string
  public app_id?: string
}
