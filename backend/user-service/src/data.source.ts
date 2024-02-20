import { DataSourceOptions,DataSource } from "typeorm";
import {User} from "./user/entities/user.entity"
import { createDatabase } from "typeorm-extension";    
import { Team } from "./user/entities/team.entity";
import { Innovation } from "./user/entities/innovation.entity";
import {SeederOptions} from "typeorm-extension"
import { Role } from "./user/entities/role.entity";
export const Config: DataSourceOptions &    SeederOptions={
    type:"postgres",
    host:"localhost",
    port:5430,
    username:"root",
    password:"postgrespw",
    database:"innovation_practice",
    entities:[User,Team,Innovation, Role],
    synchronize:true,
    migrationsTableName:"migration_table",
    migrations:['src/migrations/*{.ts}'],
    seeds:['src/seeds/*.ts']
};

const dataSource = new  DataSource(Config)
export default dataSource