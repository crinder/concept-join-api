import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateNoteInput {
  @Field()
  title: string;

  @Field()
  content: string;

   @Field(() => [Int])
  conceptIds: number[];
}