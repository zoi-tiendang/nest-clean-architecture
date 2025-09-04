import { ApiProperty } from '@nestjs/swagger';
import { TodoM } from '../../../domain/models/todo';

export class TodoPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  content: string;
  @ApiProperty()
  isDone: boolean;
  @ApiProperty()
  createdDate: Date;
  @ApiProperty()
  updateddate: Date;

  constructor(todo: TodoM) {
    this.id = todo.id;
    this.content = todo.content;
    this.isDone = todo.isDone;
    this.createdDate = todo.createdDate;
    this.updateddate = todo.updatedDate;
  }
}