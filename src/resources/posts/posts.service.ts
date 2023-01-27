import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async findAll() {
    return await this.postRepository.find();
  }

  async findOne(id: number) {
    return await this.postRepository.findOneBy({ id });
  }

  async findOfTable(table_name: string, id: number) {
    return await this.postRepository
      .createQueryBuilder('posts')
      .select('posts.*')
      .innerJoin(
        'discussions',
        'd',
        'd.id=discussion_id and d.row=:row and d.table_name=:table_name',
        {
          row: id,
          table_name,
        },
      )
      .getRawMany();
  }
}
