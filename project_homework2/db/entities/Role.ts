import { Column, JoinTable, PrimaryGeneratedColumn,ManyToMany,BaseEntity,Entity } from "typeorm";
import { Permission } from "./Permission.js";
import { User } from "./User.js";

@Entity()
export default class Role extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column({ unique: true })
    name: string;

    @ManyToMany(() => User, user => user.roles)
    @JoinTable()
    users: User[];

    @ManyToMany(()=> Permission, {cascade: true, eager: true})
    @JoinTable()
    permissions: Permission[];
}