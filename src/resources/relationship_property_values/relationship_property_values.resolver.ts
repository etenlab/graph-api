import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { RelationshipPropertyValuesService } from './relationship_property_values.service';
import { RelationshipPropertyValue } from './relationship_property_value.entity';

@Resolver(() => RelationshipPropertyValue)
export class RelationshipPropertyValuesResolver {
  constructor(
    private readonly relationshipPropertyValuesService: RelationshipPropertyValuesService,
  ) {}

  @Query(() => [RelationshipPropertyValue], {
    name: 'relationshipPropertyValues',
  })
  findAll() {
    return this.relationshipPropertyValuesService.findAll();
  }

  @Query(() => RelationshipPropertyValue, { name: 'relationshipPropertyValue' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.relationshipPropertyValuesService.findOne(id);
  }
}
