import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { isArray, isObject, isDate } from 'util';

@Injectable({
  providedIn: 'root',
})
export class UltilService {

  constructor() { }

  getData(data): any {
    return this.getDate(data);
  }
  getObject(data: any): any {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        data[key] = this.getDate(data[key]);
      }
    }
    return data;
  }

  getDate(data: any): any {
    if ((new Date(data) + '') === 'Invalid Date') {
      if (isArray(data)) {
        return this.getArray(data);
      } else if (isObject(data)) {
        return this.getObject(data);
      } else {
        return data;
      }
    } else {
      if (isDate(data)) {
        return formatDate(data, 'yyyy-MM-dd', 'en-US', 'Asia/Ho_Chi_Minh');
      } else {
        return data;
      }
    }
  }

  getArray(data: any[]): any {
    for (let index = 0; index < data.length; index++) {
      data[index] = this.getDate(data[index]);
    }
    return data;
  }
}
