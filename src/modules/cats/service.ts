import { Injectable, Inject } from '@nestjs/common'
import { v4 as uuid } from 'uuid'
import { ApolloError } from 'apollo-server-express'

// TypeORM
// import { Repository } from 'typeorm'
// import { Cat, CreateCatInput, UpdateCatInput } from '../../schema/cats.schema'

// Mongoose
import { Model } from 'mongoose'
import { Cat } from './mongoose/interfaces'
import { CreateCatInput, UpdateCatInput } from '../../schema/cats.schema'

@Injectable()
export class CatsService {
  constructor(
    @Inject('CatToken')
    // TypeORM
    // private readonly catRepository: Repository<Cat>

    // Mongoose
    private readonly catModel: Model<Cat>
  ) {}

  async create(cat: CreateCatInput): Promise<Cat|ApolloError> {
    try {
      // TypeORM
      // const newCat = new Cat(cat)
      // newCat._id = uuid()
      // return await this.catRepository.save(newCat)

      // Mongoose
      const createdCat = new this.catModel(cat)
      createdCat._id = uuid()
      return await createdCat.save()
    } catch {
      return new ApolloError('An error occurred!', '400')
    }
  }

  async update(cat: UpdateCatInput): Promise<Cat|ApolloError> {
    try {
      // TypeORM
      // await this.catRepository.update({ _id: cat._id }, args)
      // return await this.catRepository.findOne({ _id: args._id })

      // Mongoose
      await this.catModel.updateOne({ _id: cat._id }, cat)
      return await this.catModel.findOne({ _id: cat._id})
    } catch {
      return new ApolloError('An error occurred!', '400')
    }
  }

  async delete(_id: string): Promise<Cat|ApolloError> {
    try {
      // TypeORM
      // const deletedCat = await this.catRepository.findOne(_id)
      // this.catRepository.delete({ _id })
      // return deletedCat

      // Mongoose
      const deletedCat = await this.catModel.findOne({_id})
      this.catModel.findByIdAndRemove(_id)
      return deletedCat
    } catch {
      return new ApolloError('An error occurred!', '400')
    }
  }

  async findAll(): Promise<Cat[]|ApolloError> {
    try {
      // TypeORM
      // return await this.catRepository.find()

      // Mongoose
      return await this.catModel.find()
    } catch {
      return new ApolloError('An error occurred!', '400')
    }
  }

  async findOneOnly(_id: string): Promise<Cat|ApolloError> {
    try {
      // TypeORM
      // return await this.catRepository.findOne(_id)

      // Mongoose
      return await this.catModel.findOne({ _id })
    } catch {
      return new ApolloError('An error occurred!', '400')
    }
  }
}
