import { IsInt, IsNotEmpty, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class OrderItemDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsInt()
  readonly productId: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsInt()
  @Min(1, { message: 'Quantity must be at least 1' })
  readonly quantity: number;
}

export class PlaceOrderDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly customerId: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly shippingAddress: string;

  @ApiProperty({
    required: true,
    type: [OrderItemDto],
    description: 'Array of order items',
  })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  readonly orderItems: OrderItemDto[];
}
