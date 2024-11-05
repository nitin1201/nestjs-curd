import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsDto } from './Products.Dto';
import { products } from './products.Schema';
import { UpdateCategoryDto } from 'src/category/updateCategoryDto';
import { UpdateProductsDto } from './UpdateProductsDto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  //POST DATA IN DATABASE
  @Post()
  create(@Body() ProductsDto: ProductsDto) {
    return this.productsService.create(ProductsDto);
  }
  //GET DATA FROM DATABASE
  @Get('DATA')
  async findAll(): Promise<products[]> {
    return this.productsService.findAll();
  }
  //DELETE DATA FROM DATABASE
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<products> {
    return this.productsService.remove(id);
  }
  //UPDATE DATA FROM DATABASE
  @Put('update/:id')
  async updateCategory(
    @Param('id') id: string,
    @Body() UpdateProductsDto: UpdateProductsDto,
  ) {
    return this.productsService.updateCategory(id, UpdateProductsDto);
  }
}
