import { Module } from '@nestjs/common';
import { NotesResolver } from './notes.resolver.js';
import { NotesService } from './notes.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  providers: [NotesResolver, NotesService],
})
export class NotesModule {}