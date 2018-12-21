import { Connection } from 'typeorm'
import { Cat } from './entity/cats.entity'

export const CatsProvider = [
  {
    provide: 'CatRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(Cat),
    inject: ['DbConnectionToken'],
  },
];