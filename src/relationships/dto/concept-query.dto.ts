import { InputType, Field, Int, registerEnumType } from '@nestjs/graphql';

export enum Direction {
  OUTGOING = 'OUTGOING',
  INCOMING = 'INCOMING',
  BOTH = 'BOTH',
}

// Registras el enum para que GraphQL lo reconozca
registerEnumType(Direction, {
  name: 'Direction',
});

@InputType()
export class TraverseInput {
  @Field(() => Int)
  startId: number;

  @Field(() => Int)
  maxDepth: number;

  @Field(() => Direction)
  direction: Direction;
}