import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { NodePropertyValuesService } from './node_property_values.service';
import { NodePropertyValue } from './node_property_value.entity';
import { VotesService } from '../votes/votes.service';

@Resolver(() => NodePropertyValue)
export class NodePropertyValuesResolver {
  constructor(
    private readonly nodePropertyValuesService: NodePropertyValuesService,
    private readonly votesService: VotesService,
  ) {}

  @Query(() => [NodePropertyValue], { name: 'nodePropertyValues' })
  findAll() {
    return this.nodePropertyValuesService.findAll();
  }

  @Query(() => NodePropertyValue, { name: 'nodePropertyValue' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.nodePropertyValuesService.findOne(id);
  }

  @ResolveField('upVotes', () => Int)
  findUpVotes(@Parent() { node_property_value_id }: NodePropertyValue) {
    return this.votesService.findOfTable(
      'node_property_values',
      node_property_value_id,
      true,
    );
  }

  @ResolveField('downVotes', () => Int)
  findDownVotes(@Parent() { node_property_value_id }: NodePropertyValue) {
    return this.votesService.findOfTable(
      'node_property_values',
      node_property_value_id,
      false,
    );
  }
}
