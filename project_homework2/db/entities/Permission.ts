import { Column, PrimaryGeneratedColumn, BaseEntity, Entity } from "typeorm";

@Entity()
export class Permission extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    name: string
}