import {Inject, Injectable, Logger} from '@nestjs/common'
import {LarkBotCli} from './lark-bot.cli'
import {LARK_BOT} from './lark-bot.constants'
import {HttpService} from '@nestjs/axios'
import UserResponseDto, {UserIdType} from './user.dto'
import {ResourceType} from './lark-bot.dto'

interface ITokenResponse {
  code: number
  tenant_access_token: string
}

@Injectable()
export class LarkBotService {
  @Inject(LARK_BOT)
  private readonly larkCli: LarkBotCli

  private readonly httpService: HttpService

  async getHello(): Promise<string> {
    return 'Hello World!'
  }

  async getTenantAccessToken(): Promise<string> {
    if (this.larkCli.options.debug) {
      Logger.log('getTenantAccessToken')
    }
    const response = await this.httpService.post<ITokenResponse>(
      'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal/',
      {
        app_id: this.larkCli.options.appId,
        app_secret: this.larkCli.options.appSecret,
      }
    ).toPromise()
      .catch((e) => Logger.error(e))

    const body = response['data']

    if (body.code !== 0) {
      Logger.error('get tenant_access_token error, code = %d', body.code.toString())
      return ''
    }

    if (this.larkCli.options.debug) {
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
}
