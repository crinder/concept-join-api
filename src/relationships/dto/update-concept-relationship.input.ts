import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateConceptRelationshipInput {

  @Field(() => Int)
  id: number;

  @Field(() => Int , { nullable: true })
  fromConceptId: number;

  @Field(() => Int, { nullable: true })
  toConceptId: number;

  @Field({ nullable: true })
  type: string;
}