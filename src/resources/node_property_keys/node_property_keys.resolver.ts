import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { NodePropertyKeysService } from './node_property_keys.service';
import { NodePropertyKey } from './node_property_key.entity';
import { NodePropertyValuesService } from '../node_property_values/node_property_values.service';
import { NodePropertyValue } from '../node_property_values/node_property_value.entity';

@Resolver(() => NodePropertyKey)
export class NodePropertyKeysResolver {
  constructor(
    private readonly nodePropertyKeysService: NodePropertyKeysService,
    private readonly nodePropertyValuesService: NodePropertyValuesService,
  ) {}

  @Query(() => [NodePropertyKey], { name: 'nodePropertyKeys' })
  findAll() {
    return this.nodePropertyKeysService.findAll();
  }

  @Query(() => NodePropertyKey, { name: 'nodePropertyKey' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.nodePropertyKeysService.findOne(id);
  }

  @ResolveField('values', () => [NodePropertyValue])
  findValues(@Parent() { node_property_key_id }: NodePropertyKey) {
    return this.nodePropertyValuesService.findAll({
      where: { node_property_key_id },
    });
  }
}
