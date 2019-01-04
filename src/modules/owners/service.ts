import { Injectable, Inject } from '@nestjs/common'
import { v4 as uuid } from 'uuid'
import { ApolloError } from 'apollo-server-express'

// TypeORM
// import { Repository } from 'typeorm'
// import { Owner, CreateOwnerInput, UpdateOwnerInput } from '../../schema/owners.schema'

// Mongoose
import { Model } from 'mongoose'
import { Owner } from './mongoose/interfaces'
import { CreateOwnerInput, UpdateOwnerInput } from '../../schema/owners.schema'

@Injectable()
export class OwnersService {
  constructor(
    @Inject('OwnerToken')
    // TypeORM
    // private readonly ownerRepository: Repository<Owner>

    // Mongoose
    private readonly ownerModel: Model<Owner>
  ) {}

  async create(owner: CreateOwnerInput): Promise<Owner|ApolloError> {
    try {
      // TypeORM
      // const newOwner = new Owner(owner)
      // newOwner._id = uuid()
      // return await this.ownerRepository.save(newOwner)

      // Mongoose
      const createdOwner = new this.ownerModel(owner)
      createdOwner._id = uuid()
      return await createdOwner.save()
    } catch {
      return new ApolloError('An error occurred!', '400')
    }
  }

  async update(owner: UpdateOwnerInput): Promise<Owner|ApolloError> {
    try {
      // TypeORM
      // await this.ownerRepository.update({ _id: owner._id }, owner)
      // return await this.ownerRepository.findOne({ _id: owner._id })

      // Mongoose
      await this.ownerModel.updateOne({ _id: owner._id }, owner)
      return await this.ownerModel.findOne({ _id: owner._id})
    } catch {
      return new ApolloError('An error occurred!', '400')
    }
  }

  async delete(_id: string): Promise<Owner|ApolloError> {
    try {
      // TypeORM
      // const deletedCat = await this.catRepository.findOne(_id)
      // this.catRepository.delete({ _id })
      // return deletedCat

      // Mongoose
      const deletedOwner = await this.ownerModel.findOne({_id})
      this.ownerModel.findByIdAndRemove(_id)
      return deletedOwner
    } catch {
      return new ApolloError('An error occurred!', '400')
    }
  }

  async findAll(): Promise<Owner[]|ApolloError> {
    try {
      // TypeORM
      // return await this.ownerRepository.find()

      // Mongoose
      return await this.ownerModel.find()
    } catch {
      return new ApolloError('An error occurred!', '400')
    }
  }

  async findOneOnly(_id: string): Promise<Owner|ApolloError> {
    try {
      // TypeORM
      // return await this.ownerRepository.findOne(_id)

      // Mongoose
      return await this.ownerModel.findOne({ _id })
    } catch {
      return new ApolloError('An error occurred!', '400')
    }
  }
}
