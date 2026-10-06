import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloDriver,
  ApolloDriverConfig,
} from '@nestjs/apollo';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

import { HealthModule } from './health/health.module.js';
import { ConceptsModule } from './concepts/concepts.module.js';
import { RelationshipsModule } from './relationships/relationships.module.js';
import { NotesModule } from './notes/notes.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      sortSchema: true,
      graphiql: true,
    }),

    HealthModule,
    ConceptsModule,
    RelationshipsModule,
    NotesModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}