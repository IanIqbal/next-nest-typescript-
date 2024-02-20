import { timeStamp } from "console";
import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class CreateRoleTable1707711834404 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {

            await queryRunner.createTable(
                new Table({
                    name: "roles",
                    columns: [
                        {
                            name: "id",
                            type: "int",
                            isPrimary: true
                        },
                        {
                            name: "roleName",
                            type: "varchar"
                        },
                        {
                            name: "created_at",
                            type: "timeStamp",
                            default: "now()"
                        }
                    ]
                }),
                true
            )

            // await queryRunner.addColumn(
            //     "users",
            //     new TableColumn({
            //         name:"roleId",
            //         type:"int"
            //     })
            // )

            // await queryRunner.createForeignKey(
            //     "users",
            //     new TableForeignKey({
            //         columnNames:["roleId"],
            //         referencedColumnNames:["id"],
            //         referencedTableName:"role",
            //         onDelete:"CASCADE"
            //     })
            // )
        } catch (error) {
            console.log(error);

        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        try {

            await queryRunner.dropTable("roles")
        } catch (error) {
            console.log(error);
        }
    }

}
