import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { BallotEntriesService } from './ballot_entries.service';
import { BallotEntry } from './ballot_entry.entity';

@Resolver(() => BallotEntry)
export class BallotEntriesResolver {
  constructor(private readonly ballotEntriesService: BallotEntriesService) {}

  @Query(() => [BallotEntry], { name: 'ballotEntries' })
  findAll() {
    return this.ballotEntriesService.findAll();
  }

  @Query(() => BallotEntry, { name: 'ballotEntry' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ballotEntriesService.findOne(id);
  }
}
