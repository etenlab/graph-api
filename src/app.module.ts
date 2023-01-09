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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
    this.importSqlFiles();
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
}
