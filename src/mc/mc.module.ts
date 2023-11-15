import { Module } from '@nestjs/common';
import { MCController } from './mc.controller';
import { MCService } from './mc.service';

@Module({
  providers: [MCService],
  controllers: [MCController],
})
export class MCModule {}
