import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { firstValueFrom, of } from 'rxjs';
import { MCService } from './mc.service';

describe('MCService', () => {
  let service: MCService;
  const mockHttpService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MCService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<MCService>(MCService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should test the whole thing', () => {
    const mockAppId = 'appId';

    const mockGroupsResponse = {
      data: [{ link: '/link-1' }, { link: '/link-2' }],
    };

    const mockLinksFirstReponse = {
      data: [
        { id: 1, title: 'title1', valid: 'valid' },
        { id: 2, title: 'title2', valid: 'invalid' },
        { id: 3, title: 'title3', valid: 'valid' },
      ],
    };

    const mockLinksSecondReponse = {
      data: [
        { id: 4, title: 'title4', valid: 'invalid' },
        { id: 5, title: 'title5', valid: 'valid' },
      ],
    };

    mockHttpService.get.mockReturnValueOnce(of(mockGroupsResponse));
    mockHttpService.get.mockReturnValueOnce(of(mockLinksFirstReponse));
    mockHttpService.get.mockReturnValueOnce(of(mockLinksSecondReponse));

    service.getLinksForGroupsWithAppId(mockAppId).subscribe((res) => {
      expect(res).toEqual([
        [
          { id: 1, title: 'title1', valid: 'valid' },
          { id: 3, title: 'title3', valid: 'valid' },
        ],
        [{ id: 5, title: 'title5', valid: 'valid' }],
      ]);
    });
  });

  it('should return an array of LinkResponse arrays', async () => {
    const appId = 'myAppId';
    const mockGroupLinks = ['/group1', '/group2'];
    const mockLinkResponse1 = [{ id: 1, title: 'Link 1', valid: 'valid' }];
    const mockLinkResponse2 = [{ id: 2, title: 'Link 2', valid: 'valid' }];

    mockHttpService.get
      .mockReturnValueOnce(of({ data: mockGroupLinks }))
      .mockReturnValueOnce(of({ data: mockLinkResponse1 }))
      .mockReturnValueOnce(of({ data: mockLinkResponse2 }));

    const result = await firstValueFrom(
      service.getLinksForGroupsWithAppId(appId),
    );

    expect(result).toEqual([mockLinkResponse1, mockLinkResponse2]);
    expect(mockHttpService.get).toHaveBeenCalledTimes(3);

    expect(mockHttpService.get).toHaveBeenCalledWith(
      'http://localhost:3000/groups/MYAPPID',
    );
  });
});
