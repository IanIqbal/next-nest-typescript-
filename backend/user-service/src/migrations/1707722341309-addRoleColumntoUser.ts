import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddRoleColumntoUser1707722341309 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
              await queryRunner.addColumn(
                "users",
                new TableColumn({
                    name:"roleId",
                    type:"int",
                    default:1
                })
            )

            await queryRunner.createForeignKey(
                "users",
                new TableForeignKey({
                    columnNames:["roleId"],
                    referencedColumnNames:["id"],
                    referencedTableName:"roles",
                    onDelete:"CASCADE"
                })
            )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
