import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { readdirSync, readFileSync } from 'fs';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NodeTypesModule } from './resources/node_types/node_types.module';
import { NodesModule } from './resources/nodes/nodes.module';
import { NodePropertyKeysModule } from './resources/node_property_keys/node_property_keys.module';
import { NodePropertyValuesModule } from './resources/node_property_values/node_property_values.module';
import { RelationshipTypesModule } from './resources/relationship_types/relationship_types.module';
import { RelationshipsModule } from './resources/relationships/relationships.module';
import { RelationshipPropertyKeysModule } from './resources/relationship_property_keys/relationship_property_keys.module';
import { RelationshipPropertyValuesModule } from './resources/relationship_property_values/relationship_property_values.module';
import { VotesModule } from './resources/votes/votes.module';
import { VotablesModule } from './resources/votables/votables.module';
import { BallotEntriesModule } from './resources/ballot_entries/ballot_entries.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
      type: 'postgres',
      host: process.env.DB_URL,
      port: parseInt(<string>process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB,
      synchronize: JSON.parse(process.env.DB_SYNCHRONIZE),
      entities: [__dirname + '/**/*.entity.{ts,js}'],
    }),
    NodeTypesModule,
    NodesModule,
    NodePropertyKeysModule,
    NodePropertyValuesModule,
    RelationshipTypesModule,
    RelationshipsModule,
    RelationshipPropertyKeysModule,
    RelationshipPropertyValuesModule,
    VotesModule,
    VotablesModule,
    BallotEntriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
    this.importSqlFiles().then(() => this.seedBibleData());
  }

  async importSqlFiles() {
    const dir = join(__dirname, '/../src/database/sql');
    const files = readdirSync(dir);
    const sqlFiles = files.filter((file) => file.match(/.*\.(sql?)/gi));

    for (const sqlFile of sqlFiles) {
      const data = readFileSync(join(dir, sqlFile), 'utf8');
      await this.dataSource.query(data);
    }
  }

  async seedBibleData() {
    const verse1 = 'In the beginning God created the heavens and the earth';
    const verse2 = 'Now the earth was formless and empty';
    const chapter = {
      verses: [verse1, verse2],
    };
    const book = {
      properties: { name: { value: 'Genesis' } },
      chapters: [chapter],
    };
    const bible = {
      properties: { name: { value: 'NIV' } },
      books: [book],
    };

    const sql = `
      call graph_reset_all();
      delete from votes;
      delete from ballot_entries;
      delete from votables;

      do $$
      declare
        v_bible_id bigint;
      begin
        call graph_create_bible(
          v_bible_id,
          '${JSON.stringify(bible.properties)}'::json,
          json_build_object(),
          '${JSON.stringify(bible.books)}'::json
        );
      end
      $$;

      insert into node_property_values (node_property_key_id, property_value)
      select
        node_property_key_id,
        json_build_object(
          'value',
          make_new_fake_value(property_value->>'value')
        ) as property_value
      from node_property_values;

      insert into relationship_property_values (
        relationship_property_key_id,
        property_value
      )
      select
        relationship_property_key_id,
        json_build_object(
          'value',
          make_new_fake_value(property_value->>'value')
        ) as property_value
      from relationship_property_values;

      call make_new_fake_node_prop_keys();
      call make_new_fake_rel_prop_keys();

      do $$
      declare
        v_node_key_ids bigint[];
        v_node_value_ids bigint[];
        v_rel_key_ids bigint[];
        v_rel_value_ids bigint[];
      begin
        select array_agg(node_property_key_id)
        from node_property_keys
        into v_node_key_ids;

        select array_agg(node_property_value_id)
        from node_property_values
        into v_node_value_ids;

        select array_agg(relationship_property_key_id)
        from relationship_property_keys
        into v_rel_key_ids;

        select array_agg(relationship_property_value_id)
        from relationship_property_values
        into v_rel_value_ids;

        call add_random_votes('node_property_keys', v_node_key_ids);
        call add_random_votes('node_property_values', v_node_value_ids);
        call add_random_votes('relationship_property_keys', v_rel_key_ids);
        call add_random_votes('relationship_property_values', v_rel_value_ids);
      end
      $$;
    `;

    await this.dataSource.query(sql);
  }
}
