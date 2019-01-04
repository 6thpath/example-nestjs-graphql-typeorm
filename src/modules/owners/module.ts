import { Module } from '@nestjs/common'
import { OwnersResolver } from './resolver'
import { DatabaseModule } from '../../database/module'
import { OwnersProvider } from './provider'
import { OwnersService } from './service'

@Module({
  imports: [DatabaseModule],
  providers: [...OwnersProvider, OwnersService, OwnersResolver]
})

export class OwnersModule {}
