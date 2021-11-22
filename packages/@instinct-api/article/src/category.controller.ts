import {CategoryPipe} from './category.pipe';
import {ArticleCategoryDTO} from './category.dto';
import {HasScope} from '@instinct-api/session';
import {ArticleCategory} from '@instinct-prj/interface';
import {
  ArticleCategoryEntity,
  articleCategoryWire,
  ArticleCategoryRepository,
} from '@instinct-api/database';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('categories')
export class ArticleCategoryController {
  constructor(
    private readonly articleCategoryRepo: ArticleCategoryRepository
  ) {}

  @Get()
  async getAllCategories(): Promise<ArticleCategory[]> {
    const categories = await this.articleCategoryRepo.find();
    return categories.map(_ => articleCategoryWire(_));
  }

  @Post()
  @HasScope('websiteManageNews')
  async createCategory(
    @Body() categoryDTO: ArticleCategoryDTO
  ): Promise<ArticleCategory> {
    const category = await this.articleCategoryRepo.create(categoryDTO);
    return articleCategoryWire(category);
  }

  @Patch(':categoryID')
  @HasScope('websiteManageNews')
  async updateCategory(
    @Param('categoryID', CategoryPipe) category: ArticleCategoryEntity,
    @Body() categoryDTO: ArticleCategoryDTO
  ): Promise<string> {
    await this.articleCategoryRepo.update({id: category.id!}, categoryDTO);
    return 'Your changes have been saved';
  }

  @Delete(':categoryID')
  @HasScope('websiteManageNews')
  async deleteCategory(
    @Param('categoryID', CategoryPipe) category: ArticleCategoryEntity
  ): Promise<string> {
    await this.articleCategoryRepo.delete({id: category.id!});
    return 'Article category has been deleted';
  }
}
