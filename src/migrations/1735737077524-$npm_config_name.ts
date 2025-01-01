import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1735737077524 implements MigrationInterface {
    name = ' $npmConfigName1735737077524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "destination" ADD CONSTRAINT "UQ_8a962921d15e2f4cfa8eba67482" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "name" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "name" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "destination" DROP CONSTRAINT "UQ_8a962921d15e2f4cfa8eba67482"`);
    }

}
