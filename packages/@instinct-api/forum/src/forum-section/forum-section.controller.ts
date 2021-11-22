import {ForumSection} from '@instinct-prj/interface';
import {ForumSectionPipe} from '../forum-section/forum-section.pipe';
import {GetSession, HasScope, HasSession} from '@instinct-api/session';
import {NewForumSectionDTO, UpdateForumSectionDTO} from './forum-section.dto';
import {
  Controller,
  Get,
  Delete,
  Patch,
  Post,
  Param,
  Body,
} from '@nestjs/common';
import {
  ForumSectionEntity,
  ForumSectionRepository,
  forumSectionWire,
  UserEntityStruct,
} from '@instinct-api/database';

@Controller('forum/sections')
export class ForumSectionController {
  constructor(private readonly forumSectionRepo: ForumSectionRepository) {}

  @Get()
  @HasSession()
  async getAllSections(): Promise<ForumSection[]> {
    const forumSections = await this.forumSectionRepo.find({}, {id: 'ASC'});
    return forumSections.map(_ => forumSectionWire(_));
  }

  @Post()
  @HasScope('websiteManageForums')
  async createSection(
    @GetSession() user: UserEntityStruct,
    @Body() forumSectionDTO: NewForumSectionDTO
  ): Promise<ForumSection> {
    const newSection = await this.forumSectionRepo.create(forumSectionDTO);
    return forumSectionWire(newSection);
  }

  @Post(':sectionID')
  @HasScope('websiteManageForums')
  async createNestedSection(
    @GetSession() user: UserEntityStruct,
    @Param('sectionID', ForumSectionPipe) forumSection: ForumSectionEntity,
    @Body() forumSectionDTO: NewForumSectionDTO
  ): Promise<ForumSection> {
    const newSection = await this.forumSectionRepo.create({
      ...forumSectionDTO,
      sectionID: forumSection?.id,
    });
    return forumSectionWire(newSection);
  }

  @Get(':sectionID')
  @HasSession()
  async getSectionByID(
    @Param('sectionID', ForumSectionPipe) forumSection: ForumSectionEntity
  ): Promise<ForumSection> {
    return forumSectionWire(forumSection);
  }

  @Patch(':sectionID')
  @HasScope('websiteManageForums')
  async updateSectionByID(
    @GetSession() user: UserEntityStruct,
    @Param('sectionID', ForumSectionPipe) forumSection: ForumSectionEntity,
    @Body() forumSectionDTO: UpdateForumSectionDTO
  ) {
    await this.forumSectionRepo.update({id: forumSection.id!}, forumSectionDTO);
  }

  @Delete(':sectionID')
  @HasScope('websiteManageForums')
  async deleteSectionByID(
    @GetSession() user: UserEntityStruct,
    @Param('sectionID', ForumSectionPipe) forumSection: ForumSectionEntity
  ) {
    await this.forumSectionRepo.delete({id: forumSection.id!});
  }
}
