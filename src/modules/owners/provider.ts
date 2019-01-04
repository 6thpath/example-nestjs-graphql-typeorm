// TypeORM
// import { Connection } from 'typeorm'
// import { Owner } from './typeorm/entity'

// Mongoose
import { Connection } from 'mongoose'
import { ownerSchema } from './mongoose/schema'

export const OwnersProvider = [
  {
    provide: 'OwnerRepositoryToken',
    // useFactory: (connection: Connection) => connection.getRepository(Owner),
    useFactory: (connection: Connection) => connection.model('Owner', ownerSchema),
    inject: ['DbConnectionToken'],
  },
];