// import { Test, TestingModule } from '@nestjs/testing';
// import { MCController } from './mc.controller';
// import { MCService } from './mc.service';
// import { LinkResponse } from './models/link.response';

// describe('MCController', () => {
//   let controller: MCController;

//   const mockValidApps: LinkResponse[][] = [
//     [
//       { id: 1, title: 'title-1', valid: 'valid' },
//       { id: 2, title: 'title-2', valid: 'valid' },
//     ],
//     [{ id: 3, title: 'title-3', valid: 'valid' }],
//     [{ id: 4, title: 'title-4', valid: 'valid' }],
//   ];

//   const mockMcService = {
//     getLinksForGroupsWithAppId: jest.fn(() => mockValidApps),
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [MCController],
//       providers: [
//         {
//           provide: MCService,
//           useValue: mockMcService,
//         },
//       ],
//     }).compile();

//     controller = module.get<MCController>(MCController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });

//   it('should return a list of valid apps', () => {
//     expect(controller.getLinksForGroupsWithAppId(expect.any(String))).toEqual(
//       mockValidApps,
//     );
//   });
// });
