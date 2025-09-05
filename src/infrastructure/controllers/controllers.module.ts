import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { TodoController } from './todo/todo.controller';
import { OrdersController } from './orders/orders.controller';
import { ProductsController } from './products/products.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [TodoController, OrdersController, ProductsController],
})
export class ControllersModule {}