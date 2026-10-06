import {Field, InputType, Int} from '@nestjs/graphql';

@InputType()
export class UpdateConceptInput {

  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field(() => [Int], { nullable: true })
  noteIds?: number[];

}