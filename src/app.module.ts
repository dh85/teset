import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MCModule } from './mc/mc.module';
import { MCService } from './mc/mc.service';

@Module({
  imports: [MCModule, HttpModule],
  controllers: [AppController],
  providers: [AppService, MCService],
})
export class AppModule {}
