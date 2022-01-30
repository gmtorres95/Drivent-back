import { MigrationInterface, QueryRunner } from "typeorm";

export class activities1643321631906 implements MigrationInterface {
    name = "activities1643321631906"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"activitiesDates\" (\"id\" SERIAL NOT NULL, \"date\" TIMESTAMP NOT NULL, CONSTRAINT \"PK_83fa7141d3bad2b4d226373d0e5\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"places\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, CONSTRAINT \"PK_1afab86e226b4c3bc9a74465c12\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"activities\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"start\" TIMESTAMP NOT NULL, \"end\" TIMESTAMP NOT NULL, \"totalOfSeats\" integer NOT NULL, \"placeId\" integer, \"dateId\" integer, CONSTRAINT \"PK_7f4004429f731ffb9c88eb486a8\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"ticketActivities\" (\"activityId\" integer NOT NULL, \"ticketId\" integer NOT NULL, CONSTRAINT \"PK_f59aa27b5f05a93b7ca18f16097\" PRIMARY KEY (\"activityId\", \"ticketId\"))");
      await queryRunner.query("CREATE INDEX \"IDX_e7791cba9e0633863a2b23d62f\" ON \"ticketActivities\" (\"activityId\") ");
      await queryRunner.query("CREATE INDEX \"IDX_65e1db385f6e37496ebac8a2fe\" ON \"ticketActivities\" (\"ticketId\") ");
      await queryRunner.query("ALTER TABLE \"tickets\" DROP CONSTRAINT \"FK_4bb45e096f521845765f657f5c8\"");
      await queryRunner.query("ALTER TABLE \"tickets\" ALTER COLUMN \"userId\" SET NOT NULL");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD CONSTRAINT \"FK_4bb45e096f521845765f657f5c8\" FOREIGN KEY (\"userId\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"activities\" ADD CONSTRAINT \"FK_d461b46a031313632ff16384fd2\" FOREIGN KEY (\"placeId\") REFERENCES \"places\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"activities\" ADD CONSTRAINT \"FK_051a7a9104671baf216619e49f0\" FOREIGN KEY (\"dateId\") REFERENCES \"activitiesDates\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"ticketActivities\" ADD CONSTRAINT \"FK_e7791cba9e0633863a2b23d62fc\" FOREIGN KEY (\"activityId\") REFERENCES \"activities\"(\"id\") ON DELETE CASCADE ON UPDATE CASCADE");
      await queryRunner.query("ALTER TABLE \"ticketActivities\" ADD CONSTRAINT \"FK_65e1db385f6e37496ebac8a2fe7\" FOREIGN KEY (\"ticketId\") REFERENCES \"tickets\"(\"id\") ON DELETE CASCADE ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"ticketActivities\" DROP CONSTRAINT \"FK_65e1db385f6e37496ebac8a2fe7\"");
      await queryRunner.query("ALTER TABLE \"ticketActivities\" DROP CONSTRAINT \"FK_e7791cba9e0633863a2b23d62fc\"");
      await queryRunner.query("ALTER TABLE \"activities\" DROP CONSTRAINT \"FK_051a7a9104671baf216619e49f0\"");
      await queryRunner.query("ALTER TABLE \"activities\" DROP CONSTRAINT \"FK_d461b46a031313632ff16384fd2\"");
      await queryRunner.query("ALTER TABLE \"tickets\" DROP CONSTRAINT \"FK_4bb45e096f521845765f657f5c8\"");
      await queryRunner.query("ALTER TABLE \"tickets\" ALTER COLUMN \"userId\" DROP NOT NULL");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD CONSTRAINT \"FK_4bb45e096f521845765f657f5c8\" FOREIGN KEY (\"userId\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("DROP INDEX \"IDX_65e1db385f6e37496ebac8a2fe\"");
      await queryRunner.query("DROP INDEX \"IDX_e7791cba9e0633863a2b23d62f\"");
      await queryRunner.query("DROP TABLE \"ticketActivities\"");
      await queryRunner.query("DROP TABLE \"activities\"");
      await queryRunner.query("DROP TABLE \"places\"");
      await queryRunner.query("DROP TABLE \"activitiesDates\"");
    }
}
