import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Concept } from '../../concepts/models/concept.model.js';

@ObjectType()
export class Note {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field(() => [Concept])
  concepts: Concept[];
}