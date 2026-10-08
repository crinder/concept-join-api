import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateConceptRelationshipInput {
  @Field(() => Int)
  fromConceptId: number;

  @Field(() => Int)
  toConceptId: number;

  @Field()
  type: string;
}