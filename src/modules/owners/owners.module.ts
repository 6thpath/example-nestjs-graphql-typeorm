import { Module } from '@nestjs/common'
import { OwnersResolvers } from './owners.resolver'
import { DatabaseModule } from '../../database/database.module'
import { OwnersProvider } from './owners.provider'

@Module({
  imports: [DatabaseModule],
  providers: [...OwnersProvider, OwnersResolvers]
})

export class OwnersModule {}
