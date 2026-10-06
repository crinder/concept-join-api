import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) { }

  findAll() {
    return this.prisma.note.findMany({
      include: {
        concepts: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.note.findUnique({
      where: { id },

      include: {
        concepts: true,
      },

    });
  }

  create(input: { title: string; content: string, conceptIds: number[] }) {
    return this.prisma.note.create({
      data: {
        title: input.title,
        content: input.content,

        concepts: {
          connect: input.conceptIds.map(id => ({ id })),
        },
      },
      include: {
        concepts: true,
      },
    });
  }

 update(id: number, data: { title?: string; content?: string },conceptIds?: number[],
) {
  return this.prisma.note.update({
    where: { id },
    data: {
      ...data,

      ...(conceptIds
        ? {
            concepts: {
              set: conceptIds.map(id => ({ id })),
            },
          }
        : {}),
    },
    include: {
      concepts: true,
    },
  });
}
  delete(id: number) {
    return this.prisma.note.delete({
      where: { id },
    });
  }

}