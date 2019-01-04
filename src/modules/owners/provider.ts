// TypeORM
// import { Connection } from 'typeorm'
// import { Owner } from './typeorm/entity'

// Mongoose
import { Connection } from 'mongoose'
import { ownerSchema } from './mongoose/schema'

export const OwnersProvider = [
  {
    provide: 'OwnerToken',
    // TypeORM
    // useFactory: (connection: Connection) => connection.getRepository(Owner),

    // Mongoose
    useFactory: (connection: Connection) => connection.model('Owner', ownerSchema),

    inject: ['DbConnectionToken'],
  },
];