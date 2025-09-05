import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { OrderItemEntity } from './order-item.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column('integer', { nullable: true })
  customerId: number;

  @Column('varchar', { length: 50 })
  status:
    | 'pending'
    | 'processing'
    | 'completed'
    | 'cancelled'
    | 'refunded'
    | 'hold';

  @Column('integer', { nullable: false })
  totalAmount: number;

  @Column('varchar', { length: 255 })
  shippingAddress: string;

  @Column('timestamp')
  orderDate: Date;

  @CreateDateColumn({ name: 'createdDate' })
  createdDate: Date;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order, {
    cascade: true,
  })
  orderItems: OrderItemEntity[];
}
