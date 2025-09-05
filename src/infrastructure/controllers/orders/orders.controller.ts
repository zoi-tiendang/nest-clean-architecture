import { Body, Controller, Inject, Post } from '@nestjs/common';
import { PlaceOrderDto } from './order.dto';
import { ApiTags, ApiResponse, ApiExtraModels, ApiBody } from '@nestjs/swagger';
import { ApiResponseType } from 'src/infrastructure/common/swagger/response.decorator';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecase-proxy';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { placeOrderUseCase } from 'src/usecases/orders/place-order.usecase';
import { OrderPresenter } from './order.presentor';

@Controller('orders')
@ApiTags('orders')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(OrderPresenter)
export class OrdersController {
  constructor(
    @Inject(UsecasesProxyModule.PLACE_ORDER_USECASE_PROXY)
    private readonly placeOrderUsecaseProxy: UseCaseProxy<placeOrderUseCase>,
  ) {}

  @Post('place-order')
  @ApiResponseType(OrderPresenter, false)
  @ApiResponse({
    status: 201,
    description: 'Order placed successfully',
    type: OrderPresenter,
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiBody({ type: PlaceOrderDto })
  async create(
    @Body()
    placeOrderDto: PlaceOrderDto,
  ) {
    const order = await this.placeOrderUsecaseProxy
      .getInstance()
      .execute(placeOrderDto);
    return new OrderPresenter(order);
  }
}
