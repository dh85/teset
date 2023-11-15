import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GroupResponse } from './models/group.response';
import { Application } from './models/link.response';

@Injectable()
export class MCService {
  async getValidAppsWithAppId(appId: string) {
    const links = await this.getGroupsForAppId(appId);
    return await this.getGroupsForLinks(links);
  }

  private async getGroupsForAppId(appId: string) {
    const { data } = await axios.get<GroupResponse[]>(
      `http://localhost:3000/groups/${appId.toUpperCase()}`,
    );
    if (data.length === 0) throw new Error(`AppID (${appId}) was invalid`);
    return data;
  }

  private async getGroupsForLinks(groups: GroupResponse[]) {
    return await Promise.all(
      groups.map(async (group) => this.getAppForLink(group.link)),
    );
  }

  private async getAppForLink(link: string) {
    const { data } = await axios.get<Application>(
      `http://localhost:3000${link}`,
    );
    data.scopes = data.scopes.filter((scope) => scope.approved === 'approved');
    return data;
  }
}

// getLinksForGroupsWithAppId(appId: string): Observable<Application[][]> {
//   return this.getAppGroupsWithAppId(appId).pipe(
//     map((linksArray) => linksArray.map((link) => this.getLinks(link))),
//     concatMap((arrayOfObservables) => forkJoin(arrayOfObservables)),
//     catchError((error) => {
//       console.error('An error occurred:', error.response.data);
//       throw 'An error happened!';
//     }),
//   );
// }

// private getLinks(link: string): Observable<Application[]> {
//   return this.httpService
//     .get(`http://localhost:3000${link}`)
//     .pipe(map((res) => res.data.filter((app) => app.valid === 'valid')));
// }

// private getAppGroupsWithAppId(appId: string): Observable<string[]> {
//   return this.httpService
//     .get(`http://localhost:3000/groups/${appId.toUpperCase()}`)
//     .pipe(map((res) => res.data.map((group) => group.link)));
// }
// // private async getAppForLink(link: string): Promise<LinkResponse[]> {
// //   return this.httpService.axiosRef
// //     .get(`http://localhost:3000${link}`)
// //     .then((response) => response.data.filter((app) => app.valid == 'valid'));
// // }

// private async getAppGroupsLinksPromise(appId: string): Promise<string[]> {
//   return this.httpService.axiosRef
//     .get(`http://localhost:3000/groups/${appId.toUpperCase()}`)
//     .then((res) => res.data.map((group) => group.link));
// }

// return this.getAppGroupsWithAppId(appId).pipe(
//   concatMap((links) => from(links)),
//   mergeMap((link) => this.getLinks(link)),
//   // mergeAll(),
//   toArray(),
//   tap((data) => console.log(data)),
// );

// async getLinksForGroupsWithAppIdPromises(appId: string) {
//   const links = await this.getAppGroupsLinksPromise(appId);
//   return await Promise.all(
//     links.map(async (link) => {
//       return this.getAppForLink(link);
//     }),
//   );
// }
