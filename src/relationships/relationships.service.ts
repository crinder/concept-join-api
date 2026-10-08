import { Injectable, BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateConceptRelationshipInput } from './dto/create-concept-relationship.input.js';
import { Prisma } from '../generated/prisma/browser.js';

@Injectable()
export class RelationshipsService {

    constructor(private readonly prisma: PrismaService) { }

    findAll() {
        return this.prisma.conceptRelationship.findMany({
            include: {
                fromConcept: true,
                toConcept: true,
            },
        });
    }

    findOne(id: number) {
        return this.prisma.conceptRelationship.findUnique({
            where: { id },
            include: {
                fromConcept: true,
                toConcept: true,
            },
        });
    }

    async create(input: CreateConceptRelationshipInput) {
        try {
            if (input.fromConceptId === input.toConceptId) {
                throw new BadRequestException(
                    'No se puede crear una relación de un concepto consigo mismo',
                );
            }

            const concepts = await this.prisma.concept.findMany({
                where: {
                    id: {
                        in: [input.fromConceptId, input.toConceptId],
                    },
                },
            });

            if (concepts.length !== 2) {
                throw new BadRequestException(
                    'Uno o ambos conceptos no existen',
                );
            }

            return await this.prisma.conceptRelationship.create({
                data: {
                    fromConceptId: input.fromConceptId,
                    toConceptId: input.toConceptId,
                    type: input.type,
                },
            });
        } catch (error) {
            if (
                typeof error === 'object' &&
                error !== null &&
                'code' in error &&
                error.code === 'P2002'
            ) {
                throw new ConflictException(
                    'La relación ya existe',
                );
            }

            throw error;
        }
    }

    async update(id: number, data: { fromConceptId?: number; toConceptId?: number; type?: string; }) {

        try {

            const relationship = await this.prisma.conceptRelationship.findUnique({
                where: { id }
            });

            if (!relationship) {
                throw new NotFoundException(
                    'La relación no existe',
                );
            }

            const fromNew = data.fromConceptId ?? relationship.fromConceptId;
            const toNew = data.toConceptId ?? relationship.toConceptId;

            if (fromNew === toNew) {
                throw new BadRequestException(
                    'No se puede crear una relación de un concepto consigo mismo',
                );
            }

            const concepts = await this.prisma.concept.findMany({
                where: {
                    id: {
                        in: [fromNew, toNew],
                    },
                },
            });

            if (concepts.length != 2) {
                throw new BadRequestException(
                    'Uno de los conceptos no existen',
                );
            }

            return this.prisma.conceptRelationship.update({
                where: { id },
                data,
                include: {
                    fromConcept: true,
                    toConcept: true,
                },
            });

        } catch (error) {
            if (
                typeof error === 'object' &&
                error !== null &&
                'code' in error &&
                error.code === 'P2002'
            ) {
                throw new ConflictException(
                    'La relación ya existe ',
                );
            }

            throw error;
        }

    }

    delete(id: number) {
        return this.prisma.conceptRelationship.delete({
            where: { id },
        });
    }


    async traverse(startId: number, maxDepth: number, direction: 'OUTGOING' | 'INCOMING' | 'BOTH') {
        const queue = [
            { conceptId: startId, depth: 0 },
        ];

        const result = [
            { conceptId: startId, depth: 0 },
        ];

        const visited = new Set<number>([startId]);


        while (queue.length > 0) {
            const current = queue.shift();

            if (current) {
                if (current.depth >= maxDepth) {
                    continue;
                }

                let where;

                if (direction === 'OUTGOING') {
                    where = {
                        fromConceptId: current.conceptId,
                    };
                } else if (direction === 'INCOMING') {
                    where = {
                        toConceptId: current.conceptId,
                    };
                } else {
                    where = {
                        OR: [
                            { fromConceptId: current.conceptId },
                            { toConceptId: current.conceptId },
                        ],
                    };
                }

                const relationships =
                    await this.prisma.conceptRelationship.findMany({
                        where,
                    });

                for (const relationship of relationships) {

                    const nextConceptId =
                        relationship.fromConceptId === current.conceptId
                            ? relationship.toConceptId
                            : relationship.fromConceptId;

                    if (visited.has(nextConceptId)) {
                        continue;
                    }

                    visited.add(nextConceptId);

                    queue.push({
                        conceptId: nextConceptId,
                        depth: current.depth + 1,
                    });

                    result.push({
                        conceptId: nextConceptId,
                        depth: current.depth + 1,
                    });
                }
            }
        }

        const conceptIds = result.map(item => item.conceptId);

        const concepts = await this.prisma.concept.findMany({
            where: {
                id: {
                    in: conceptIds,
                },
            },
        });

        const conceptsWithDepth = result.map(item => {
            const concept = concepts.find(con => con.id === item.conceptId)

            return {
                ...concept,
                depth: item.depth,
            };
        });

        return conceptsWithDepth;
    }

}
