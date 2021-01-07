import { Component, OnInit } from '@angular/core';
import { StatisticalVt } from '../../models/statistical-vt.model';

@Component({
  selector: 'app-list-statistical-vt',
  templateUrl: './list-statistical-vt.component.html',
  styleUrls: ['./list-statistical-vt.component.scss'],
})
export class ListStatisticalVtComponent implements OnInit {
  data: StatisticalVt[] = [
    {
      Id: '1',
      Content: 'B. Trung tâm Viễn thông',
      RegistrationCount: 160265025815,
      PerformCount: 133603631466,
      Rate: 83,
    },
    {
      Id: '2',
      Content: 'I. Dịch vụ viễn thông',
      RegistrationCount: 160265025815,
      PerformCount: 133603631466,
      Rate: 83,
    },
    {
      Id: '3',
      Content: '1. Internet',
      RegistrationCount: 160265025815,
      PerformCount: 133603631466,
      Rate: 83,
    },
    {
      Id: '4',
      Content: '1.1. DV QTSC LLoe   I.1',
      RegistrationCount: 160265025815,
      PerformCount: 133603631466,
      Rate: 83,
    },
    {
      Id: '5',
      Content: '1.2. DV QTSC BE  I.2',
      RegistrationCount: 160265025815,
      PerformCount: 133603631466,
      Rate: 83,
    },
    {
      Id: '6',
      Content: '1.3. DV hạ tầng mạng (Thuê cáp, thiết bị)  I.5',
      RegistrationCount: 160265025815,
      PerformCount: 133603631466,
      Rate: 83,
    },
    {
      Id: '7',
      Content: '1.4. Internet/ Metronet ngoại khu I.2',
      RegistrationCount: 160265025815,
      PerformCount: 133603631466,
      Rate: 83,
    },
    {
      Id: '8',
      Content: '2. Datacenter',
      RegistrationCount: 160265025815,
      PerformCount: 133603631466,
      Rate: 83,
    },
    {
      Id: '9',
      Content: '2.1. DV Cloud III.1,2,3',
      RegistrationCount: 160265025815,
      PerformCount: 133603631466,
      Rate: 83,
    },
    {
      Id: '10',
      Content: '2.3. Co-location (máy chủ ) II.1',
      RegistrationCount: 160265025815,
      PerformCount: 133603631466,
      Rate: 83,
    },
    {
      Id: '11',
      Content: '2.4. Thuê rack (12 rack) II.2,3',
      RegistrationCount: 160265025815,
      PerformCount: 133603631466,
      Rate: 83,
    },
    {
      Id: '12',
      Content: '3. DV Khác',
      RegistrationCount: 160265025815,
      PerformCount: 133603631466,
      Rate: 83,
    },
    {
      Id: '13',
      Content: '3.1. Hoa hồng hợp tác V.1',
      RegistrationCount: 160265025815,
      PerformCount: 133603631466,
      Rate: 83,
    },
    {
      Id: '14',
      Content: '3.2. Hoa hồng phần mềm V.2',
      RegistrationCount: 160265025815,
      PerformCount: 133603631466,
      Rate: 83,
    },
    {
      Id: '15',
      Content: 'II. Doanh thu dự án',
      RegistrationCount: 160265025815,
      PerformCount: 133603631466,
      Rate: 83,
    },
    {
      Id: '16',
      Content: 'A. Nguồn ngân sách tập trung',
      RegistrationCount: 160265025815,
      PerformCount: 133603631466,
      Rate: 83,
    },
    {
      Id: '17',
      Content: 'B. Nguồn ngân sách đơn vị',
      RegistrationCount: 160265025815,
      PerformCount: 133603631466,
      Rate: 83,
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
