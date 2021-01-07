import { Injectable, EventEmitter } from '@angular/core';
import { AuthGuardService } from './auth-guard.service';
import { Token } from 'src/app/authorize/models/token';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {

  isLogin: boolean;
  userName: string;
  requestEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private authGuardService: AuthGuardService,
    private httpClient: HttpClient
  ) {
    const token: Token = this.authGuardService.getToken();
    this.isLogin = token ? true : false;
    this.userName = this.authGuardService.getUserName();
  }

  parseObject(
    object: any,
    formatObject?: { matchFormat?: string, changeFormat?: string }
  ) {
    let finalData: any;
    if (typeof object === 'string') {
      finalData = object.trim();
      if (object.indexOf('data:image') !== -1) {
        finalData = object.split(',')[1];
      }
    } else {
      finalData = Object.assign({}, object);
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          if (object[key] instanceof Array) {
            finalData[key] = this.parseArray(object[key]);
          } else if (object[key] instanceof Date) {
            console.log(finalData);
            finalData[key] = moment(object[key])
              .format(
                formatObject.changeFormat ?
                formatObject.changeFormat :
                'YYYY-MM-DDTHH:mm:ss.SSSZ'
              );
          } else if (object[key] instanceof Object) {
            finalData[key] = this.parseObject(object[key]);
          } else if (typeof object[key] === 'string') {
            if (
              formatObject
              && moment(object[key], formatObject.matchFormat, true).isValid()
            ) {
              finalData[key] = moment(object[key])
                .format(
                  formatObject && formatObject.changeFormat ?
                  formatObject.changeFormat :
                  'YYYY-MM-DDTHH:mm:ss.SSSZ'
                );
            } else {
              finalData[key] = this.parseObject(object[key]);
            }
          }
        }
      }
    }
    return finalData;
  }

  parseArray(bigArray: Array<any>) {
    const finalData = Object.assign([], bigArray);
    for (let i = 0; i < bigArray.length; i++) {
      if (typeof bigArray[i] === 'object') {
        finalData[i] = this.parseObject(bigArray[i]);
      }
      if (typeof bigArray[i] === 'string') {
        finalData[i] = bigArray[i].trim();
        if (bigArray[i].indexOf('data:image') !== -1) {
          finalData[i] = bigArray[i].split(',')[1];
        }
      }
    }
    return finalData;
  }

  parseObjectToJson(
    object: any
  ) {
    let finalData: any;
    if (typeof object === 'string') {
      finalData = object.trim();
      if (object.indexOf('data:image') !== -1) {
        finalData = object.split(',')[1];
      }
    } else {
      finalData = Object.assign({}, object);
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          if (object[key] instanceof Array) {
            finalData[key] = this.parseArray(object[key]);
          } else if (object[key] instanceof Date) {
            finalData[key] = moment(object[key])
              .format(
                'YYYY-MM-DDTHH:mm:ss.SSSZ'
              );
          } else if (object[key] instanceof Object) {
            finalData[key] = this.parseObject(object[key]);
          } else if (typeof object[key] === 'string') {
            finalData[key] = this.parseObject(object[key]);
          }
        }
      }
    }
    return finalData;
  }

  updatePermissions(): Promise<any> {
    return this.httpClient.put(
      `${environment.endPoint}${environment.apiPaths.accounts.put}${environment.apiPaths.accounts.permissions}`,
      null
    ).toPromise();
  }
}
