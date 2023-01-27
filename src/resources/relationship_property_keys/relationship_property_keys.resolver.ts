import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { RelationshipPropertyKeysService } from './relationship_property_keys.service';
import { RelationshipPropertyKey } from './relationship_property_key.entity';
import { RelationshipPropertyValuesService } from '../relationship_property_values/relationship_property_values.service';
import { RelationshipPropertyValue } from '../relationship_property_values/relationship_property_value.entity';
import { VotesService } from '../votes/votes.service';
import { Post } from '../posts/post.entity';
import { PostsService } from '../posts/posts.service';

@Resolver(() => RelationshipPropertyKey)
export class RelationshipPropertyKeysResolver {
  constructor(
    private readonly relationshipPropertyKeysService: RelationshipPropertyKeysService,
    private readonly relationshipPropertyValuesService: RelationshipPropertyValuesService,
    private readonly votesService: VotesService,
    private readonly postsService: PostsService,
  ) {}

  @Query(() => [RelationshipPropertyKey], { name: 'relationshipPropertyKeys' })
  findAll() {
    return this.relationshipPropertyKeysService.findAll();
  }

  @Query(() => RelationshipPropertyKey, { name: 'relationshipPropertyKey' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.relationshipPropertyKeysService.findOne(id);
  }

  @ResolveField('values', () => [RelationshipPropertyValue])
  findValues(
    @Parent() { relationship_property_key_id }: RelationshipPropertyKey,
  ) {
    return this.relationshipPropertyValuesService.findAll({
      where: { relationship_property_key_id },
    });
  }

  @ResolveField('upVotes', () => Int)
  findUpVotes(
    @Parent() { relationship_property_key_id }: RelationshipPropertyKey,
  ) {
    return this.votesService.findOfTable(
      'relationship_property_keys',
      relationship_property_key_id,
      true,
    );
  }

  @ResolveField('downVotes', () => Int)
  findDownVotes(
    @Parent() { relationship_property_key_id }: RelationshipPropertyKey,
  ) {
    return this.votesService.findOfTable(
      'relationship_property_keys',
      relationship_property_key_id,
      false,
    );
  }

  @ResolveField('posts', () => [Post])
  findPosts(
    @Parent() { relationship_property_key_id }: RelationshipPropertyKey,
  ) {
    return this.postsService.findOfTable(
      'relationship_property_keys',
      relationship_property_key_id,
    );
  }
}
