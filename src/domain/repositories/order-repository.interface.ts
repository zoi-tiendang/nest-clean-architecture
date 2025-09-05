import { OrderM } from '../models/order';

export interface OrderRepository {
  create(order: OrderM): Promise<OrderM>;
  findAll(): Promise<OrderM[]>;
  findById(id: number): Promise<OrderM | null>;
  update(id: number, updatedOrder: OrderM): Promise<OrderM | null>;
  deleteById(id: number): Promise<void>;
}
