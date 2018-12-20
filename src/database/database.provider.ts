import { createConnection } from 'typeorm'

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async () => await createConnection({
      type: 'mongodb',
      host: 'ds139534.mlab.com',
      port: 39534,
      username: 'admin',
      password: 'Qwerty123',
      database: 'testorm',
      synchronize: true,
      logging: false,
      entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
      ],
      migrations: [
        'src/migration/**/*.ts'
      ],
      subscribers: [
         'src/subscriber/**/*.ts'
      ],
      cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber'
      }
    })
  }
]
