import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateNoteInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  content?: string;

  @Field(() => [Int], { nullable: true })
  conceptIds?: number[];
}