import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Note } from '../../notes/models/note.model.js';
import { ConceptRelationship } from '../../relationships/models/concept-relationship.model.js';

@ObjectType()
export class Concept {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [Note])
  notes: Note[];

  @Field(() => [ConceptRelationship])
  relationshipsFrom: ConceptRelationship[];

  @Field(() => [ConceptRelationship])
  relationshipsTo: ConceptRelationship[];
}