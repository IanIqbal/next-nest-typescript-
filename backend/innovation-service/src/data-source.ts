import { DataSourceOptions,DataSource } from "typeorm";
import { Team } from "./innovation/entities/team.entity";
import { User } from "./innovation/entities/user.entity";
import { Innovation } from "./innovation/entities/innovation.entity";
import { Role } from "./innovation/entities/role.entity";

export const Config : DataSourceOptions =  {
    type:"postgres",
    host:"localhost",
    port:5430,
    username:"root",
    password:"postgrespw",
    database:"innovation_practice",
    entities:[User,Team,Innovation,Role],
    synchronize:true,
    migrationsTableName:"user",
    migrations:['dist/user/migration/*.js']
};

const dataSource = new DataSource(Config)
export default dataSource