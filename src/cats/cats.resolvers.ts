import { UseGuards, Injectable, Inject } from '@nestjs/common'
import { Repository } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { CatsGuard } from './cats.guard'
import { CreateCatInput, Cat } from '../schema/cats.schema'

const pubSub = new PubSub();

@Resolver('Cat')
export class CatsResolvers {
  constructor(
    @Inject('CatRepositoryToken')
    private readonly catRepository: Repository<Cat>
  ) {}

  @Query()
  @UseGuards(CatsGuard)
  async getCats() {
    return await this.catRepository.find()
  }

  @Query('cat')
  async getCat(_id: string) {
    return await this.catRepository.findOne({ _id })
  }

  @Mutation('createCat')
  async createCat(@Args('createCatInput') args: CreateCatInput) {
    const newCat = new Cat(args)
    newCat._id = uuid()
    console.log(newCat)
    const createdCat = await this.catRepository.save(newCat)
    pubSub.publish('catCreated', { catCreated: createdCat })
    return createdCat
  }

  // @Mutation('updateCat')
  // async update(@Args('updateCat') args: CreateCatInput): Promise<Cat> {
    // await this.catRepository.update({ _id: cat._id }, cat)
    // return await this.catRepository.findOne({ _id: cat._id })
  //   const createdCat = this.catRepository.create(args)
  //   pubSub.publish('catCreated', { catCreated: createdCat })
  //   return createdCat
  // }

  // @Mutation('deleteCat')
  // async delete(@Args('deleteCat') args: CreateCatInput): Promise<Cat|boolean> {
    // await this.catRepository.delete({ _id })
    // return true
  //   const createdCat = this.catRepository.create(args)
  //   pubSub.publish('catCreated', { catCreated: createdCat })
  //   return createdCat
  // }

  @Subscription('catCreated')
  catCreated() {
    return {
      subscribe: () => pubSub.asyncIterator('catCreated')
    }
  }
}
