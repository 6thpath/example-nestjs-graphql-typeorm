import { UseGuards, Inject } from '@nestjs/common'
import { Repository } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { CatsGuard } from './cats.guard'
import { Cat, CreateCatInput, UpdateCatInput } from '../../schema/cats.schema'

const pubSub = new PubSub();

@Resolver('Cat')
export class CatsResolvers {
  constructor(
    @Inject('CatRepositoryToken')
    private readonly catRepository: Repository<Cat>
  ) {}

  @Query('getCats')
  @UseGuards(CatsGuard)
  async getCats() {
    return await this.catRepository.find()
  }

  @Query('getCat')
  async getCat(_id: string) {
    return await this.catRepository.findOne(_id)
  }

  @Mutation('createCat')
  async create(@Args('createCatInput') args: CreateCatInput) {
    const newCat = new Cat(args)
    newCat._id = uuid()
    const createdCat = await this.catRepository.save(newCat)

    pubSub.publish('catCreated', { catEvent: createdCat })

    return createdCat
  }

  @Mutation('updateCat')
  async update(@Args('updateCatInput') args: UpdateCatInput): Promise<Cat> {
    await this.catRepository.update({ _id: args._id }, args)
    const updatedCat = await this.catRepository.findOne({ _id: args._id })

    pubSub.publish('catUpdated', { catEvent: updatedCat })

    return updatedCat
  }

  @Mutation('deleteCat')
  async delete( _id: string): Promise<Cat> {
    const deletedCat = await this.catRepository.findOne(_id)
    this.catRepository.delete({ _id })

    pubSub.publish('catDeleted', { catEvent: deletedCat })

    return deletedCat
  }

  @Subscription('catEvent')
  catEvent() {
    return {
      subscribe: () => pubSub.asyncIterator(['catCreated', 'catUpdated', 'catDeleted'])
    }
  }
}
