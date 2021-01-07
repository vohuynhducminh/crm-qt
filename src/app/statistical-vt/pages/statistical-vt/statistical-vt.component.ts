import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistical-vt',
  templateUrl: './statistical-vt.component.html',
  styleUrls: ['./statistical-vt.component.scss'],
})
export class StatisticalVtComponent implements OnInit {
  serviceVtChart: any;
  budgetChart: any;
  sideChart: any;
  increaseRateChart: any;
  increaseRateOutSideChart: any;
  constructor() { }

  ngOnInit() {
    this.serviceVtChart = {
      title: {
        x: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        x: 'center',
        y: 'bottom',
        data: [
          'LLoE',
          'Internet/Metronet ngoại khu',
          'Thuê rack (12 rack)',
          'Nguồn ngân sách tập trung',
          'QTSC BE',
          'Cloud',
          'Hoa hồng đường truyền',
          'Nguồn ngân sách đơn vị',
          'Cáp',
          'Co-location (Máy chủ)',
          'Hoa hồng phần mềm',
        ],
      },
      calculable: true,
      series: [
        {
          name: 'Tỉ lệ',
          selectedMode: 'single',
          type: 'pie',
          radius: 100,
          data: [
            { name: 'LLoE', value: 19 },
            { name: 'Internet/Metronet ngoại khu', value: 0 },
            { name: 'Thuê rack (12 rack)', value: 13 },
            { name: 'Nguồn ngân sách tập trung', value: 47 },
            { name: 'QTSC BE', value: 6 },
            { name: 'Cloud', value: 1 },
            { name: 'Hoa hồng đường truyền', value: 1 },
            { name: 'Nguồn ngân sách đơn vị', value: 4 },
            { name: 'Cáp', value: 2 },
            { name: 'Co-location (Máy chủ)', value: 6 },
            { name: 'Hoa hồng phần mềm', value: 1 },
          ],
        },
      ],
    };
    this.budgetChart = {
      title: {
        x: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        x: 'center',
        y: 'bottom',
        data: [
          'Doanh số doanh nghiệp',
          'Ngân sách tập trung',
          'Ngân sách đơn vị',
        ],
      },
      calculable: true,
      series: [
        {
          name: 'Tỉ lệ',
          selectedMode: 'single',
          type: 'pie',
          radius: 100,
          data: [
            { name: 'Doanh số doanh nghiệp', value: 40 },
            { name: 'Ngân sách tập trung', value: 47 },
            { name: 'Ngân sách đơn vị', value: 13 },
          ],
        },
      ],
    };
    this.sideChart = {
      title: {
        x: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        x: 'center',
        y: 'bottom',
        data: [
          'Doanh số bên trong công viên',
          'Doanh số bên ngoài công viên',
        ],
      },
      calculable: true,
      series: [
        {
          name: 'Tỉ lệ',
          selectedMode: 'single',
          type: 'pie',
          radius: 100,
          data: [
            { name: 'Doanh số bên trong công viên', value: 30 },
            { name: 'Doanh số bên ngoài công viên', value: 70 },
          ],
        },
      ],
    };
    this.increaseRateChart = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: ['DS 2016', 'DS 2017', 'DS 2018', 'DS 2019'],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: 'Tỷ lệ',
          type: 'bar',
          barWidth: '60%',
          data: [101422380476, 118047635301, 126116498585,  133603631466],
        },
      ],
    };
    this.increaseRateOutSideChart = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: ['DS 2016', 'DS 2017', 'DS 2018', 'DS 2019'],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: 'Tỷ lệ',
          type: 'bar',
          barWidth: '60%',
          data: [101422380476, 118047635301, 126116498585,  133603631466],
        },
      ],
    };
  }

}
