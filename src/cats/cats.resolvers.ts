import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { CatsGuard } from './cats.guard'
import { CatsService } from './cats.service'
import { CreateCatInput } from '../schema/cats.schema'

const pubSub = new PubSub();

@Resolver('Cat')
export class CatsResolvers {
  constructor(private readonly catsService: CatsService) {}

  @Query()
  @UseGuards(CatsGuard)
  getCats() {
    return this.catsService.getAll()
  }

  @Query('cat')
  findOneById(id: string) {
    return this.catsService.getOne(id)
  }

  @Mutation('createCat')
  create(@Args('createCatInput') args: CreateCatInput) {
    const createdCat = this.catsService.create(args)
    pubSub.publish('catCreated', { catCreated: createdCat })
    return createdCat
  }

  @Subscription('catCreated')
  catCreated() {
    return {
      subscribe: () => pubSub.asyncIterator('catCreated')
    }
  }
}
