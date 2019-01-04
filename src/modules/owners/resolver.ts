import { Inject } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateOwnerInput, UpdateOwnerInput } from '../../schema/owners.schema'
import { OwnersService } from './service'

@Resolver('Owner')
export class OwnersResolver {
  constructor(
    @Inject('OwnerToken')
    private readonly ownersService: OwnersService
    // @Inject('CatToken')
    // private readonly catRepository: Repository<Cat>
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
  async getOwner(_id: string) {
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
  async delete(_id: string) {
    return await this.ownersService.delete(_id)
  }
}
