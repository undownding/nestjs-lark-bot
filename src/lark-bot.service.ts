import {forwardRef, Inject, Logger} from '@nestjs/common'
import {HttpService} from '@nestjs/axios'
import UserResponseDto, {UserIdType} from './user.dto'
import {BotEventDto, Options, ResourceType, SessionResponseDto, TokenResponse} from './lark-bot.dto'
import {Domain, LARK_OPTIONS} from './lark-bot.constants'
import {Method, ResponseType} from 'axios'


export abstract class LarkBotService {
  @Inject(forwardRef(() => LARK_OPTIONS))
  readonly options: Options

  @Inject(HttpService)
  protected readonly httpService: HttpService

  async getTenantAccessToken(): Promise<string> {
    if (this.options.debug) {
      Logger.log('getTenantAccessToken')
    }
    const response = await this.httpService.post<TokenResponse>(
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

  async getUserById(token: string, id: string, idType: UserIdType = 'open_id'): Promise<UserResponseDto> {
    return this.apiRequest<UserResponseDto>(
      `/open-apis/contact/v3/users/${id}?user_id_type=${idType}`, token
    )
  }

  public async getMessageResource(
    messageId: string,
    fileKey: string,
    token: string,
    type: ResourceType
  ): Promise<ArrayBuffer> {
    return this.apiRequest(
      `/open-apis/im/v1/messages/${messageId}/resources/${fileKey}?type=${type}`,
      token, 'GET', undefined, 'arraybuffer'
    )
  }

  public async code2session(code: string, token: string): Promise<SessionResponseDto> {
    return this.apiRequest<SessionResponseDto>(
      '/open-apis/mina/v2/tokenLoginValidate',
      token, 'POST', {code}
    )
  }

  public async apiRequest<T>(
    httpPath: string, token: string,
    httpMethod: Method = 'GET',
    data?: object, responseType?: ResponseType
  ): Promise<T> {
    return this.httpService.request<T>(
      {
        baseURL: this.options ? this.options.endpoint || Domain.FeiShu : Domain.FeiShu,
        url: httpPath,
        method: httpMethod,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Bearer ${token}`,
        },
        responseType,
        data,
      }
    ).toPromise().then((response) => response.data)
  }

  abstract onMessage(message: BotEventDto): unknown
}
