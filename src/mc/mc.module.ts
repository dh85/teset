import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MCController } from './mc.controller';
import { MCService } from './mc.service';

@Module({
  imports: [HttpModule],
  providers: [MCService],
  controllers: [MCController],
})
export class MCModule {}
