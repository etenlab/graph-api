import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { RelationshipPropertyKeysService } from './relationship_property_keys.service';
import { RelationshipPropertyKey } from './relationship_property_key.entity';

@Resolver(() => RelationshipPropertyKey)
export class RelationshipPropertyKeysResolver {
  constructor(
    private readonly relationshipPropertyKeysService: RelationshipPropertyKeysService,
  ) {}

  @Query(() => [RelationshipPropertyKey], { name: 'relationshipPropertyKeys' })
  findAll() {
    return this.relationshipPropertyKeysService.findAll();
  }

  @Query(() => RelationshipPropertyKey, { name: 'relationshipPropertyKey' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.relationshipPropertyKeysService.findOne(id);
  }
}
