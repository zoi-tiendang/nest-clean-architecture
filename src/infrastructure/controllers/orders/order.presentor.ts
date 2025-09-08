import { ApiProperty } from '@nestjs/swagger';
import { OrderM } from 'src/domain/models/order';

export class OrderPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  customerId: number;
  @ApiProperty()
  totalAmount: number;
  @ApiProperty()
  orderDate: Date;
  @ApiProperty()
  shippingAddress: string;
  @ApiProperty()
  status: string;
  @ApiProperty({ type: () => [Object] })
  orderItems: {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    priceAtPurchase: number;
  }[];
  @ApiProperty()
  createdDate: Date;

  constructor(order: OrderM) {
    this.id = order.id;
    this.customerId = order.customerId;
    this.totalAmount = order.totalAmount;
    this.orderDate = order.orderDate;
    this.shippingAddress = order.shippingAddress;
    this.status = order.status;
    this.orderItems = order.orderItems;
    this.createdDate = order.createdDate;
  }
}
