import { OrderItemM } from './orderItem';

export class OrderM {
  id: number;
  customerId: number;
  status:
    | 'pending'
    | 'processing'
    | 'completed'
    | 'cancelled'
    | 'refunded'
    | 'hold';
  totalAmount: number;
  shippingAddress: string;
  orderDate: Date;
  createdDate: Date;
  orderItems: OrderItemM[];
}
