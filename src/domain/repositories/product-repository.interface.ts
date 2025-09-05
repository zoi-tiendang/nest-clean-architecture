import { ProductM } from '../models/product';

export interface ProductRepository {
  create(product: ProductM): Promise<ProductM>;
  findAll(): Promise<ProductM[]>;
  findById(id: number): Promise<ProductM | null>;
  update(id: number, product: ProductM): Promise<ProductM | null>;
  deleteById(id: number): Promise<void>;
}
