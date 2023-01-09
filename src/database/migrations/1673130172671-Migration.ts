import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1673130172671 implements MigrationInterface {
  name = 'Migration1673130172671';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "node_types" ("type_name" character varying(32) NOT NULL, CONSTRAINT "PK_f520c2e2b806fe37e95fa8643df" PRIMARY KEY ("type_name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "nodes" ("node_id" BIGSERIAL NOT NULL, "node_type" character varying(32), CONSTRAINT "PK_653ba5f93aad34f9fc3a82782ec" PRIMARY KEY ("node_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "node_property_keys" ("node_property_key_id" BIGSERIAL NOT NULL, "node_id" bigint NOT NULL, "property_key" character varying(64), CONSTRAINT "PK_7d5a858bbe15ea47f22a688d87f" PRIMARY KEY ("node_property_key_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "node_property_values" ("node_property_value_id" BIGSERIAL NOT NULL, "node_property_key_id" bigint NOT NULL, "property_value" jsonb, CONSTRAINT "PK_48ca7a580460fb03dd190a29de4" PRIMARY KEY ("node_property_value_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "relationship_types" ("type_name" character varying(32) NOT NULL, CONSTRAINT "PK_25da534c9c6365d464dc8c77757" PRIMARY KEY ("type_name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "relationships" ("relationship_id" BIGSERIAL NOT NULL, "from_node_id" bigint, "to_node_id" bigint, "relationship_type" character varying(32), CONSTRAINT "PK_6bbbe0b323330dd457b9c831496" PRIMARY KEY ("relationship_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "relationship_property_keys" ("relationship_property_key_id" BIGSERIAL NOT NULL, "relationship_id" bigint NOT NULL, "property_key" character varying(64), CONSTRAINT "PK_3b32dec37113d1c40151acf39da" PRIMARY KEY ("relationship_property_key_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "relationship_property_values" ("relationship_property_value_id" BIGSERIAL NOT NULL, "relationship_property_key_id" bigint NOT NULL, "property_value" jsonb, CONSTRAINT "PK_e257d539b3f0e826c329276b3b9" PRIMARY KEY ("relationship_property_value_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "nodes" ADD CONSTRAINT "nodes_node_type_fkey" FOREIGN KEY ("node_type") REFERENCES "node_types"("type_name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "node_property_keys" ADD CONSTRAINT "node_property_keys_node_id_fkey" FOREIGN KEY ("node_id") REFERENCES "nodes"("node_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "node_property_values" ADD CONSTRAINT "node_property_values_node_property_key_id_fkey" FOREIGN KEY ("node_property_key_id") REFERENCES "node_property_keys"("node_property_key_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "relationships" ADD CONSTRAINT "relationships_relationship_type_fkey" FOREIGN KEY ("relationship_type") REFERENCES "relationship_types"("type_name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "relationships" ADD CONSTRAINT "relationships_from_node_id_fkey" FOREIGN KEY ("from_node_id") REFERENCES "nodes"("node_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "relationships" ADD CONSTRAINT "relationships_to_node_id_fkey" FOREIGN KEY ("to_node_id") REFERENCES "nodes"("node_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "relationship_property_keys" ADD CONSTRAINT "relationship_property_keys_relationship_id_fkey" FOREIGN KEY ("relationship_id") REFERENCES "relationships"("relationship_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "relationship_property_values" ADD CONSTRAINT "relationship_property_values_relationship_property_key_id_fkey" FOREIGN KEY ("relationship_property_key_id") REFERENCES "relationship_property_keys"("relationship_property_key_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `insert into node_types (type_name) values
        ('word'),
        ('word-sequence'),
        ('verse'),
        ('chapter'),
        ('book'),
        ('bible'),
        ('definition'),
        ('article'),
        ('lexical-entry')`,
    );
    await queryRunner.query(
      `insert into relationship_types (type_name) values
        ('word-sequence-to-word'),
        ('verse-to-word-sequence'),
        ('chapter-to-verse'),
        ('book-to-chapter'),
        ('bible-to-book'),
        ('word-to-article')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "relationship_property_values" DROP CONSTRAINT "relationship_property_values_relationship_property_key_id_fkey"`,
    );
    await queryRunner.query(
      `ALTER TABLE "relationship_property_keys" DROP CONSTRAINT "relationship_property_keys_relationship_id_fkey"`,
    );
    await queryRunner.query(
      `ALTER TABLE "relationships" DROP CONSTRAINT "relationships_to_node_id_fkey"`,
    );
    await queryRunner.query(
      `ALTER TABLE "relationships" DROP CONSTRAINT "relationships_from_node_id_fkey"`,
    );
    await queryRunner.query(
      `ALTER TABLE "relationships" DROP CONSTRAINT "relationships_relationship_type_fkey"`,
    );
    await queryRunner.query(
      `ALTER TABLE "node_property_values" DROP CONSTRAINT "node_property_values_node_property_key_id_fkey"`,
    );
    await queryRunner.query(
      `ALTER TABLE "node_property_keys" DROP CONSTRAINT "node_property_keys_node_id_fkey"`,
    );
    await queryRunner.query(
      `ALTER TABLE "nodes" DROP CONSTRAINT "nodes_node_type_fkey"`,
    );
    await queryRunner.query(`DROP TABLE "relationship_property_values"`);
    await queryRunner.query(`DROP TABLE "relationship_property_keys"`);
    await queryRunner.query(`DROP TABLE "relationships"`);
    await queryRunner.query(`DROP TABLE "relationship_types"`);
    await queryRunner.query(`DROP TABLE "node_property_values"`);
    await queryRunner.query(`DROP TABLE "node_property_keys"`);
    await queryRunner.query(`DROP TABLE "nodes"`);
    await queryRunner.query(`DROP TABLE "node_types"`);
  }
}
