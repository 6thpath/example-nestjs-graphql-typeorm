import { Inject } from '@nestjs/common'
import { Repository } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Args, Mutation, Query, Resolver, Parent, ResolveProperty } from '@nestjs/graphql'
import { Owner, CreateOwnerInput, UpdateOwnerInput } from '../../schema/owners.schema'
import { Cat } from '../../schema/cats.schema'

@Resolver('Owner')
export class OwnersResolvers {
  constructor(
    @Inject('OwnerRepositoryToken')
    private readonly ownerRepository: Repository<Owner>,
    // @Inject('CatRepositoryToken')
    // private readonly catRepository: Repository<Cat>
  ) {}

  // @ResolveProperty()
  // async posts(@Parent() cat) {
  //   const { _id } = cat
  //   return await this.catRepository.findAll({ authorId: id });
  // }

  @Query('getOwners')
  async getOwners() {
    return await this.ownerRepository.find()
  }

  @Query('getOwner')
  async getOwner(_id: string) {
    return await this.ownerRepository.findOne(_id)
  }

  @Mutation('createOwner')
  async create(@Args('createOwnerInput') args: CreateOwnerInput) {
    const newOwner = new Owner(args)
    newOwner._id = uuid()
    return await this.ownerRepository.save(newOwner)
  }

  @Mutation('updateOwner')
  async update(@Args('updateOwnerInput') args: UpdateOwnerInput) {
    await this.ownerRepository.update({ _id: args._id }, args)
    return this.ownerRepository.findOne({ _id: args._id })
  }

  @Mutation('deleteOwner')
  async delete( _id: string) {
    const deletedOwner = await this.ownerRepository.findOne(_id)
    this.ownerRepository.delete({ _id })
    return deletedOwner
  }
}
