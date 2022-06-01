import {Inject, Injectable, Logger} from '@nestjs/common'
import {HttpService} from '@nestjs/axios'
import UserResponseDto, {UserIdType} from './user.dto'
import {BotEventDto, Options, ResourceType} from './lark-bot.dto'
import {LARK_OPTIONS} from './lark-bot.constants'

interface ITokenResponse {
  code: number
  tenant_access_token: string
}

export abstract class LarkBotService {
  @Inject(LARK_OPTIONS)
  readonly options: Options

  private readonly httpService: HttpService

  async getTenantAccessToken(): Promise<string> {
    if (this.options.debug) {
      Logger.log('getTenantAccessToken')
    }
    const response = await this.httpService.post<ITokenResponse>(
      'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal/',
      {
        app_id: this.options.appId,
        app_secret: this.options.appSecret,
      }
    ).toPromise()
      .catch((e) => Logger.error(e))

    const body = response['data']

    if (body.code !== 0) {
      Logger.error('get tenant_access_token error, code = %d', body.code.toString())
      return ''
    }

    if (this.options.debug) {
      Logger.log(`get tenant_access_token success, token = ${body.tenant_access_token}`)
    }
    return body.tenant_access_token ?? ''
  }

  async getUser(token: string, id: string, idType: UserIdType = 'open_id'): Promise<UserResponseDto> {
    return this.httpService.get<UserResponseDto>(
      `https://open.feishu.cn/open-apis/contact/v3/users/${id}?user_id_type=${idType}`,
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Bearer ${token}`,
        },
      },
    ).toPromise().then((response) => response.data)
  }

  public async getMessageResource(
    messageId: string,
    fileKey: string,
    token: string,
    type: ResourceType
  ): Promise<ArrayBuffer> {
    return this.httpService.axiosRef({
      url: `https://open.feishu.cn/open-apis/im/v1/messages/${messageId}/resources/${fileKey}?type=${type}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'arraybuffer',
    })
      .then((response) => response.data)
  }

  abstract onMessage(message: BotEventDto): void
}
