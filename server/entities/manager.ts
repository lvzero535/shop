import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
export enum UserRole {
  ADMIN = "admin",
  EDITOR = "editor",
  GHOST = "ghost"
}
@Entity()
export default class Manager {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 20
  })
  username: string;

  @Column()
  password: string;

  @Column({
    length: 40
  })
  email: string;

  @CreateDateColumn()
  createdDate: Date;
  
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.EDITOR
  })
  role: UserRole;

}