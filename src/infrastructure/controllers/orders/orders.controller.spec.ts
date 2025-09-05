import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '../../usecases-proxy/usecase-proxy';
import { placeOrderUseCase } from 'src/usecases/orders/place-order.usecase';

describe('OrdersController', () => {
  let controller: OrdersController;

  beforeEach(async () => {

    const mockPlaceOrderUseCase = {
      execute: jest.fn(),
    };
    const mockUseCaseProxy = {
      getInstance: () => mockPlaceOrderUseCase,
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: 'placeOrderUsecasesProxy',
          useValue: mockUseCaseProxy,
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
