import { DynamicModule, Module } from '@nestjs/common';
import { getTodosUseCases } from '../../usecases/todo/get-todos.usecase';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';
import { RepositoriesModule } from '../repositories/repositories.module';
import { DatabaseTodoRepository } from '../repositories/todo.repository';
import { UseCaseProxy } from './usecase-proxy';

@Module({
  imports: [LoggerModule, RepositoriesModule, ExceptionsModule],
})
export class UsecasesProxyModule {
  static GET_TODOS_USECASES_PROXY = 'getTodosUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [DatabaseTodoRepository],
          provide: UsecasesProxyModule.GET_TODOS_USECASES_PROXY,
          useFactory: (todoRepository: DatabaseTodoRepository) =>
            new UseCaseProxy(new getTodosUseCases(todoRepository)),
        },
      ],
      exports: [UsecasesProxyModule.GET_TODOS_USECASES_PROXY],
    };
  }
}
