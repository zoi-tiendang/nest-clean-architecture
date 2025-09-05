import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {

    const mockCreateProductUseCase = {
      execute: jest.fn(),
    };
    const mockUseCaseProxy = {
      getInstance: () => mockCreateProductUseCase,
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: 'createProductUsecasesProxy',
          useValue: mockUseCaseProxy,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
