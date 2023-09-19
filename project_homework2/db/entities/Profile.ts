import { OneToOne, PrimaryGeneratedColumn, Column, BaseEntity, Entity, JoinColumn } from "typeorm";
import { User } from "./User.js";

@Entity()
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false })
  firstName: string

  @Column({ nullable: false })
  lastName: string

  @Column()
  dateOfBirth: string //3-3-2003

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}