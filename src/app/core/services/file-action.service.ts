import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FileActionService {

  constructor(private httpClient: HttpClient) { }

  downloadFile(url: string): Promise<any> {
    return this.httpClient.get(
      url,
      {
        responseType: 'blob',
      }
    ).toPromise();
  }

  deleteFile(url: string): Promise<any> {
    return this.httpClient.delete(
      url
    ).toPromise();
  }
}
