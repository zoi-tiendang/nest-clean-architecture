import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { OrdersController } from './orders/orders.controller';
import { ProductsController } from './products/products.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [OrdersController, ProductsController],
})
export class ControllersModule {}
