import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { Todo } from '../entities/todo.entity';
import { DatabaseTodoRepository } from './todo.repository';
import { DatabaseOrderRepository } from './order.repository';
import { DatabaseProductRepository } from './product.repository';
import { Order } from '../entities/order.entity';
import { Product } from '../entities/product.entity';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([Todo, Order, Product]),
  ],
  providers: [
    DatabaseTodoRepository,
    DatabaseOrderRepository,
    DatabaseProductRepository,
  ],
  exports: [
    DatabaseTodoRepository,
    DatabaseOrderRepository,
    DatabaseProductRepository,
  ],
})
export class RepositoriesModule {}
