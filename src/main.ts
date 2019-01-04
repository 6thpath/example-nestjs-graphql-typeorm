import * as env from 'dotenv'
env.config()
import * as cors from 'cors'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory, FastifyAdapter } from '@nestjs/core'
import { ApplicationModule } from './modules/app/module'
// import { MyLogger } from './common/logger/LoggerService'

async function bootstrap() {
  const app = await NestFactory.create(
    ApplicationModule,
    new FastifyAdapter(),
    // { logger: new MyLogger() }
  )
  app.use(cors())
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.PORT || 3000, '0.0.0.0')
}

bootstrap()
