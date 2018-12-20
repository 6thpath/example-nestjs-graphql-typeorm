import { Module } from '@nestjs/common'
import { CatsResolvers } from './cats.resolvers'
import { CatsService } from './cats.service'
import { DatabaseModule } from '../database/database.module'
import { CatsProvider } from './cats.provider'

@Module({
  imports: [DatabaseModule],
  providers: [...CatsProvider, CatsService, CatsResolvers]
})

export class CatsModule {}
