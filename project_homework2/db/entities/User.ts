import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, JoinTable, CreateDateColumn, BeforeInsert, ManyToMany } from "typeorm";
import Role from "./Role.js";
import bcrypt from 'bcrypt';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ length: 255, nullable: false })
    userName: string

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10)
        }
    }
    @Column({ nullable: false })
    password: string

    @Column({ nullable: false })
    email: string

    @Column({
        type: 'enum',
        enum: ['admin', 'user', 'editor'],
        default: 'user'
    })
    type: 'admin' | 'user' | 'editor';

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP()"
    })
    createdAt: Date;

    @ManyToMany(() => Role, role => role.users)
    roles: Role[];
}