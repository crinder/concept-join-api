import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateConceptInput {
  @Field()
  name: string;

  @Field(() => [Int], { nullable: true })
  noteIds?: number[];
}