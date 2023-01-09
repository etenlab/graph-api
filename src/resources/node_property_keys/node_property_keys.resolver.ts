import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { NodePropertyKeysService } from './node_property_keys.service';
import { NodePropertyKey } from './node_property_key.entity';

@Resolver(() => NodePropertyKey)
export class NodePropertyKeysResolver {
  constructor(
    private readonly nodePropertyKeysService: NodePropertyKeysService,
  ) {}

  @Query(() => [NodePropertyKey], { name: 'nodePropertyKeys' })
  findAll() {
    return this.nodePropertyKeysService.findAll();
  }

  @Query(() => NodePropertyKey, { name: 'nodePropertyKey' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.nodePropertyKeysService.findOne(id);
  }
}
