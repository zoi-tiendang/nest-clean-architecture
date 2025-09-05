import { Controller, Get, Inject } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from '../../usecases-proxy/usecase-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { TodoPresenter } from './todo.presenter';
import { getTodosUseCase } from 'src/usecases/todo/get-todos.usecase';
import { ApiResponseType } from 'src/infrastructure/common/swagger/response.decorator';

@Controller('todo')
@ApiTags('todo')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(TodoPresenter)
export class TodoController {
  constructor(
    @Inject(UsecasesProxyModule.GET_TODOS_USECASE_PROXY)
    private readonly getAllTodoUsecaseProxy: UseCaseProxy<getTodosUseCase>,
  ) {}

  @Get('todos')
  @ApiResponseType(TodoPresenter, true)
  async getTodos() {
    const todos = await this.getAllTodoUsecaseProxy.getInstance().execute();
    return todos.map((todo) => new TodoPresenter(todo));
  }
}
