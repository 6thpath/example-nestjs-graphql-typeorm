import { ApolloError } from 'apollo-server-express'

export class CreateOwnerInput {
  name?: string
}

export class UpdateOwnerInput {
  _id: string
  name?: string
}

export class Owner {
  _id?: string
  name?: string

  constructor(args: any) {
    this._id = args._id
    this.name = args.name
  }
}

export abstract class IQuery {
  abstract getOwners(): Owner[] | Promise<Owner[]|ApolloError> | ApolloError
  abstract getOwner(_id: string): Owner | Promise<Owner|ApolloError> | ApolloError
}

export abstract class IMutation {
  abstract createOwner(createOwnerInput: CreateOwnerInput): Owner | Promise<Owner|ApolloError> | ApolloError
  abstract updateOwner(updateOwnerInput: UpdateOwnerInput): Owner | Promise<Owner|ApolloError> | ApolloError
  abstract deleteOwner(_id: string): Owner | Promise<Owner|ApolloError> | ApolloError
}
