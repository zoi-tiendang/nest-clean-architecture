import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column('varchar', { length: 255, nullable: true })
  name: string;

  @Column('integer', { nullable: true })
  price: number;

  @Column('integer', { nullable: true })
  stockQuantity: number;

  @Column('boolean', { default: false })
  isForSale: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
