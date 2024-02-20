import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Team } from "./team.entity";

@Entity({name:"innovations"})
export class Innovation {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column()
    coverUrl:string;

    @Column()
    backgroundStory:string;

    @Column()
    isJoinable:boolean;

    @Column()
    whyAnswer:string;

    @Column()
    howAnswer:string;

    @Column()
    whatAnswer:string;

    @OneToMany(() => Team, (team) => team.innovation)
    teams:Team[]

    @CreateDateColumn({type:'timestamp'})
    created_at:Date;
  
    @UpdateDateColumn({type:'timestamp'})
    updated_at:Date;

    @Column({
        default:"available"
    })
    status:string;
}
