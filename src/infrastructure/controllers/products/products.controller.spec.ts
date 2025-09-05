import { Test, TestingModule } from '@nestjs/testing';
import { ProdutsController } from './products.controller';

describe('ProdutsController', () => {
  let controller: ProdutsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutsController],
    }).compile();

    controller = module.get<ProdutsController>(ProdutsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
