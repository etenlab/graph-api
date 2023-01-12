import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { NodesService } from './nodes.service';
import { Node } from './node.entity';
import { NodePropertyKeysService } from '../node_property_keys/node_property_keys.service';
import { NodePropertyKey } from '../node_property_keys/node_property_key.entity';

@Resolver(() => Node)
export class NodesResolver {
  constructor(
    private readonly nodesService: NodesService,
    private readonly nodePropertyKeysService: NodePropertyKeysService,
  ) {}

  @Query(() => [Node], { name: 'nodes' })
  findAll() {
    return this.nodesService.findAll({});
  }

  @Query(() => [Node], { name: 'nodesBySearch' })
  findBySearch(@Args('search', { type: () => String }) search: string) {
    return this.nodesService.findAll({ search });
  }

  @Query(() => Node, { name: 'node' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.nodesService.findOne(id);
  }

  @ResolveField('propertyKeys', () => [NodePropertyKey])
  findPropertyKeys(@Parent() { node_id }: Node) {
    return this.nodePropertyKeysService.findAll({ where: { node_id } });
  }
}
