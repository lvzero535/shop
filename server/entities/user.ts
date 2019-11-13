import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 20
  })
  username: string;

  @Column({
    length: 40
  })
  password: string;

  @Column({
    length: 11
  })
  phone: string;

  @Column({
    length: 40
  })
  email: string;

  @Column({
    length: 1
  })
  gender: string;
}