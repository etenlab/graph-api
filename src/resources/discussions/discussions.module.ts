import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Discussion } from './discussion.entity';
import { DiscussionsService } from './discussions.service';
import { DiscussionsResolver } from './discussions.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Discussion])],
  providers: [DiscussionsResolver, DiscussionsService],
})
export class DiscussionsModule {}
