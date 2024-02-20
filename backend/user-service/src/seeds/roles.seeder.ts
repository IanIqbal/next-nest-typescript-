import { Seeder, SeederFactoryManager } from "typeorm-extension"
import { DataSource } from "typeorm"
import { Role } from "../user/entities/role.entity"

export default class RoleSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<void> {

        const repository = dataSource.getRepository(Role)

        await repository.insert([
            { roleName: "innovator" },
            { roleName: "admin" },
            { roleName: "evaluator" },
        ])
    }
}