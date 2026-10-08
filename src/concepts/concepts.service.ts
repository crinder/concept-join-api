import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ConceptsService {
  constructor(private readonly prisma: PrismaService) { }

  findAll() {
    return this.prisma.concept.findMany({
      include: {
        notes: true,
      },
    });

  }

  findOne(id: number) {
    return this.prisma.concept.findUnique({
      where: { id },
      include: {
        notes: true,
        relationshipsFrom: {
          include: {
            toConcept: true,
          },
        },
        relationshipsTo: {
          include: {
            fromConcept: true,
          },
        },
      },
    });
  }

  create(name: string) {
    return this.prisma.concept.create({
      data: {
        name,
      },
    });
  }

  update(id: number, data: { name?: string; }) {
    return this.prisma.concept.update({
      where: { id },
      data,
    });
  }

  delete(id: number) {
    return this.prisma.concept.delete({
      where: { id },
    });
  }
}