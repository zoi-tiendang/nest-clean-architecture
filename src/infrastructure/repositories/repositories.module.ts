import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { TodoEntity } from '../entities/todo.entity';
import { DatabaseTodoRepository } from './todo.repository';
import { DatabaseOrderRepository } from './order.repository';
import { DatabaseProductRepository } from './product.repository';
import { OrderEntity } from '../entities/order.entity';
import { ProductEntity } from '../entities/product.entity';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([TodoEntity, OrderEntity, ProductEntity]),
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
