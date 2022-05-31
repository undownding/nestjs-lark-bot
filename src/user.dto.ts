import 'reflect-metadata'
import {Type} from 'class-transformer'

export type UserIdType = 'open_id' | 'union_id' | 'user_id'

export class GenericUser {
  public id?: string
  public type?: number
}

export class Avatar {
  public avatar_72?: string
  public avatar_240?: string
  public avatar_640?: string
  public avatar_origin?: string
}

export class Status {
  public is_frozen?: boolean
  public is_resigned?: boolean
  public is_activated?: boolean
  public is_exited?: boolean
  public is_unjoin?: boolean
}

export class Orders {
  public department_id?: string
  public user_order?: number
  public department_order?: number
}

export class Value {
  @Type(() => GenericUser)
  public generic_user?: GenericUser

  public text?: string
  public url?: string
  public pc_url?: string
  public option_value?: string
  public name?: string
  public picture_url?: string
}

export class CustomAttrs {
  @Type(() => Value)
  public value?: Value

  public type?: string
  public id?: string
}

export class User {
  @Type(() => Orders)
  public orders?: Orders[]

  @Type(() => CustomAttrs)
  public custom_attrs?: CustomAttrs[]


  @Type(() => Avatar)
  public avatar?: Avatar

  @Type(() => Status)
  public status?: Status

  public union_id?: string
  public user_id?: string
  public open_id?: string
  public name?: string
  public en_name?: string
  public nickname?: string
  public email?: string
  public mobile?: string
  public mobile_visible?: boolean
  public gender?: number

  public department_ids?: string[]
  public leader_user_id?: string
  public city?: string
  public country?: string
  public work_station?: string
  public join_time?: number
  public is_tenant_manager?: boolean
  public employee_no?: string
  public employee_type?: number

  public enterprise_email?: string
  public job_title?: string
}

export class Data {
  @Type(() => User)
  public user?: User
}

export default class UserResponseDto {
  @Type(() => Data)
  public data?: Data

  public code?: number
  public msg?: string
}

