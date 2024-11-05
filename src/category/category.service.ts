import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './category.schema';
import { CreateCategoryDto } from './category.dto';
import { UpdateCategoryDto } from './updateCategoryDto';
import { Users } from '../entities/users.schema';
// import { UpdateCategoryDto } from './category.dto';
@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}
  //add data in database
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const existingCategory = await this.categoryModel.findOne({ name: createCategoryDto.name });
    if (existingCategory) {
      throw new Error('Category with this name already exists');
    } 
    const createdCategory = new this.categoryModel(createCategoryDto);
    return createdCategory.save();
  }
  //get data from database
  async findAll(): Promise<Category[]> {
    return this.categoryModel.find();
  }
  //remove data from database
  async remove(id: string): Promise<Category> {
    const deletedCategory = await this.categoryModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return deletedCategory;
  }
  //update data--*
  async updateCategory(
    id: string,
    UpdateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const updatedCategory = await this.categoryModel.findByIdAndUpdate(
      id,
      UpdateCategoryDto,
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
