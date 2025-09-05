import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ProductM } from 'src/domain/models/product';

export class CreateProductDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly stockQuantity: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly isForSale: boolean;
}
