import { CreateRelationshipPropertyKeyInput } from './create-relationship_property_key.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRelationshipPropertyKeyInput extends PartialType(CreateRelationshipPropertyKeyInput) {
  @Field(() => Int)
  id: number;
}
