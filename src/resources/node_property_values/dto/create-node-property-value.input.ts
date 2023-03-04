import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateNodePropertyValueInput {
  @Field(() => Int)
  node_property_key_id: number;

  @Field(() => String)
  property_value: string;
}
