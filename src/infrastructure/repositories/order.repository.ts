import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderRepository } from 'src/domain/repositories/order-repository.interface';
import { Order } from '../entities/order.entity';
import { OrderM } from 'src/domain/models/order';
import { OrderItem } from '../entities/order-item.entity';

@Injectable()
export class DatabaseOrderRepository implements OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderEntityRepository: Repository<Order>,
  ) {}

  private toOrderEntity(order: OrderM): Order {
    const orderEntity = new Order();
    orderEntity.id = order.id;
    orderEntity.totalAmount = order.totalAmount;
    orderEntity.orderDate = order.orderDate;
    orderEntity.shippingAddress = order.shippingAddress;
    orderEntity.status = order.status;
    orderEntity.customerId = order.customerId;

    if (order.orderItems) {
      orderEntity.orderItems = order.orderItems.map((item) => {
        const itemEntity = new OrderItem();
        itemEntity.id = item.id;
        itemEntity.quantity = item.quantity;
        itemEntity.priceAtPurchase = item.priceAtPurchase;
        itemEntity.productId = item.productId;
        itemEntity.orderId = item.orderId;
        return itemEntity;
      });
    }

    return orderEntity;
  }

  private toOrder(orderEntity: Order): OrderM {
    const order: OrderM = {
      id: orderEntity.id,
      customerId: orderEntity.customerId,
      totalAmount: orderEntity.totalAmount,
      orderDate: orderEntity.orderDate,
      shippingAddress: orderEntity.shippingAddress,
      status: orderEntity.status,
      orderItems: orderEntity.orderItems
        ? orderEntity.orderItems.map((item) => ({
            id: item.id,
            orderId: item.orderId,
            productId: item.productId,
            quantity: item.quantity,
            priceAtPurchase: item.priceAtPurchase,
          }))
        : [],
      createdDate: orderEntity.createdDate,
    };
    return order;
  }

  async create(order: OrderM): Promise<OrderM> {
    const orderEntity = this.toOrderEntity(order);
    await this.orderEntityRepository.save(orderEntity);
    return this.toOrder(orderEntity);
  }

  async findById(id: number): Promise<OrderM | null> {
    const orderEntity = await this.orderEntityRepository.findOne({
      where: { id },
      relations: ['orderItems'],
    });

    if (!orderEntity) {
      return null;
    }

    const orderM: OrderM = {
      id: orderEntity.id,
      customerId: orderEntity.customerId,
      totalAmount: orderEntity.totalAmount,
      orderDate: orderEntity.orderDate,
      shippingAddress: orderEntity.shippingAddress,
      status: orderEntity.status,
      orderItems: orderEntity.orderItems.map((item) => ({
        id: item.id,
        orderId: item.orderId,
        productId: item.productId,
        quantity: item.quantity,
        priceAtPurchase: item.priceAtPurchase,
      })),
      createdDate: orderEntity.createdDate,
    };
    return orderM;
  }

  async findAll(): Promise<OrderM[]> {
    const orderEntities = await this.orderEntityRepository.find({
      relations: ['orderItems'],
    });
    return orderEntities.map((orderEntity) => this.toOrder(orderEntity));
  }

  async update(id: number, order: OrderM): Promise<OrderM | null> {
    const existingOrder = await this.orderEntityRepository.findOne({
      where: { id },
    });
    if (!existingOrder) {
      return null;
    }

    const updatedOrderEntity = this.toOrderEntity(order);
    updatedOrderEntity.id = id;

    await this.orderEntityRepository.save(updatedOrderEntity);
    return this.toOrder(updatedOrderEntity);
  }

  async deleteById(id: number): Promise<void> {
    await this.orderEntityRepository.delete(id);
  }
}
