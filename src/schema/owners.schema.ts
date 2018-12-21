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
  abstract getOwners(): Owner[] | Promise<Owner[]>

  abstract getOwner(_id: string): Owner | Promise<Owner>
}

export abstract class IMutation {
  abstract createOwner(createOwnerInput: CreateOwnerInput): Owner | Promise<Owner>
  abstract updateOwner(updateOwnerInput: UpdateOwnerInput): Owner | Promise<Owner>
  abstract deleteOwner(_id: string): Owner | Promise<Owner>
}
