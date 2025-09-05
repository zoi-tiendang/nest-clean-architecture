import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { ProductRepository } from 'src/domain/repositories/product-repository.interface';
import { ProductM } from 'src/domain/models/product';

@Injectable()
export class DatabaseProductRepository implements ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productEntityRepository: Repository<Product>,
  ) {}

  private toProductEntity(product: ProductM): Product {
    const productEntity = new Product();
    productEntity.id = product.id;
    productEntity.name = product.name;
    productEntity.price = product.price;
    productEntity.stockQuantity = product.stockQuantity;
    productEntity.isForSale = product.isForSale;
    return productEntity;
  }

  private toProductModel(productEntity: Product): ProductM {
    const product = new ProductM();
    product.id = productEntity.id;
    product.name = productEntity.name;
    product.price = productEntity.price;
    product.stockQuantity = productEntity.stockQuantity;
    product.isForSale = productEntity.isForSale;
    product.createdDate = productEntity.createdDate;
    product.updatedDate = productEntity.updatedDate;
    return product;
  }

  async create(product: ProductM): Promise<ProductM> {
    const productEntity = this.toProductEntity(product);
    return this.productEntityRepository.save(productEntity);
  }

  async findAll(): Promise<ProductM[]> {
    const products = await this.productEntityRepository.find();
    return products.map((product) => this.toProductModel(product));
  }

  async findById(id: number): Promise<ProductM | null> {
    const product = await this.productEntityRepository.findOne({
      where: { id },
    });

    return !product ? null : this.toProductModel(product);
  }

  async update(id: number, product: ProductM): Promise<ProductM | null> {
    const productEntity = this.toProductEntity(product);
    await this.productEntityRepository.save({ ...productEntity, id });
    return this.findById(id);
  }

  async deleteById(id: number): Promise<void> {
    await this.productEntityRepository.delete(id);
  }
}
