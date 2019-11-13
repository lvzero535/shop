import { PrimaryGeneratedColumn, Entity, Column, ManyToOne, CreateDateColumn } from "typeorm";
import SecondCategory from "./second_category";

@Entity()
export default class Product {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
  
  @Column()
  isHot: boolean;

  @Column({
    type: 'text'
  })
  remark: string;

  @Column()
  price: number;

  @Column()
  promotionPrice: number;

  @CreateDateColumn()
  createdDate: Date;
  
  @Column()
  imageUrl: string;

  @ManyToOne(type => SecondCategory, secondCategory => secondCategory.products)
  secondCategory: SecondCategory;
}