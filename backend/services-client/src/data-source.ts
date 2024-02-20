// import { DataSourceOptions,DataSource } from "typeorm";
// import {User} from "./user/entities/user.entity"
// import { createDatabase } from "typeorm-extension";    
// import { Team } from "./user/entities/team.entity";
// import { Innovation } from "./user/entities/innovation.entity";

// export const Config: DataSourceOptions={
//     type:"postgres",
//     host:"localhost",
//     port:5430,
//     username:"root",
//     password:"postgrespw",
//     database:"innovation_practice",
//     entities:[User,Team,Innovation],
//     synchronize:true,
//     migrationsTableName:"user",
//     migrations:['dist/user/migration/*.js']
// };

// const dataSource = new  DataSource(Config)
// export default dataSource