import { Controller, Get } from '@nestjs/common';
import { Application } from './mc/models/link.response';

export interface Apps {
  link: string;
  display_name: string;
  type: string;
}

export interface News {
  id: number;
  title: string;
  valid: string;
}

@Controller()
export class AppController {
  // constructor(
  //   private readonly hackingWithSwiftService: HackingWithSwiftService,
  // ) {}

  // @Get()
  // getIndex() {
  //   return this.hackingWithSwiftService.getLinksForGroupsWithAppIdPromises(
  //     'APP12345',
  //   );
  // }

  // @Get('get-links/:appId')
  // getHello(@Param() params) {
  //   return this.hackingWithSwiftService.getLinksForGroupsWithAppId(
  //     params.appId,
  //   );
  // }

  @Get('groups/APP12345')
  getNews(): Apps[] {
    return [
      {
        link: '/link-1',
        display_name: 'name1',
        type: 'type',
      },
      {
        link: '/link-2',
        display_name: 'name2',
        type: 'type',
      },
    ];
  }

  @Get('link-1')
  getNews1(): Application {
    return {
      id: '1',
      scopes: [
        {
          id: '1',
          approved: 'approved',
        },
        {
          id: '2',
          approved: 'not-approved',
        },
        {
          id: '3',
          approved: 'approved',
        },
      ],
    };
  }

  @Get('link-2')
  getNews2(): Application {
    return {
      id: '2',
      scopes: [
        {
          id: '4',
          approved: 'approved',
        },
        {
          id: '5',
          approved: 'not-approved',
        },
        {
          id: '6',
          approved: 'approved',
        },
      ],
    };
  }
}
