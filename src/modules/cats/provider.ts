// TypeORM
// import { Connection } from 'typeorm'
// import { Cat } from './typeorm/entity'

// Mongoose
import { Connection } from 'mongoose'
import { catsSchema } from './mongoose/schema'

export const CatsProvider = [
  {
    provide: 'CatToken',
    // TypeORM
    // useFactory: (connection: Connection) => connection.getRepository(Cat),

    // Mongoose
    useFactory: (connection: Connection) => connection.model('Cat', catsSchema),

    inject: ['DbConnectionToken'],
  },
];