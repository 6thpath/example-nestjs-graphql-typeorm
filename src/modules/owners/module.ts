import { Module } from '@nestjs/common'
import { OwnersResolvers } from './resolver'
import { DatabaseModule } from '../../database/module'
import { OwnersProvider } from './provider'

@Module({
  imports: [DatabaseModule],
  providers: [...OwnersProvider, OwnersResolvers]
})

export class OwnersModule {}
