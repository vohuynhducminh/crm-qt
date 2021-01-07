import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EventLog, EventLogFile } from '../models/event-log';

@Injectable({
  providedIn: 'root',
})
export class EventLogFileService {

  constructor(private httpClient: HttpClient) { }

  getEventLogFilesByEventLogId(eventLog: EventLog): Promise<EventLogFile[]> {
    return this.httpClient.get<EventLogFile[]>(
      `${environment.endPoint}${environment.apiPaths.eventLogFile.get}${environment.apiPaths.eventLogFile.getByEventLogId}${eventLog.Id}`
    ).toPromise();
  }
}
