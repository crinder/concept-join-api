import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Concept } from '../../concepts/models/concept.model.js';

@ObjectType()
export class ConceptRelationship {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  fromConceptId: number;

  @Field(() => Int)
  toConceptId: number;

  @Field()
  type: string;

  @Field(() => Concept)
  fromConcept: Concept[];

  @Field(() => Concept)
  toConcept: Concept[];
}