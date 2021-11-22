import {ArticlePipe} from './article.pipe';
import {ArticleCommentDTO} from './article-comment.dto';
import {ArticleCommentPipe} from './article-comment.pipe';
import {HasSession, GetSession} from '@instinct-api/session';
import {Body, Controller, Delete, Param, Post} from '@nestjs/common';
import {
  UserEntityStruct,
  ArticleCommentEntity,
  ArticleCommentRepository,
  ArticleEntity,
  articleCommentWire,
} from '@instinct-api/database';

@Controller('articles/:articleID/comments')
@HasSession()
export class ArticleCommentController {
  constructor(private readonly articleCommentRepo: ArticleCommentRepository) {}

  @Post()
  async createComment(
    @Param('articleID', ArticlePipe) article: ArticleEntity,
    @Body() comment: ArticleCommentDTO,
    @GetSession() user: UserEntityStruct
  ) {
    const newComment = await this.articleCommentRepo.create({
      content: comment.content,
      articleID: article.id!,
      userID: user.id!,
      timestamp: Number(+new Date() / 1000),
    });
    return articleCommentWire(newComment);
  }

  @Delete(':commentID')
  async deleteComment(
    @Param('commentID', ArticleCommentPipe) comment: ArticleCommentEntity
  ) {
    await this.articleCommentRepo.delete({id: comment.id!});
  }
}
