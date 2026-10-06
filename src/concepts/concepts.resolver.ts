import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Concept } from './models/concept.model.js';
import { ConceptsService } from './concepts.service.js';
import { CreateConceptInput } from './dto/create-concept.input.js';
import { UpdateConceptInput } from './dto/update-concept.input.js';

@Resolver()
export class ConceptsResolver {

    constructor(private readonly conceptsService: ConceptsService) {}

    @Query(() => [Concept])
    concepts() {
        return this.conceptsService.findAll();
    }

    @Query(() => Concept)
    concept(
        @Args('id', { type: () => Int }) id: number,
    ) {
        return this.conceptsService.findOne(id);
    }

    @Mutation(() => Concept)
    createConcept(
        @Args('input') input: CreateConceptInput,
    ) {
        return this.conceptsService.create(input.name);
    }

    @Mutation(() => Concept)
    updateConcept(
        @Args('input') input: UpdateConceptInput,
    ) {
        const { id, ...data } = input;
        return this.conceptsService.update(id, data);
    }

    @Mutation(() => Concept)
    deleteConcept(
        @Args('id', { type: () => Int }) id: number,
    ) {
        return this.conceptsService.delete(id);
    }

}
