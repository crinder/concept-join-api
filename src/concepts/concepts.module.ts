import { Module } from '@nestjs/common';
import { ConceptsResolver } from './concepts.resolver.js';
import { ConceptsService } from './concepts.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  providers: [ConceptsResolver, ConceptsService]
})
export class ConceptsModule {}
