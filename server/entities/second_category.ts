import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from "typeorm";
import Category from "./category";
import Product from "./product";

@Entity()
export default class SecondCategory {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 40
  })
  name: string;

  @Column()
  isPulished: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @ManyToOne(type => Category, category => category.secondCategorys, { onDelete: 'CASCADE'})
  category: Category;

  @OneToMany(type => Product, product => product.secondCategory)
  products: Product[];

}