import { BadRequestException } from "@nestjs/common";
import { OrderRepository } from "src/domain/repositories/order-repository.interface";
import { ProductRepository } from "src/domain/repositories/product-repository.interface";
import { PlaceOrderDto } from "src/infrastructure/controllers/orders/order.dto";
import { OrderItem } from "src/infrastructure/entities/order-item.entity";

export class placeOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository, private readonly productRepository: ProductRepository) {}

  async execute(placeOrderDto: PlaceOrderDto): Promise<void> {
    // A query runner is used to manage the transaction
    // const queryRunner = this.dataSource.createQueryRunner();
    // await queryRunner.connect();
    // await queryRunner.startTransaction();

    // try {
    //   let totalAmount = 0;
    //   const orderItems: OrderItem[] = [];

    //   // 1. Process each item from the DTO
    //   for (const itemDto of placeOrderDto.items) {
    //     const product = await this.productRepository.findOneBy({
    //       id: itemDto.productId,
    //     });

    //     if (!product) {
    //       throw new BadRequestException(
    //         `Product with ID #${itemDto.productId} not found.`,
    //       );
    //     }

    //     const orderItem = new OrderItem();
    //     orderItem.product = product;
    //     orderItem.productId = product.id;
    //     orderItem.quantity = itemDto.quantity;
    //     orderItem.priceAtPurchase = product.price; // Lock in the price at time of order

    //     orderItems.push(orderItem);
    //     totalAmount += orderItem.quantity * orderItem.priceAtPurchase;
    //   }

    //   // 2. Create the main Order entity
    //   const order = new Order();
    //   order.customerName = placeOrderDto.customerName;
    //   order.orderItems = orderItems; // Link the prepared OrderItems
    //   order.totalAmount = totalAmount;

    //   // 3. Save the complete Order object within the transaction.
    //   // Thanks to `cascade: true`, TypeORM will also save the associated OrderItems.
    //   const savedOrder = await queryRunner.manager.save(order);

    //   // 4. If everything is successful, commit the transaction
    //   await queryRunner.commitTransaction();
    //   return savedOrder;
    // } catch (error) {
    //   // 5. If any error occurs, roll back the entire transaction
    //   await queryRunner.rollbackTransaction();
    //   if (error instanceof BadRequestException) {
    //     throw error;
    //   }
    //   throw new InternalServerErrorException(
    //     'Failed to create order. Transaction rolled back.',
    //   );
    // } finally {
    //   // 6. Always release the query runner
    //   await queryRunner.release();
    // }
  }
}
