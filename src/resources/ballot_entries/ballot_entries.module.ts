import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BallotEntry } from './ballot_entry.entity';
import { BallotEntriesService } from './ballot_entries.service';
import { BallotEntriesResolver } from './ballot_entries.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([BallotEntry])],
  providers: [BallotEntriesResolver, BallotEntriesService],
})
export class BallotEntriesModule {}
