import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TraversedConcept {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Int)
  depth: number;
}