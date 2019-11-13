import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import SecondCategory from "./second_category";

@Entity()
export default class Category {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 40
  })
  name: string;

  @Column()
  hot: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @OneToMany(type => SecondCategory, secondCategory => secondCategory.category)
  secondCategorys: SecondCategory[];
}