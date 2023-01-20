import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { RelationshipPropertyValuesService } from './relationship_property_values.service';
import { RelationshipPropertyValue } from './relationship_property_value.entity';
import { VotesService } from '../votes/votes.service';

@Resolver(() => RelationshipPropertyValue)
export class RelationshipPropertyValuesResolver {
  constructor(
    private readonly relationshipPropertyValuesService: RelationshipPropertyValuesService,
    private readonly votesService: VotesService,
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

  @ResolveField('upVotes', () => Int)
  findUpVotes(
    @Parent() { relationship_property_value_id }: RelationshipPropertyValue,
  ) {
    return this.votesService.findOfTable(
      'relationship_property_values',
      relationship_property_value_id,
      true,
    );
  }

  @ResolveField('downVotes', () => Int)
  findDownVotes(
    @Parent() { relationship_property_value_id }: RelationshipPropertyValue,
  ) {
    return this.votesService.findOfTable(
      'relationship_property_values',
      relationship_property_value_id,
      false,
    );
  }
}
