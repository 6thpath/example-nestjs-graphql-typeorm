import * as env from 'dotenv'
env.config()
import * as cors from 'cors'
import { NestFactory } from '@nestjs/core'
import { ApplicationModule } from './modules/app/module'
// import { MyLogger } from './common/logger/LoggerService'

async function bootstrap() {
  const app = await NestFactory.create(
    ApplicationModule
    // { logger: new MyLogger() }
  )
  app.use(cors())
  await app.listen(process.env.PORT || 3000)
}

bootstrap()
