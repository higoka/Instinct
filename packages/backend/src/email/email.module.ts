import {Module} from '@nestjs/common';
import {EmailService} from './email.service';
import {DatabaseModule} from '@instinct/backend';

@Module({
  imports: [DatabaseModule],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
