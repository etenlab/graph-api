import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';

import { NodePropertyValuesService } from './node_property_values.service';
import { NodePropertyValue } from './node_property_value.entity';
import { VotesService } from '../votes/votes.service';
import { Post } from '../posts/post.entity';
import { PostsService } from '../posts/posts.service';
import { CreateNodePropertyValueInput } from './dto/create-node-property-value.input';

@Resolver(() => NodePropertyValue)
export class NodePropertyValuesResolver {
  constructor(
    private readonly nodePropertyValuesService: NodePropertyValuesService,
    private readonly votesService: VotesService,
    private readonly postsService: PostsService,
  ) {}

  @Mutation(() => NodePropertyValue)
  createNodePropertyValue(
    @Args('createNodePropertyValueInput')
    createNodePropertyValueInput: CreateNodePropertyValueInput,
  ) {
    return this.nodePropertyValuesService.create(createNodePropertyValueInput);
  }

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

  @ResolveField('posts', () => [Post])
  findPosts(@Parent() { node_property_value_id }: NodePropertyValue) {
    return this.postsService.findOfTable(
      'node_property_values',
      node_property_value_id,
    );
  }
}
