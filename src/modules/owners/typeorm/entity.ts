import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm'

@Entity()
export class Owner {

    @ObjectIdColumn()
    _id: ObjectID

    @Column()
    name: string

}
