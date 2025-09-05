import { DynamicModule, Module } from '@nestjs/common';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { RepositoriesModule } from '../repositories/repositories.module';
import { DatabaseTodoRepository } from '../repositories/todo.repository';
import { UseCaseProxy } from './usecase-proxy';
import { DatabaseProductRepository } from '../repositories/product.repository';
import { createProductUseCase } from 'src/usecases/products/create-product.usecase';
import { getTodosUseCase } from 'src/usecases/todo/get-todos.usecase';
import { placeOrderUseCase } from 'src/usecases/orders/place-order.usecase';
import { DataSource } from 'typeorm';

@Module({
  imports: [LoggerModule, RepositoriesModule, ExceptionsModule],
})
export class UsecasesProxyModule {
  static GET_TODOS_USECASE_PROXY = 'getTodosUseCasesProxy';
  static CREATE_PRODUCT_USECASE_PROXY = 'createProductUsecasesProxy';
  static PLACE_ORDER_USECASE_PROXY = 'placeOrderUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [DatabaseTodoRepository],
          provide: UsecasesProxyModule.GET_TODOS_USECASE_PROXY,
          useFactory: (todoRepository: DatabaseTodoRepository) =>
            new UseCaseProxy(new getTodosUseCase(todoRepository)),
        },
        {
          inject: [DatabaseProductRepository],
          provide: UsecasesProxyModule.CREATE_PRODUCT_USECASE_PROXY,
          useFactory: (productRepository: DatabaseProductRepository) =>
            new UseCaseProxy(new createProductUseCase(productRepository)),
        },
        {
          inject: [DataSource],
          provide: UsecasesProxyModule.PLACE_ORDER_USECASE_PROXY,
          useFactory: (dataSource: DataSource) =>
            new UseCaseProxy(new placeOrderUseCase(dataSource)),
        },
      ],
      exports: [
        UsecasesProxyModule.GET_TODOS_USECASE_PROXY,
        UsecasesProxyModule.CREATE_PRODUCT_USECASE_PROXY,
        UsecasesProxyModule.PLACE_ORDER_USECASE_PROXY,
      ],
    };
  }
}
