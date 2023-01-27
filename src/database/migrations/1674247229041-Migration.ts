import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1674247229041 implements MigrationInterface {
  name = 'Migration1674247229041';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createSchema('admin', true);
    await queryRunner.query(
      `CREATE TABLE "admin"."ballot_entries" ("id" BIGSERIAL NOT NULL, "row" bigint NOT NULL, "table_name" character varying(32), CONSTRAINT "PK_9346268292703c4c1e3f54d44fb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "admin"."votes" ("id" BIGSERIAL NOT NULL, "ballot_entry_id" bigint NOT NULL, "up" boolean NOT NULL, CONSTRAINT "PK_f3d9fd4a0af865152c3f59db8ff" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "admin"."ballot_entries" ADD CONSTRAINT "ballot_entries_table_name_fkey" FOREIGN KEY ("table_name") REFERENCES "votables"("table_name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "admin"."votes" ADD CONSTRAINT "votes_ballot_entry_id_fkey" FOREIGN KEY ("ballot_entry_id") REFERENCES "admin"."ballot_entries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "votes" DROP CONSTRAINT "votes_ballot_entry_id_fkey"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ballot_entries" DROP CONSTRAINT "ballot_entries_table_name_fkey"`,
    );
    await queryRunner.query(`DROP TABLE "votes"`);
    await queryRunner.query(`DROP TABLE "ballot_entries"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "admin"."votes" DROP CONSTRAINT "votes_ballot_entry_id_fkey"`,
    );
    await queryRunner.query(
      `ALTER TABLE "admin"."ballot_entries" DROP CONSTRAINT "ballot_entries_table_name_fkey"`,
    );
    await queryRunner.query(`DROP TABLE "admin"."votes"`);
    await queryRunner.query(`DROP TABLE "admin"."ballot_entries"`);
    await queryRunner.dropSchema('admin', true);
    await queryRunner.query(
      `CREATE TABLE "ballot_entries" ("id" BIGSERIAL NOT NULL, "row" bigint NOT NULL, "table_name" character varying(32), CONSTRAINT "PK_9346268292703c4c1e3f54d44fb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "votes" ("id" BIGSERIAL NOT NULL, "up" boolean NOT NULL, "ballot_entry_id" bigint, CONSTRAINT "PK_f3d9fd4a0af865152c3f59db8ff" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "ballot_entries" ADD CONSTRAINT "ballot_entries_table_name_fkey" FOREIGN KEY ("table_name") REFERENCES "votables"("table_name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "votes" ADD CONSTRAINT "votes_ballot_entry_id_fkey" FOREIGN KEY ("ballot_entry_id") REFERENCES "ballot_entries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
