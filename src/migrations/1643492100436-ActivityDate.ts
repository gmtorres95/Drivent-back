import { MigrationInterface, QueryRunner } from "typeorm";

export class ActivityDate1643492100436 implements MigrationInterface {
    name = "ActivityDate1643492100436"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"activitiesDates\" (\"id\" SERIAL NOT NULL, \"date\" TIMESTAMP NOT NULL, CONSTRAINT \"PK_83fa7141d3bad2b4d226373d0e5\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"tickets\" DROP CONSTRAINT \"FK_4bb45e096f521845765f657f5c8\"");
      await queryRunner.query("ALTER TABLE \"tickets\" ALTER COLUMN \"userId\" SET NOT NULL");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD CONSTRAINT \"FK_4bb45e096f521845765f657f5c8\" FOREIGN KEY (\"userId\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"tickets\" DROP CONSTRAINT \"FK_4bb45e096f521845765f657f5c8\"");
      await queryRunner.query("ALTER TABLE \"tickets\" ALTER COLUMN \"userId\" DROP NOT NULL");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD CONSTRAINT \"FK_4bb45e096f521845765f657f5c8\" FOREIGN KEY (\"userId\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("DROP TABLE \"activitiesDates\"");
    }
}
