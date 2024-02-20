import {Column,CreateDateColumn,Entity,ManyToOne,OneToMany,PrimaryGeneratedColumn,UpdateDateColumn} 
from 'typeorm';
import { Team } from './team.entity';
import { Role } from './role.entity';

@Entity({name:'users'})
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar"})
    fullname:string

    @Column({type:"varchar"})
    employeeNumber:string

    @Column({type:"varchar"})
    email:string

    @Column({type:"varchar"})
    password:string

    @CreateDateColumn({type:'timestamp'})
    created_at:Date;

    @UpdateDateColumn({type:'timestamp'})
    updated_at:Date;

    @OneToMany(() => Team, (team) => team.user)
    teams:Team[]

    @ManyToOne(()=> Role, (role) => role.users)
    role:Role
    
    @Column({
        default:1
    })
    roleId:number
}
