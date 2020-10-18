import Moment from 'moment';
import {HashService} from '../../common';
import randomString from 'crypto-random-string';
import {EmailService} from '../../email/email.service';
import {ConfigRepository} from '../../database/entity/config';
import {BadRequestException, Injectable} from '@nestjs/common';
import {ForgotPasswordEmailTemplate} from './forgot-password.types';
import {UserEntity, UserRepository} from '../../database/entity/user';
import {UserForgotPasswordRepository} from '../../database/entity/user';

@Injectable()
export class ForgotPasswordService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly configRepo: ConfigRepository,
    private readonly hashService: HashService,
    private readonly emailService: EmailService,
    private readonly forgotPasswordRepo: UserForgotPasswordRepository
  ) {}

  async generatePasswordKey(email: string): Promise<void> {
    const config = await this.configRepo.getConfig();
    const user: UserEntity | undefined = await this.userRepo.getByEmail(email);

    if (user === undefined) {
      throw new BadRequestException('User does not exist');
    }

    const token = randomString({length: 50, type: 'url-safe'});
    const expiration = Moment().add('4', 'hours').unix();
    await this.forgotPasswordRepo.create(user!.id!, token, expiration);

    await this.emailService.sendEmail<ForgotPasswordEmailTemplate>(
      user.email,
      config.sendGridForgotPasswordTemplate,
      {
        username: user.username,
        reset_link: `${config.siteLink}/forgot-password?token=${token}`,
      }
    );
  }

  async redeemPasswordToken(token: string, newPassword: string): Promise<void> {
    const forgotPasswordEntity = await this.forgotPasswordRepo.getByToken(
      token
    );

    const currentTimestamp = +new Date() / 1000;

    if (forgotPasswordEntity.expiresAt <= currentTimestamp) {
      throw new BadRequestException('Reset link has expired');
    }

    await this.userRepo.updateByID(forgotPasswordEntity.userID, {
      password: this.hashService.generate(newPassword),
    });

    await this.forgotPasswordRepo.deleteByToken(token);
  }
}
