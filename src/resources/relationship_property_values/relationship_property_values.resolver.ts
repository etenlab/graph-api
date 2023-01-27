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
import { Post } from '../posts/post.entity';
import { PostsService } from '../posts/posts.service';

@Resolver(() => RelationshipPropertyValue)
export class RelationshipPropertyValuesResolver {
  constructor(
    private readonly relationshipPropertyValuesService: RelationshipPropertyValuesService,
    private readonly votesService: VotesService,
    private readonly postsService: PostsService,
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

  @ResolveField('posts', () => [Post])
  findPosts(
    @Parent() { relationship_property_value_id }: RelationshipPropertyValue,
  ) {
    return this.postsService.findOfTable(
      'relationship_property_values',
      relationship_property_value_id,
    );
  }
}
