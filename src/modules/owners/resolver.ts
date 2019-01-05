import { Inject } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateOwnerInput, UpdateOwnerInput } from '../../schema/owners.schema'
import { OwnersService } from './service'

@Resolver('Owner')
export class OwnersResolver {
  constructor(
    private readonly ownersService: OwnersService
  ) {}

  // @ResolveProperty()
  // async posts(@Parent() cat) {
  //   const { _id } = cat
  //   return await this.catRepository.findAll({ authorId: id });
  // }

  @Query('getOwners')
  async getOwners() {
    return await this.ownersService.findAll()
  }

  @Query('getOwner')
  async getOwner(@Args('_id') _id: string) {
    return await this.ownersService.findOneOnly(_id)
  }

  @Mutation('createOwner')
  async create(@Args('createOwnerInput') args: CreateOwnerInput) {
    return await this.ownersService.create(args)
  }

  @Mutation('updateOwner')
  async update(@Args('updateOwnerInput') args: UpdateOwnerInput) {
    return await this.ownersService.update(args)
  }

  @Mutation('deleteOwner')
  async delete(@Args('_id') _id: string) {
    return await this.ownersService.delete(_id)
  }
}
