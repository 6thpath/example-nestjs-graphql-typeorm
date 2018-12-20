import { Injectable, Inject } from '@nestjs/common'
import { Repository } from 'typeorm'
import uuidv4 from 'uuid/v4'
import { Cat } from './entity/cats.entity'
import { CreateCatInput } from '../schema/cats.schema'

@Injectable()
export class CatsService {
  constructor(
    @Inject('CatRepositoryToken')
    private readonly catRepository: Repository<Cat>,
  ) {}

  async create(cat: Cat): Promise<Cat> {
    cat._id = uuidv4()
    console.log(cat)
    return await this.catRepository.save(cat)
  }

  async update(cat: Cat): Promise<Cat> {
    await this.catRepository.update({ _id: cat._id }, cat)
    return await this.catRepository.findOne({ _id: cat._id })
  }

  async delete(_id: string): Promise<Cat|boolean> {
    await this.catRepository.delete({ _id })
    return true
  }

  async getOne(_id: string): Promise<Cat> {
    return await this.catRepository.findOne({ _id })
  }

  async getAll(): Promise<Cat[]> {
    return await this.catRepository.find()
  }
}
