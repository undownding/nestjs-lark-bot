import {Test, TestingModule} from '@nestjs/testing'
import {LarkBotController} from './lark-bot.controller'
import {LarkBotService} from './lark-bot.service'

describe('AppController', () => {
  let larkBotController: LarkBotController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LarkBotController],
      providers: [LarkBotService],
    }).compile()

    larkBotController = app.get<LarkBotController>(LarkBotController)
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(larkBotController.getHello()).toBe('Hello World!')
    })
  })
})
