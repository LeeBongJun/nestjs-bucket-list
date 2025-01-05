import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1736074657701 implements MigrationInterface {
    name = ' $npmConfigName1736074657701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_c83cfee225e68762436f5061a8" ON "bucket_list" ("name", "userId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_c83cfee225e68762436f5061a8"`);
    }

}
