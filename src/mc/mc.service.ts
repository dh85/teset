import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { Observable, catchError, concatMap, forkJoin, map } from 'rxjs';
import { LinkResponse } from './models/link.response';

@Injectable()
export class MCService {
  constructor(private httpService: HttpService) {}

  getLinksForGroupsWithAppId(appId: string): Observable<LinkResponse[][]> {
    return this.getAppGroupsWithAppId(appId).pipe(
      map((linksArray) => linksArray.map((link) => this.getLinks(link))),
      concatMap((arrayOfObservables) => forkJoin(arrayOfObservables)),
      catchError((error: AxiosError) => {
        console.log('Got an error up in here!', error.response.data);
        throw 'An error happened!';
      }),
    );
  }

  private getLinks(link: string): Observable<LinkResponse[]> {
    return this.httpService
      .get(`http://localhost:3000${link}`)
      .pipe(map((res) => res.data.filter((app) => app.valid == 'valid')));
  }

  private getAppGroupsWithAppId(appId: string): Observable<string[]> {
    return this.httpService
      .get(`http://localhost:3000/groups/${appId.toUpperCase()}`)
      .pipe(map((res) => res.data.map((group) => group.link)));
  }
}

// async getValidAppsWithAppId(appId: string) {
//   const links = await this.getGroupsForAppId(appId);
//   const validApps = await this.getGroupsForLinks(links);
//   return validApps;
// }

// private async getGroupsForAppId(appId: string) {
//   const { data } = await this.httpService.axiosRef({
//     url: `http://localhost:3000/groups/${appId.toUpperCase()}`,
//     method: 'GET',
//   });
//   return [data].map((group) => group.link);
// }

// private async getGroupsForLinks(links: string[]) {
//   return await Promise.all(
//     links.map(async (link) => {
//       return this.getAppForLink(link);
//     }),
//   );
// }

// private async getAppForLink(link: string) {
//   const { data } = await this.httpService.axiosRef.get<LinkResponse[]>(
//     `http://localhost:3000${link}`,
//   );
//   return data.filter((app) => app.valid === 'valid');
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
