import { ValidationPipe } from '@nestjs/common'
import { NestFactory, FastifyAdapter } from '@nestjs/core'
import { ApplicationModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule, new FastifyAdapter())
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.PORT || 3000, '0.0.0.0')
}

bootstrap()
