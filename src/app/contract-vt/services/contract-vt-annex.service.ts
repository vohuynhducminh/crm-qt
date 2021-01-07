import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment, parseObject } from 'src/environments/environment';
import { ContractVtAnnex } from '../models';

@Injectable({
    providedIn: 'root',
})
export class ContractVtAnnexService {

    constructor(private httpClient: HttpClient) { }

    getAll(): Promise<Array<ContractVtAnnex>> {
        return this.httpClient
            .get<Array<ContractVtAnnex>>(`${environment.endPoint}${environment.apiPaths.contract_vt_annex.get}`)
            .toPromise();
    }
    getById(id: string): Promise<ContractVtAnnex> {
        return this.httpClient
            .get<ContractVtAnnex>(`${environment.endPoint}${environment.apiPaths.contract_vt_annex.get}${id}`)
            .toPromise();
    }
    create(data: ContractVtAnnex): Promise<any> {
        data = parseObject(
            data,
            {
                matchFormat: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
            }
        );
        return this.httpClient
            .post<any>(`${environment.endPoint}${environment.apiPaths.contract_vt_annex.post}`, data)
            .toPromise();
    }
    update(data: ContractVtAnnex): Promise<any> {
        data = parseObject(
            data,
            {
                matchFormat: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
            }
        );
        return this.httpClient
            .put<any>(`${environment.endPoint}${environment.apiPaths.contract_vt_annex.post}`, data)
            .toPromise();
    }

    delete(id: string): Promise<any> {
        return this.httpClient
            .delete<any>(`${environment.endPoint}${environment.apiPaths.contract_vt_annex.get}${id}`)
            .toPromise();
    }

    payOff(id: string): Promise<any> {
        return this.httpClient
            .put<any>(`${environment.endPoint}${environment.apiPaths.contract_vt_annex.post}${id}/PayOff`, {})
            .toPromise();
    }

    updateDateAccept(id: String, data: any): Promise<any> {
        return this.httpClient
            .put<any>(`${environment.endPoint}${environment.apiPaths.contract_vt_annex.post}${id}/DateAccept`, data)
            .toPromise();
    }



}
