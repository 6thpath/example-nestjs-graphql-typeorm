import { Connection } from 'typeorm'
import { Owner } from './entity/owners.entity'

export const OwnersProvider = [
  {
    provide: 'OwnerRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(Owner),
    inject: ['DbConnectionToken'],
  },
];