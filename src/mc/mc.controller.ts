import { Controller, Get, Param } from '@nestjs/common';
import { MCService } from './mc.service';

@Controller('mc')
export class MCController {
  constructor(private readonly service: MCService) {}

  @Get(':appId')
  getAppsForValidIdsWithAppId(@Param('appId') appId: string) {
    return this.service.getLinksForGroupsWithAppId(appId);
  }
}
