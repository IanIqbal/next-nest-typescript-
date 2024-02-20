import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({name:"roles"})

export class Role{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    roleName:string;

    @OneToMany(() => User, (user) => user.role)
    users:User []
}