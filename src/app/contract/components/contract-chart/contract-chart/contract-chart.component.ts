import { Component, OnInit } from '@angular/core';

export class Chart {
  Label: string;
  Value: Chart[] | number;
}

@Component({
  selector: 'app-contract-chart',
  templateUrl: './contract-chart.component.html',
  styleUrls: ['./contract-chart.component.scss'],
})
export class ContractChartComponent implements OnInit {
  years = ['2017', '2018', '2019', '2020'];
  months = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];
  weeks = ['W1', 'W2', 'W3', 'W4'];
  selectedYear = '2020';
  index = 0;

  data: Chart[] = [
    {
      Label: 'Giá dịch vụ',
      Value: [],
    },
    {
      Label: 'Giá thuê',
      Value: [],
    },
    {
      Label: 'Diện tích dịch vụ',
      Value: [],
    },
    {
      Label: 'Diện tích thuê',
      Value: [],
    },
  ];

  charts = [];
  option = {
    title: {
      text: '',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: [],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [],
    },
    yAxis: {
      type: 'value',
    },
    series: [],
  };
  constructor() { }

  ngOnInit() {
    this.data.forEach((e: { Label: string, Value: Chart[] }) => {
      for (let i = 0; i < this.years.length; i++) {
        const year = { Label: this.years[i], Value: [] };
        for (let j = 0; j < this.months.length; j++) {
          const month = { Label: this.months[j], Value: [] };
          for (let k = 0; k < this.weeks.length; k++) {
            const week = { Label: this.weeks[k], Value: Math.floor(10000 + Math.random() * (100000 - 10000)) };
            month.Value.push(week);
          }
          year.Value.push(month);
        }
        e.Value.push(year);
      }
    });
    console.log(this.data);
    this.showChart(0);
  }
  showChart(index: number) {
    this.index = index;
    this.charts = [];
    if (index === 0) {
      this.showByYear();
    } else if (index === 1) {
      this.showByMonth();
    } else {
      this.showByWeek();
    }
  }

  showByYear() {
    const option = {
      title: {
        text: '',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: [],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [],
      },
      yAxis: {
        type: 'value',
      },
      series: [],
    };
    option.legend.data = this.data.map((e) => e.Label);
    option.xAxis.data = this.years.map((e) => e);
    option.series = this.data.map((e) => ({ name: e.Label, type: 'line', data: this.calculate(e.Value as Chart[]) }));
    this.charts.push(option);
  }

  showByMonth() {
    this.years.forEach((e) => {
      const option = {
        title: {
          text: '',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: [],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [],
        },
        yAxis: {
          type: 'value',
        },
        series: [],
      };
      option.title.text = e;
      option.legend.data = this.data.map((r) => r.Label);
      option.xAxis.data = this.months.map((r) => r);
      option.series = this.data.map((r) => ({ name: r.Label, type: 'line', data: this.calculate((r.Value as Chart[]).find((year) => year.Label === e).Value as Chart[]) }));
      this.charts.push(option);
    });
  }

  showByWeek() {
    this.months.forEach((e) => {
      const option = {
        title: {
          text: '',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: [],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [],
        },
        yAxis: {
          type: 'value',
        },
        series: [],
      };
      option.title.text = e;
      option.legend.data = this.data.map((r) => r.Label);
      option.xAxis.data = this.weeks.map((r) => r);
      option.series = this.data.map((r) => ({ name: r.Label, type: 'line', data: this.calculate(((r.Value as Chart[]).find((year) => year.Label === this.selectedYear).Value as Chart[]).find((month) => month.Label === e).Value as Chart[]) }));
      this.charts.push(option);
    });
  }

  calculate(data: Chart[]): number[] {
    return data.map((e) => {
      if (typeof e.Value === 'number') {
        return e.Value as number;
      } else {
        let result = 0;
        const models = this.calculate(e.Value as Chart[]);
        models.forEach((model) => {
          result += model;
        });
        return result;
      }
    });
  }
}
