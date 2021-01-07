import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EventLog, EventLogCM, EventLogUM } from '../models/event-log';

@Injectable({
  providedIn: 'root',
})
export class EventLogService {

  constructor(private httpClient: HttpClient) { }

  getEventLogByCustomerWorkFlowId(workFlowHistoryId: string): Promise<EventLog[]> {
    return this.httpClient.get<EventLog[]>(
      `${environment.endPoint}${environment.apiPaths.eventLog.get}${environment.apiPaths.eventLog.getByWorkFlowHistoryId}${workFlowHistoryId}`
    ).toPromise();
  }

  getEventLogById(id: string): Promise<any> {
    return this.httpClient.get(
      `${environment.endPoint}${environment.apiPaths.eventLog.get}${id}`
    ).toPromise();
  }

  createEventLog(eventLogCM: EventLogCM): Promise<any> {
    return this.httpClient.post(
      `${environment.endPoint}${environment.apiPaths.eventLog.post}`,
      eventLogCM
    ).toPromise();
  }

  updateEventLog(eventLogUM: EventLogUM): Promise<any> {
    return this.httpClient.put(
      `${environment.endPoint}${environment.apiPaths.eventLog.put}`,
      eventLogUM
    ).toPromise();
  }

  removeEventLog(eventLog: EventLog): Promise<any> {
    return this.httpClient.delete(
      `${environment.endPoint}${environment.apiPaths.eventLog.delete}${eventLog.Id}`
    ).toPromise();
  }
}
