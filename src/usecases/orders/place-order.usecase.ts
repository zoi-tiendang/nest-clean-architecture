import { BadRequestException } from '@nestjs/common';
import { OrderM } from 'src/domain/models/order';
import { PlaceOrderDto } from 'src/infrastructure/controllers/orders/order.dto';
import { OrderItemEntity } from 'src/infrastructure/entities/order-item.entity';
import { OrderEntity } from 'src/infrastructure/entities/order.entity';
import { ProductEntity } from 'src/infrastructure/entities/product.entity';
import { DataSource } from 'typeorm';

export class placeOrderUseCase {
  constructor(private readonly dataSource: DataSource) {}

  async execute(placeOrderDto: PlaceOrderDto): Promise<OrderM> {
    return await this.dataSource.transaction(async (manager) => {
      let totalAmount = 0;
      const orderItems: OrderItemEntity[] = [];

      for (const itemDto of placeOrderDto.orderItems) {
        const product = await manager.getRepository(ProductEntity).findOne({
          where: { id: itemDto.productId, isForSale: true },
        });

        if (!product) {
          throw new BadRequestException(
            `Product with ID #${itemDto.productId} not found.`,
          );
        }

        product.stockQuantity -= itemDto.quantity;

        // Save updated product stock
        const updatedProduct = await manager.save(product);

        if (updatedProduct.stockQuantity < 0) {
          throw new BadRequestException(
            `Insufficient stock for product ID #${itemDto.productId}.`,
          );
        }

        const orderItem = new OrderItemEntity();
        orderItem.product = product;
        orderItem.productId = product.id;
        orderItem.quantity = itemDto.quantity;
        orderItem.priceAtPurchase = product.price;

        orderItems.push(orderItem);
        totalAmount += orderItem.quantity * orderItem.priceAtPurchase;
      }

      const orderEntity = new OrderEntity();
      orderEntity.customerId = placeOrderDto.customerId;
      orderEntity.orderItems = orderItems;
      orderEntity.totalAmount = totalAmount;
      orderEntity.status = 'pending';
      orderEntity.shippingAddress = placeOrderDto.shippingAddress;
      orderEntity.orderDate = new Date();

      const savedOrder = await manager.save(orderEntity);

      return savedOrder;
    });
  }
}
