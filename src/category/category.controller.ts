import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './category.dto';
import { Category } from './category.schema';
import { UpdateCategoryDto } from './updateCategoryDto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get('DATA')
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Category> {
    return this.categoryService.remove(id);
  }

  @Put('update/:id')
  async updateCategory(
    @Param('id') id: string,
    @Body() UpdateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id, UpdateCategoryDto);
  }
}
