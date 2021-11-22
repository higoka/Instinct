import {databaseType} from '../../database.const';
import {MigrationInterface, QueryRunner} from 'typeorm';

export class InstinctBaseMigration1630702876035 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    const {instinctBaseSQL} = await import(`./instinct-base.${databaseType}`);
    const queries = instinctBaseSQL
      .replace(/\r?\n|\r/g, '')
      .split(';')
      .filter((query: any) => query?.length);

    for (const query of queries) {
      await queryRunner.query(query);
    }
  }

  async down(queryRunner: QueryRunner): Promise<void> {}
}
