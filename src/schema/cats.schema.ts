export class CreateCatInput {
  name?: string
  age?: number
}

export class Cat {
  _id?: string
  name?: string
  age?: number

  constructor(args: any) {
    this._id = args._id
    this.name = args.name
    this.age = args.age
  }
}

export abstract class IQuery {
  abstract getCats(): Cat[] | Promise<Cat[]>

  abstract getCat(_id: string): Cat | Promise<Cat>
}

export abstract class IMutation {
  abstract createCat(createCatInput?: CreateCatInput): Cat | Promise<Cat>
}

export abstract class ISubscription {
  abstract catCreated(): Cat | Promise<Cat>
}
