// import { createConnection, getConnectionOptions } from 'typeorm'
import * as mongoose from 'mongoose'

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    // TypeORM
    // useFactory: async () => {
    //   const connectionOptions = await getConnectionOptions()
    //   Object.assign(connectionOptions, {
    //     synchronize: false,
    //     logging: true,
    //     entities: [__dirname + '/../**/typeorm/entity{.ts,.js}'],
    //     subscribers: [__dirname + '/../**/typeorm/subscriber{.ts,.js}'],
    //     cli: {
    //       entitiesDir: 'src/modules/**/typeorm/entity{.ts,.js}',
    //       subscribersDir: 'src/modules/**/typeorm/subscriber{.ts,.js}'
    //     }
    //   })
    //   return await createConnection(connectionOptions)
    // }
    // Mongoose
    useFactory: async (): Promise<typeof mongoose> => {
      const URI = `mongodb://${process.env.TYPEORM_USERNAME}` +
        `:${process.env.TYPEORM_PASSWORD}` +
        `@${process.env.TYPEORM_HOST}` +
        `:${process.env.TYPEORM_PORT}` +
        `/${process.env.TYPEORM_DATABASE}`
      return await mongoose.connect(URI, { useNewUrlParser: true })
    }
  }
]
