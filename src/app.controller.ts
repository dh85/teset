import { Controller, Get } from '@nestjs/common';

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
  getNews1(): News[] {
    return [
      {
        id: 1,
        title: 'News 1',
        valid: 'valid',
      },
      {
        id: 2,
        title: 'News 2',
        valid: 'invalid',
      },
      {
        id: 3,
        title: 'News 3',
        valid: 'valid',
      },
    ];
  }

  @Get('link-2')
  getNews2(): News[] {
    return [
      {
        id: 4,
        title: 'News 4',
        valid: 'valid',
      },
      {
        id: 5,
        title: 'News 5',
        valid: 'valid',
      },
      {
        id: 6,
        title: 'News 6',
        valid: 'invalid',
      },
      {
        id: 7,
        title: 'News 7',
        valid: 'invalid',
      },
    ];
  }
}
