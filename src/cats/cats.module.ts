import { Module } from '@nestjs/common'
import { CatsResolvers } from './cats.resolvers'
import { DatabaseModule } from '../database/database.module'
import { CatsProvider } from './cats.provider'

@Module({
  imports: [DatabaseModule],
  providers: [...CatsProvider, CatsResolvers]
})

export class CatsModule {}
