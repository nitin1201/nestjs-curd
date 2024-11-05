import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { products, productsDocument } from './products.schema';
import { ProductsDto } from './Products.Dto';
import { UpdateProductsDto } from './UpdateProductsDto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(products.name) private productsModel: Model<productsDocument>,
  ) {}

  // ADD DATA IN DATABASE
  async create(ProductsDto: ProductsDto): Promise<products> {
    const existingCategory = await this.productsModel.findOne({
      title: ProductsDto.title,
    });
    if (existingCategory) {
      throw new Error('Category with this name already exists');
    }
    const createdCategory = new this.productsModel(ProductsDto);
    return createdCategory.save();
  }
  // GET DATA FROM DATABASE
  async findAll(): Promise<products[]> {
    return this.productsModel.find();
  }
  //DELETE DATA FROM DATABASE
  async remove(id: string): Promise<products> {
    const deletedCategory = await this.productsModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return deletedCategory;
  }
  //UPDATE DATA FROM DATABASE
  async updateCategory(
    id: string,
    UpdateProductsDto: UpdateProductsDto,
  ): Promise<products> {
    const updatedCategory = await this.productsModel.findByIdAndUpdate(
      id,
      UpdateProductsDto,
      {
        new: true,
      },
    );
    if (!updatedCategory) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return updatedCategory;
  }
}
