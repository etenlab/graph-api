import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { NodePropertyValuesService } from './node_property_values.service';
import { NodePropertyValue } from './node_property_value.entity';

@Resolver(() => NodePropertyValue)
export class NodePropertyValuesResolver {
  constructor(
    private readonly nodePropertyValuesService: NodePropertyValuesService,
  ) {}

  @Query(() => [NodePropertyValue], { name: 'nodePropertyValues' })
  findAll() {
    return this.nodePropertyValuesService.findAll();
  }

  @Query(() => NodePropertyValue, { name: 'nodePropertyValue' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.nodePropertyValuesService.findOne(id);
  }
}
