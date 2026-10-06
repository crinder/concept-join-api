import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Note } from '../../notes/models/note.model.js';

@ObjectType()
export class Concept {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [Note])
  notes: Note[];
}