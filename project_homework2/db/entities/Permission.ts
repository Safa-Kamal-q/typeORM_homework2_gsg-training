import { Column, PrimaryGeneratedColumn,BaseEntity,Entity } from "typeorm";

@Entity()
export class Permission extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number 

    @Column({unique: true})
    name: string 
}