import { ProductM } from 'src/domain/models/product';
import { ProductRepository } from 'src/domain/repositories/product-repository.interface';
import { CreateProductDto } from 'src/infrastructure/controllers/products/product.dto';
import { ProductPresenter } from 'src/infrastructure/controllers/products/product.presenter';

export class createProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  toProduct(productData: CreateProductDto): ProductM {
    const product = new ProductM();
    product.name = productData.name;
    product.price = productData.price;
    product.stockQuantity = productData.stockQuantity;
    product.isForSale = productData.isForSale;
    return product;
  }

  async execute(productDto: CreateProductDto): Promise<ProductPresenter> {
    const productM = this.toProduct(productDto);
    const newProduct = await this.productRepository.create(productM);
    return newProduct;
  }
}
