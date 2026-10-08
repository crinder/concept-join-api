import { Module } from '@nestjs/common';
import { RelationshipsResolver } from './relationships.resolver.js';
import { RelationshipsService } from './relationships.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  providers: [RelationshipsResolver, RelationshipsService]
})
export class RelationshipsModule {}
