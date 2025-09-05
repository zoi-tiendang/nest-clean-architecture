import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiExtraModels } from '@nestjs/swagger';
import { ApiResponseType } from 'src/infrastructure/common/swagger/response.decorator';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecase-proxy';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { ProductPresenter } from './product.presenter';
import { createProductUseCase } from 'src/usecases/products/create-product.usecase';
import { CreateProductDto } from './product.dto';

@Controller('products')
@ApiTags('products')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(ProductPresenter)
export class ProductsController {
  constructor(
    @Inject(UsecasesProxyModule.CREATE_PRODUCT_USECASE_PROXY)
    private readonly createProductUsecaseProxy: UseCaseProxy<createProductUseCase>,
  ) {}

  @Post('create')
  @ApiResponseType(ProductPresenter, false)
  async create(@Body() productData: CreateProductDto) {
    const product = await this.createProductUsecaseProxy
      .getInstance()
      .execute(productData);
    return new ProductPresenter(product);
  }
}
