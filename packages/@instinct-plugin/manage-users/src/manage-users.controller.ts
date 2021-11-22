import Moment from 'moment';
import {UserPipe} from '@instinct-api/users';
import {HasScope} from '@instinct-api/session';
import {HashService} from '@instinct-api/common';
import {InternalUser} from '@instinct-prj/interface';
import {InternalUserDTO, UpdateInternalUserDTO} from './manage-users.types';
import {
  UserEntityStruct,
  UserRepository,
  internalUserWire,
} from '@instinct-api/database';
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Param,
  Post,
} from '@nestjs/common';

@Controller('admin/users')
export class ManageUsersController {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly hashService: HashService
  ) {}

  @Get()
  @HasScope('websiteManageUsers')
  async getAll(): Promise<InternalUser[]> {
    const users = await this.userRepo.find();
    return users.map(_ => internalUserWire(_));
  }

  @Post()
  @HasScope('websiteManageUsers')
  async createUser(@Body() userDTO: InternalUserDTO): Promise<InternalUser> {
    const newUser = await this.userRepo.create({
      ...userDTO,
      ipCurrent: '',
      ipRegister: '',
      accountCreated: Moment().unix(),
      accountDayOfBirth: 1,
      mailVerified: 0,
      lastLogin: 0,
      lastOnline: 0,
      gender: 'm',
      online: '0',
      clientType: 'nitro',
    });

    return internalUserWire(newUser);
  }

  @Patch(':userID')
  @HasScope('websiteManageUsers')
  async updateUser(
    @Param('userID', UserPipe) user: UserEntityStruct,
    @Body() userDTO: UpdateInternalUserDTO
  ): Promise<InternalUser> {
    if (userDTO.password) {
      userDTO.password = this.hashService.generate(userDTO.password);
    }
    await this.userRepo.update({id: user.id!}, userDTO);
    const updatedUser = await this.userRepo.findOneOrFail({id: user.id!});
    return internalUserWire(updatedUser);
  }

  @Delete(':userID')
  @HasScope('websiteManageUsers')
  async deleteUser(
    @Param('userID', UserPipe) user: UserEntityStruct
  ): Promise<string> {
    await this.userRepo.delete({id: user.id!});
    return 'User has been deleted';
  }
}
