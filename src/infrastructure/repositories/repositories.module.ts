import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { DatabaseOrderRepository } from './order.repository';
import { DatabaseProductRepository } from './product.repository';
import { OrderEntity } from '../entities/order.entity';
import { ProductEntity } from '../entities/product.entity';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([ OrderEntity, ProductEntity]),
  ],
  providers: [
    DatabaseOrderRepository,
    DatabaseProductRepository,
  ],
  exports: [
    DatabaseOrderRepository,
    DatabaseProductRepository,
  ],
})
export class RepositoriesModule {}
