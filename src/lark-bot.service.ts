import {Injectable} from '@nestjs/common'

@Injectable()
export class LarkBotService {
  getHello(): string {
    return 'Hello World!'
  }
}
