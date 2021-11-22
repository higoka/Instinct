import Moment from 'moment';
import {User} from '@instinct-prj/interface';
import {SessionService} from './session.service';
import {HasSession} from './has-session.decorator';
import {GetSession} from './get-session.decorator';
import {HashService} from '@instinct-api/common';
import {
  UserEntityStruct,
  UserRepository,
  userWire,
} from '@instinct-api/database';
import {BadRequestException, Body, Controller, Get, Post} from '@nestjs/common';
import {
  NewSessionDTO,
  UpdateEmailDTO,
  UpdatePasswordDTO,
  UpdatePreferencesDTO,
} from './session.dto';

@Controller('session')
export class SessionController {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly sessionService: SessionService,
    private readonly hashService: HashService
  ) {}

  @Post()
  async createSession(@Body() newSession: NewSessionDTO): Promise<string> {
    const jwt = await this.sessionService.loginWithCredentials(
      newSession.username,
      newSession.password
    );

    await this.userRepo.update(
      {username: newSession.username},
      {lastLogin: Moment().unix()}
    );

    return jwt;
  }

  @Post('sso')
  @HasSession()
  async createSSO(@GetSession() session: UserEntityStruct): Promise<string> {
    return this.userRepo.createSSO(session.id!);
  }

  @Post('settings/preferences')
  @HasSession()
  async changePreferences(
    @GetSession() session: UserEntityStruct,
    @Body() preferencesDTO: UpdatePreferencesDTO
  ): Promise<string> {
    await this.userRepo.update({id: session.id!}, preferencesDTO);
    return 'Your preferences have been updated';
  }

  @Post('settings/email')
  @HasSession()
  async changeEmail(
    @GetSession() session: UserEntityStruct,
    @Body() emailDTO: UpdateEmailDTO
  ): Promise<string> {
    const samePassword: boolean = await this.hashService.compare(
      emailDTO.password,
      session.password
    );

    if (!samePassword) {
      throw new BadRequestException('That is not the right password');
    }

    await this.userRepo.update({id: session.id!}, {email: emailDTO.email});

    return 'Your email has been updated';
  }

  @Post('settings/password')
  @HasSession()
  async changePassword(
    @GetSession() session: UserEntityStruct,
    @Body() passwordDTO: UpdatePasswordDTO
  ): Promise<string> {
    const samePassword: boolean = await this.hashService.compare(
      passwordDTO.oldPassword,
      session.password
    );

    if (!samePassword) {
      throw new BadRequestException('That is not the right password');
    }

    if (passwordDTO.newPassword !== passwordDTO.newPasswordAgain) {
      throw new BadRequestException('Your passwords must match');
    }

    await this.userRepo.update(
      {id: session.id!},
      {
        password: this.hashService.generate(passwordDTO.newPassword),
      }
    );

    return 'Your password has been updated';
  }

  @Get()
  @HasSession()
  getSession(@GetSession() session: UserEntityStruct): User {
    return userWire(session);
  }
}
