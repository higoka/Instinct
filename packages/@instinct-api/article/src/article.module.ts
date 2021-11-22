import {Module} from '@nestjs/common';
import {ArticlePipe} from './article.pipe';
import {CategoryPipe} from './category.pipe';
import {UserModule} from '@instinct-api/users';
import {SessionModule} from '@instinct-api/session';
import {ArticleController} from './article.controller';
import {DatabaseModule} from '@instinct-api/database';
import {ArticleCommentPipe} from './article-comment.pipe';
import {ArticleCategoryController} from './category.controller';
import {ArticleCommentController} from './article-comment.controller';

@Module({
  imports: [SessionModule, DatabaseModule, UserModule],
  controllers: [
    ArticleController,
    ArticleCategoryController,
    ArticleCommentController,
  ],
  providers: [ArticlePipe, CategoryPipe, ArticleCommentPipe],
  exports: [ArticlePipe, CategoryPipe, ArticleCommentPipe],
})
export class ArticleModule {}
