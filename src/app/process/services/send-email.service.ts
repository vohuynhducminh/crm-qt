import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SendEmailService {

  constructor(private httpClient: HttpClient) { }

  sendMail(formData: FormData): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data');
    return this.httpClient.post(
      `${environment.endPoint}${environment.apiPaths.mail.post}`,
      formData,
      { headers: headers }
    ).toPromise();
  }
}
