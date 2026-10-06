import { Module } from '@nestjs/common';
import { RelationshipsResolver } from './relationships.resolver.js';
import { RelationshipsService } from './relationships.service.js';

@Module({
  providers: [RelationshipsResolver, RelationshipsService]
})
export class RelationshipsModule {}
