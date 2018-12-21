export class CreateCatInput {
    name?: string;
    age?: number;
}

export class UpdateCatInput {
    _id: string;
    name?: string;
    age?: number;
}

export class Cat {
    _id?: string;
    name?: string;
    age?: number;
}

export abstract class IMutation {
    abstract createCat(createCatInput?: CreateCatInput): Cat | Promise<Cat>;

    abstract updateCat(updateCatInput: UpdateCatInput): Cat | Promise<Cat>;

    abstract deleteCat(_id: string): Cat | Promise<Cat>;
}

export abstract class IQuery {
    abstract getCats(): Cat[] | Promise<Cat[]>;

    abstract getCat(_id: string): Cat | Promise<Cat>;

    abstract temp__(): boolean | Promise<boolean>;
}

export abstract class ISubscription {
    abstract catEvent(): Cat | Promise<Cat>;
}
