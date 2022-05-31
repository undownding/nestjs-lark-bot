import {NestFactory} from '@nestjs/core'
import {LarkBotModule} from './lark-bot.module'

async function bootstrap() {
  const app = await NestFactory.create(LarkBotModule)
  await app.listen(3000)
}
bootstrap()
