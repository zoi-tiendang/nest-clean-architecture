import { BadRequestException } from '@nestjs/common';
import { placeOrderUseCase } from './place-order.usecase';
import { PlaceOrderDto } from 'src/infrastructure/controllers/orders/order.dto';
import { ProductEntity } from 'src/infrastructure/entities/product.entity';

describe('placeOrderUseCase', () => {
  let useCase: placeOrderUseCase;
  let mockManager: any;
  let mockDataSource: any;

  beforeEach(() => {
    mockManager = {
      getRepository: jest.fn(),
      save: jest.fn(),
    };
    mockDataSource = {
      transaction: jest.fn(),
    };
    useCase = new placeOrderUseCase(mockDataSource);
  });

  it('should place an order successfully', async () => {
    const product = { id: 1, price: 100, stockQuantity: 10, isForSale: true };
    const updatedProduct = { ...product, stockQuantity: 8 };
    const orderDto: PlaceOrderDto = {
      customerId: 123,
      shippingAddress: '123 Main St',
      orderItems: [
        { productId: 1, quantity: 2 },
      ],
    };
    const savedOrder = { id: 1, ...orderDto, totalAmount: 200, status: 'pending', orderItems: [], orderDate: new Date() };

    mockManager.getRepository.mockReturnValue({
      findOne: jest.fn().mockResolvedValue(product),
    });
    mockManager.save
      .mockResolvedValueOnce(updatedProduct) // product save
      .mockResolvedValueOnce(savedOrder);    // order save

    mockDataSource.transaction.mockImplementation(async (cb: any) => cb(mockManager));

    const result = await useCase.execute(orderDto);

    expect(result).toEqual(savedOrder);
    expect(mockManager.save).toHaveBeenCalledTimes(2);
    expect(mockManager.getRepository).toHaveBeenCalledWith(ProductEntity);
  });

  it('should throw BadRequestException if product not found', async () => {
    const orderDto: PlaceOrderDto = {
      customerId: 123,
      shippingAddress: '123 Main St',
      orderItems: [
        { productId: 99, quantity: 1 },
      ],
    };

    mockManager.getRepository.mockReturnValue({
      findOne: jest.fn().mockResolvedValue(null),
    });
    mockDataSource.transaction.mockImplementation(async (cb: any) => cb(mockManager));

    await expect(useCase.execute(orderDto)).rejects.toThrow(BadRequestException);
  });

  it('should throw BadRequestException if insufficient stock', async () => {
    const product = { id: 1, price: 100, stockQuantity: 1, isForSale: true };
    const updatedProduct = { ...product, stockQuantity: -1 };
    const orderDto: PlaceOrderDto = {
      customerId: 123,
      shippingAddress: '123 Main St',
      orderItems: [
        { productId: 1, quantity: 2 },
      ],
    };

    mockManager.getRepository.mockReturnValue({
      findOne: jest.fn().mockResolvedValue(product),
    });
    mockManager.save
      .mockResolvedValueOnce(updatedProduct); // product save

    mockDataSource.transaction.mockImplementation(async (cb: any) => cb(mockManager));

    await expect(useCase.execute(orderDto)).rejects.toThrow(BadRequestException);
  });
});
