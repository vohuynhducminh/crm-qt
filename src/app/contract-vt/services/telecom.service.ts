import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TelecomServiceModel } from '../models/';

@Injectable({
    providedIn: 'root',
})
export class TelecomService {

    constructor(private httpClient: HttpClient) { }

    getAll(): Promise<Array<TelecomServiceModel>> {
        return this.httpClient
            .get<Array<TelecomServiceModel>>(`${environment.endPoint}${environment.apiPaths.telecom_service.post}?type=0`)
            .toPromise();
    }
    getById(id: String): Promise<TelecomServiceModel> {
        return this.httpClient
            .get<TelecomServiceModel>(`${environment.endPoint}${environment.apiPaths.telecom_service.get}${id}`)
            .toPromise();
    }
    getParameterById(id: String): Promise<any> {
        return this.httpClient
            .get<TelecomServiceModel>(`${environment.endPoint}${environment.apiPaths.telecom_service.get}${id}/Parameter`)
            .toPromise();
    }
}
