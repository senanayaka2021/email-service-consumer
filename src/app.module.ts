import { Module } from '@nestjs/common';
import { EmailController } from './email/email.controller';

@Module({
  imports: [],
  controllers: [EmailController],
  providers: [],
})
export class AppModule {}
