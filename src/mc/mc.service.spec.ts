import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { MCService } from './mc.service';
import { GroupResponse } from './models/group.response';
import { Application } from './models/link.response';

jest.mock('axios');

describe('MCService', () => {
  let service: MCService;
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MCService],
    }).compile();

    service = module.get<MCService>(MCService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('should return a 400', async () => {
  //   httpService.axiosRef.mockRejectedValueOnce({
  //     data: 'Request failed with status code 404',
  //   });

  //   try {
  //     await service.getValidAppsWithAppId('');
  //   } catch (error) {
  //     console.log('Error:', error);
  //   }
  // });

  it('should return a valid list of applications', async () => {
    const appId = 'appId';

    const groups: GroupResponse[] = [
      { link: '/link1', display_name: '', type: '' },
      { link: '/link2', display_name: '', type: '' },
    ];

    const firstApp: Application = {
      id: '1',
      scopes: [
        { id: '1', approved: 'approved' },
        { id: '2', approved: 'not-approved' },
        { id: '3', approved: 'approved' },
      ],
    };

    const secondApp: Application = {
      id: '2',
      scopes: [
        { id: '4', approved: 'not-approved' },
        { id: '5', approved: 'approved' },
      ],
    };

    mockedAxios.get.mockResolvedValueOnce({ data: groups });
    mockedAxios.get.mockResolvedValueOnce({ data: firstApp });
    mockedAxios.get.mockResolvedValueOnce({ data: secondApp });

    const actualApps = await service.getValidAppsWithAppId(appId);

    const expectedApps: Application[] = [
      {
        id: '1',
        scopes: [
          { id: '1', approved: 'approved' },
          { id: '3', approved: 'approved' },
        ],
      },
      {
        id: '2',
        scopes: [{ id: '5', approved: 'approved' }],
      },
    ];

    expect(actualApps).toEqual(expectedApps);
  });

  it('it should return error when invalid App ID', async () => {
    const appId = 'INVALID_APP_ID';
    const expectedErrorMessage = `AppID (${appId}) was invalid`;
    mockedAxios.get.mockResolvedValueOnce({ data: [] });
    await expect(service.getValidAppsWithAppId(appId)).rejects.toThrow(
      expectedErrorMessage,
    );
  });

  // it('should test the whole thing', () => {
  //   const mockAppId = 'appId';

  //   const mockGroupsResponse = {
  //     data: [{ link: '/link-1' }, { link: '/link-2' }],
  //   };

  //   const mockLinksFirstReponse = {
  //     data: [
  //       { id: 1, title: 'title1', valid: 'valid' },
  //       { id: 2, title: 'title2', valid: 'invalid' },
  //       { id: 3, title: 'title3', valid: 'valid' },
  //     ],
  //   };

  //   const mockLinksSecondReponse = {
  //     data: [
  //       { id: 4, title: 'title4', valid: 'invalid' },
  //       { id: 5, title: 'title5', valid: 'valid' },
  //     ],
  //   };

  //   mockHttpService.get.mockReturnValueOnce(of(mockGroupsResponse));
  //   mockHttpService.get.mockReturnValueOnce(of(mockLinksFirstReponse));
  //   mockHttpService.get.mockReturnValueOnce(of(mockLinksSecondReponse));

  //   service.getLinksForGroupsWithAppId(mockAppId).subscribe((res) => {
  //     expect(res).toEqual([
  //       [
  //         { id: 1, title: 'title1', valid: 'valid' },
  //         { id: 3, title: 'title3', valid: 'valid' },
  //       ],
  //       [{ id: 5, title: 'title5', valid: 'valid' }],
  //     ]);
  //   });
  // });

  // it('should return an array of LinkResponse arrays', async () => {
  //   const appId = 'myAppId';
  //   const mockGroupLinks = ['/group1', '/group2'];
  //   const mockLinkResponse1 = [{ id: 1, title: 'Link 1', valid: 'valid' }];
  //   const mockLinkResponse2 = [{ id: 2, title: 'Link 2', valid: 'valid' }];

  //   mockHttpService.get
  //     .mockReturnValueOnce(of({ data: mockGroupLinks }))
  //     .mockReturnValueOnce(of({ data: mockLinkResponse1 }))
  //     .mockReturnValueOnce(of({ data: mockLinkResponse2 }));

  //   const result = await firstValueFrom(
  //     service.getLinksForGroupsWithAppId(appId),
  //   );

  //   expect(result).toEqual([mockLinkResponse1, mockLinkResponse2]);

  //   expect(mockHttpService.get).toHaveBeenCalledWith(
  //     'http://localhost:3000/groups/MYAPPID',
  //   );
  // });
});
