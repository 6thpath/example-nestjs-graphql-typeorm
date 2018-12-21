import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
// import { join } from 'path'

import { CatsModule } from './cats/cats.module'

@Module({
  imports: [
    CatsModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      // definitions: {
      //   path: join(process.cwd(), 'src/schema/index.schema.ts'),
      //   outputAs: 'class'
      // },
      playground: {
        settings: {
          'general.betaUpdates': false,
          'editor.cursorShape': 'line', // possible values: 'line', 'block', 'underline'
          'editor.fontSize': 14,
          'editor.fontFamily': `'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace`,
          'editor.theme': 'dark', // possible values: 'dark', 'light'
          'editor.reuseHeaders': true, // new tab reuses headers from last tab
          'request.credentials': 'omit', // possible values: 'omit', 'include', 'same-origin'
          'tracing.hideTracingResponse': true
        }
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class ApplicationModule {}
