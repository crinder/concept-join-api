import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RelationshipsService } from './relationships.service.js';
import { ConceptRelationship } from './models/concept-relationship.model.js';
import { CreateConceptRelationshipInput } from './dto/create-concept-relationship.input.js';
import { UpdateConceptRelationshipInput } from './dto/update-concept-relationship.input.js';
import { TraversedConcept } from './models/concept-depth.model.js'
import { TraverseInput } from './dto/concept-query.dto.js'

@Resolver()
export class RelationshipsResolver {

    constructor(private readonly relationshipsService: RelationshipsService) { }


    @Query(() => [ConceptRelationship])
    relationships() {
        return this.relationshipsService.findAll();
    }

    @Query(() => ConceptRelationship)
    relationship(
        @Args('id') id: number,
    ) {
        return this.relationshipsService.findOne(id);
    }

    @Query(() => [TraversedConcept])
    traverse(
        @Args('input') input: TraverseInput,
    ) {
        return this.relationshipsService.traverse(
            input.startId,
            input.maxDepth,
            input.direction,
        );
    }
    
    @Mutation(() => ConceptRelationship)
    createRelationship(
        @Args('input') input: CreateConceptRelationshipInput,
    ) {
        return this.relationshipsService.create(input);
    }

    @Mutation(() => ConceptRelationship)
    updateRelationship(
        @Args('input') input: UpdateConceptRelationshipInput,
    ) {

        const { id, ...data } = input;

        return this.relationshipsService.update(id, data);
    }

    @Mutation(() => ConceptRelationship)
    deleteRelationship(
        @Args('id') id: number,
    ) {
        return this.relationshipsService.delete(id);
    }

}
