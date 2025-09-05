import { ApiProperty } from '@nestjs/swagger';
import { ProductM } from 'src/domain/models/product';

export class ProductPresenter {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  stockQuantity: number;

  @ApiProperty()
  isForSale: boolean;

  @ApiProperty()
  createdDate: Date;

  @ApiProperty()
  updatedDate: Date;

  constructor(product: ProductM) {
    this.id = product.id;
    this.name = product.name;
    this.price = product.price;
    this.stockQuantity = product.stockQuantity;
    this.isForSale = product.isForSale;
    this.createdDate = product.createdDate;
    this.updatedDate = product.updatedDate;
  }
}
