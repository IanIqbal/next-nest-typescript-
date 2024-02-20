import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Innovation } from "./innovation.entity";
import { User } from "./user.entity";

@Entity({name:"teams"})
export class Team{
    @PrimaryGeneratedColumn()
    id:number

    
    @Column()
    userId:number

    @Column()
    innovationId:number
    
    @Column()
    teamRole:string
    
    @ManyToOne(() => User, (user) => user.teams)
    user:User

    @ManyToOne(() => Innovation, (innovation) => innovation.teams)
    innovation:Innovation

    @CreateDateColumn({type:'timestamp'})
    created_at:Date;
  
    @UpdateDateColumn({type:'timestamp'})
    updated_at:Date;
}