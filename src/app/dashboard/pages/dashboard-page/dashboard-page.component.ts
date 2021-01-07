import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { StatisticService } from '../../services/statistic.service';
import { CustomerType, MarketType } from '../../models/customer-type';
import { DashboardService } from '../../services/dashboard.service';
import {
  TotalInvestor,
  ObjectType,
  Contract,
  ParticipantsInMonth,
  TopRevenue,
  TotalSoftware,
  TotalInsideOutsideSoftware,
  GetCompleteRate,
  TreeTabelModel,
  BuildingInventory,
  CompanyStatisticsInQTSCModel,
  CalculateRevenueStatisticsModel,
  TopIncome
} from '../../models/dashboard';
import { AuthGuardService } from '../../../core/services/auth-guard.service';


@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  providers: [DecimalPipe],
})
export class DashboardPageComponent implements OnInit {
  barChartOptions: any;
  barChartOptionsShow = false;
  pieCustomerChartOptions: any;
  pieCustomerChartOptionsShow = false;
  pieMarketChartOptions: any;
  pieMarketChartOptionsShow = false;
  pieITCompanyOptions: any;
  pieITCompanyOptionsShow = false;
  pieDeputyChartOptions: any;
  pieDeputyChartOptionsShow = false;

  customerTypeStatistic: CustomerType[] = [];
  customerTypeStatisticShow = false;
  marketTypeStatistic: MarketType[] = [];
  marketTypeStatisticShow = false;
  totalSoftwarePie: TotalInsideOutsideSoftware[] = [];
  totalSoftwarePieShow = false;
  topRevenueDashboard: TopRevenue = new TopRevenue();
  topRevenueDashboardShow = false;
  topIncomeDashboard: TopIncome = new TopIncome();
  topIncomeDashboardShow = false;
  objectTypeDashboard: ObjectType[] = [];
  objectTypeDashboardShow = false;
  participantsInMonth: ParticipantsInMonth;
  participantsInMonthShow = false;
  contractExpire: Contract[] = [];
  contractExpireShow = false;
  contractAdjustment: Contract[] = [];
  contractAdjustmentShow = false;
  contractLiquidated: Contract[] = [];
  contractLiquidatedShow = false;
  totalInvestorPie: TotalInvestor[] = [];
  totalInvestorPieShow = false;
  buildingInventory: BuildingInventory[] = [];
  buildingInventoryShow = false;
  TotalInvestorChart: any;
  TotalInvestorChartShow = false;
  TotalSoftwareChart: any;
  TotalSoftwareChartShow = false;
  TotalPeopleChart: any;
  TotalPeopleChartShow = false;
  VondautuInvestorChart: any;
  VondautuInvestorChartShow = false;
  VondautuSoftwareChart: any;
  VondautuSoftwareChartShow = false;

  proportionOfParentTelecommunicationRevenue: any;
  proportionOfParentTelecommunicationRevenueShow = false;
  proportionOfTelecommunicationRevenueInsideOutsideChart: any;
  proportionOfTelecommunicationRevenueInsideOutsideChartShow = false;
  proportionOfTelecommunicationRevenue: any;
  proportionOfTelecommunicationRevenueShow = false;
  increaseRateChart: any;
  increaseRateChartShow = false;
  increaseRateOutSideChart: any;
  increaseRateOutSideChartShow = false;
  companyStatisticsInQTSC: any;
  companyStatisticsInQTSCShow = false;
  getCompleteRate: Array<TreeTabelModel> = [];
  getCompleteRateShow = false;

  cvpmqt = false;
  vpct = false;
  dvvt = false;
  constructor(
    private statisticService: StatisticService,
    private dashboardService: DashboardService,
    private decimalPipe: DecimalPipe,
    private authService: AuthGuardService
  ) {
    this.cvpmqt = this.authService.checkAccess(['dashboard', 'cvpmqt', 'show']);
    this.vpct = this.authService.checkAccess(['dashboard', 'vpct', 'show']);
    this.dvvt = this.authService.checkAccess(['dashboard', 'dvvt', 'show']);
  }


  async ngOnInit() {
    this.getCalculateRevenueStatistics();
    this.getVondautuInvestorChart();
    this.getVondautuSoftwareChart();
    this.getTotalInvestorChart();
    this.getTotalSoftwareChart();
    this.getTotalPeopleChart();
    this.getCustomerTypeStatistic();
    this.getMarketTypeStatistic();
    this.getITCompanyPie();
    this.getDeputyPie();
    this.getCompanyStatisticsInQTSC();    
    this.getTopRevenue();
    this.getTopIcome();
    this.getParticipantsInMonth();
    this.getContractExpire();
    this.getContractAdjustment();
    this.getContractLiquidated();
    this.getBuildingInventory();

    this.getProportionOfTelecommunicationRevenueInsideOutsideChart();
    this.getProportionOfParentTelecommunicationRevenueChart();
    this.getProportionOfTelecommunicationRevenueChart();
    this.getGetCompleteRate();
    this.getIncreaseRateChart();
    this.getIncreaseOutsideRateChart();
  }
  formatter = (value: string): string => {
    value = this.decimalPipe.transform(parseInt(value, 0), '1.0-0');
    return value && value.includes(',') ? value.split(',').join('.') : value;
  }
  getCalculateRevenueStatistics() {
    this.dashboardService.getCalculateRevenueStatistics().then(
      (response: CalculateRevenueStatisticsModel) => {
        this.barChartOptions = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
            formatter: (params) => {
              params.forEach(e => {
                e.value = this.decimalPipe.transform(e.value, '1.0-0');
                if (e.value.includes(',')) {
                  e.value.split(',').join('.');
                }
              });
              return `
                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#c23531;"></span>${params[0].seriesName + ' : ' + params[0].value}<br>
                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#2f4554;"></span>${params[1].seriesName + ' : ' + params[1].value}<br>
                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#61a0a8;"></span>${params[2].seriesName + ' : ' + params[2].value}<br>
                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#d48265;"></span>${params[3].seriesName + ' : ' + params[3].value}<br>
              `;
            },
          },
          legend: {
            data: [
              'Văn phòng cho thuê tại CV PMQT',
              'Điện nước',
              'DV tiện ích',
              'DV hạ tầng',
            ],
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              data: [
                'T1',
                'T2',
                'T3',
                'T4',
                'T5',
                'T6',
                'T7',
                'T8',
                'T9',
                'T10',
                'T11',
                'T12',
              ],
            },
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                formatter: (data) => {
                  return this.decimalPipe.transform(data, '1.0-0').split(',').join('.');
                },
              },
            },
          ],
          series: [
            {
              name: 'Văn phòng cho thuê tại CV PMQT',
              type: 'bar',
              stack: '总量',
              itemStyle: { normal: { label: { show: false } } },
              data: response.revenue,
            },
            {
              name: 'Điện nước',
              type: 'bar',
              stack: '总量',
              itemStyle: { normal: { label: { show: false } } },
              data: response.electricityWater,
            },
            {
              name: 'DV tiện ích',
              type: 'bar',
              stack: '总量',
              itemStyle: { normal: { label: { show: false } } },
              data: response.squareUtilities,
            },
            {
              name: 'DV hạ tầng',
              type: 'bar',
              stack: '总量',
              itemStyle: { normal: { label: { show: false } } },
              data: response.squareInfrastructure,
            },
          ],
        };
        this.barChartOptionsShow = true;
      },
      (error) => console.error(error)
    );
  }
  getCustomerTypeStatistic() {
    this.dashboardService.getObjectType().then(
      (response: ObjectType[]) => {
        this.objectTypeDashboard = response;
        const objectTypes = this.objectTypeDashboard
          .filter((e) => e.MarketType)
          .map((e) => e.MarketType);
        const objectTypesData = this.objectTypeDashboard
          .filter((e) => e.MarketType)
          .map((e) => ({
            name: e.MarketType,
            value: e.Total === 0 ? '-' : e.Total,
          }));
        this.pieCustomerChartOptions = {
          title: {
            x: 'center',
          },
          tooltip: {
            trigger: 'item',
            formatter: (params) => {
              params.value = this.decimalPipe.transform(params.value, '1.0-0').split(',').join('.');
              return (
                params.seriesName + ' - ' + params.name + ' : ' + params.value + ' (' + params.percent + '%)'
              );
            },
          },
          legend: {
            x: 'center',
            y: 'bottom',
            data: objectTypes,
          },
          calculable: true,
          series: [
            {
              name: 'Nhóm',
              selectedMode: 'single',
              type: 'pie',
              radius: 100,
              data: objectTypesData,
            },
          ],
          color: ['#2b3d4f', '#4190de', '#ca8622', '#d48265', '#91c7ae'],
        };
        this.objectTypeDashboardShow = true;
        this.pieCustomerChartOptionsShow = true;
      },
      (error) => console.error(error)
    );
  }
  getMarketTypeStatistic() {
    this.statisticService.getMarketTypeDashboard().then(
      (response: MarketType[]) => {
        this.marketTypeStatistic = response;
        const marketTypes = this.marketTypeStatistic
          .filter((e) => e.MarketType)
          .map((e) => e.MarketType);
        const marketTypesData = this.marketTypeStatistic
          .filter((e) => e.MarketType)
          .map((e) => ({
            value: e.Total === 0 ? '-' : e.Total,
            name: e.MarketType,
          }));

        this.pieMarketChartOptions = {
          title: {
            x: 'center',
          },
          tooltip: {
            trigger: 'item',
            formatter: (params) => {
              params.value = this.decimalPipe.transform(params.value, '1.0-0').split(',').join('.');
              return (
                params.seriesName + ' - ' + params.name + ' : ' + params.value + ' (' + params.percent + '%)'
              );
            },
          },
          legend: {
            x: 'center',
            y: 'bottom',
            data: marketTypes,
          },
          calculable: true,
          series: [
            {
              name: 'Thị trường',
              selectedMode: 'single',
              type: 'pie',
              radius: 100,
              data: marketTypesData,
            },
          ],
          color: ['#6fd0dc', '#1c6e7d', '#ca8622', '#d48265', '#91c7ae'],
        };
        this.marketTypeStatisticShow = true;
        this.pieMarketChartOptionsShow = true;
      },
      (error) => console.error(error)
    );
  }
  getTotalInvestorChart() {
    this.dashboardService.getTotalInvestors().then((res) => {
      const option = {
        legend: {
          x: 'center',
          y: 'bottom',
          data: [
            'Số lượng nhà đầu tư',
            'Số nhà đầu tư nước ngoài',
            'Số nhà đầu tư trong nước',
          ],
        },
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            params[0].value = this.decimalPipe.transform(
              params[0].value,
              '1.0-0'
            ).split(',').join('.');
            return (
              params[0].seriesName +
              ' - ' +
              params[0].name +
              ' : ' +
              params[0].value
            );
          },
          axisPointer: {
            type: 'shadow',
          },
        },
        dataset: {
          source: [],
        },
        xAxis: [{ type: 'category' }],
        yAxis: [{
          type: 'value', axisLabel: {
            formatter: (data) => {
              return this.decimalPipe.transform(data, '1.0-0').split(',').join('.');
            },
          },
        }],
        grid: [{ bottom: '55%' }, { top: '55%' }],
        series: [
          // These series are in the first grid.
          {
            type: 'bar',
            seriesLayoutBy: 'row',
            label: {
              normal: {
                show: true,
                position: 'top',
              },
            },
          },
          {
            type: 'bar',
            seriesLayoutBy: 'row',
            label: {
              normal: {
                show: true,
                position: 'top',
              },
            },
          },
          {
            type: 'bar',
            seriesLayoutBy: 'row',
            label: {
              normal: {
                show: true,
                position: 'top',
              },
            },
          },
        ],
        color: ['rgb(79, 129, 189)', 'rgb(192, 80, 77)', 'rgb(155, 187, 89)'],
      };
      option.dataset.source.push(new Array<any>());
      option.dataset.source.push(new Array<any>());
      option.dataset.source.push(new Array<any>());
      option.dataset.source.push(new Array<any>());
      option.dataset.source[0].push('year');
      option.dataset.source[1].push('Số lượng nhà đầu tư');
      option.dataset.source[2].push('Số nhà đầu tư nước ngoài');
      option.dataset.source[3].push('Số nhà đầu tư trong nước');
      res.forEach((e) => {
        option.dataset.source[0].push(e.Year);
        option.dataset.source[1].push(e.Total);
        option.dataset.source[2].push(e.TotalDomestic);
        option.dataset.source[3].push(e.TotalInternational);
      });
      this.TotalInvestorChart = option;
      this.TotalInvestorChartShow = true;
    });
  }
  getTotalSoftwareChart() {
    this.dashboardService.getTotalSoftwares().then((res) => {
      const option = {
        legend: {
          x: 'center',
          y: 'bottom',
          data: ['Việt Nam', 'Nước ngoài', 'Tổng số'],
        },
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            const value = params[0].value.filter((e) => typeof e === 'number');
            value.forEach(e => {
              e = this.decimalPipe.transform(
                e,
                '1.0-0'
              ).split(',').join('.');
            });
            return `
            ${params[0].marker}${' ' + params[0].seriesName + ' : '}${value[0]}<br>
            ${params[1].marker}${' ' + params[1].seriesName + ' : '}${value[1]}<br>
            ${params[2].marker}${' ' + params[2].seriesName + ' : '}${value[2]}
            `;
          },
          axisPointer: {
            type: 'shadow',
          },
        },
        dataset: {
          source: [],
        },
        xAxis: [{ type: 'category' }],
        yAxis: [{
          type: 'value', axisLabel: {
            formatter: (data) => {
              return this.decimalPipe.transform(data, '1.0-0').split(',').join('.');
            },
          },
        }],
        grid: [{ bottom: '55%' }, { top: '55%' }],
        series: [
          // These series are in the first grid.
          {
            type: 'bar',
            seriesLayoutBy: 'row',
            label: {
              normal: {
                show: true,
                position: 'top',
              },
            },
          },
          {
            type: 'bar',
            seriesLayoutBy: 'row',
            label: {
              normal: {
                show: true,
                position: 'top',
              },
            },
          },
          {
            type: 'bar',
            seriesLayoutBy: 'row',
            label: {
              normal: {
                show: true,
                position: 'top',
              },
            },
          },
        ],
        color: ['rgb(155, 187, 89)', 'rgb(128, 100, 162)', 'rgb(79, 129, 189)'],
      };
      option.dataset.source.push(new Array<any>());
      option.dataset.source.push(new Array<any>());
      option.dataset.source.push(new Array<any>());
      option.dataset.source.push(new Array<any>());
      option.dataset.source.push(new Array<any>());
      option.dataset.source[0].push('year');
      option.dataset.source[1].push('Việt Nam');
      option.dataset.source[2].push('Nước ngoài');
      option.dataset.source[3].push('Tổng số');
      res.forEach((e) => {
        option.dataset.source[0].push(e.Year);
        option.dataset.source[1].push(e.TotalDomestic);
        option.dataset.source[2].push(e.TotalInternational);
        option.dataset.source[3].push(e.Total);
      });
      this.TotalSoftwareChart = option;
      this.TotalSoftwareChartShow = true;
    });
  }
  getTotalPeopleChart() {
    this.dashboardService.getTotalPeoples().then((res) => {
      const option = {
        legend: {
          x: 'center',
          y: 'bottom',
          data: ['Số lượng nhân viên', 'Số lượng sinh viên', 'Tổng cộng'],
        },
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            const value = params[0].value.filter((e) => typeof e === 'number');
            value.forEach(e => {
              e = this.decimalPipe.transform(
                e,
                '1.0-0'
              ).split(',').join('.');
            });
            return `
            ${params[0].marker}${' ' + params[0].seriesName + ' : '}${value[0]}<br>
            ${params[1].marker}${' ' + params[1].seriesName + ' : '}${value[1]}<br>
            ${params[2].marker}${' ' + params[2].seriesName + ' : '}${value[2]}
            `;
          },
          axisPointer: {
            type: 'shadow',
          },
        },
        dataset: {
          source: [],
        },
        xAxis: [{ type: 'category' }],
        yAxis: [{
          type: 'value', axisLabel: {
            formatter: (data) => {
              return this.decimalPipe.transform(data, '1.0-0').split(',').join('.');
            },
          },
        }],
        grid: [{ bottom: '55%' }, { top: '55%' }],
        series: [
          // These series are in the first grid.
          {
            type: 'bar',
            seriesLayoutBy: 'row',
            label: {
              normal: {
                show: true,
                position: 'top',
              },
            },
          },
          {
            type: 'bar',
            seriesLayoutBy: 'row',
            label: {
              normal: {
                show: true,
                position: 'top',
              },
            },
          },
          {
            type: 'bar',
            seriesLayoutBy: 'row',
            label: {
              normal: {
                show: true,
                position: 'top',
              },
            },
          },
        ],
        color: ['rgb(192, 80, 77)', 'rgb(155, 187, 89)', 'rgb(128, 100, 162)'],
      };
      option.dataset.source.push(new Array<any>());
      option.dataset.source.push(new Array<any>());
      option.dataset.source.push(new Array<any>());
      option.dataset.source.push(new Array<any>());
      option.dataset.source[0].push('year');
      option.dataset.source[1].push('Số lượng nhân viên');
      option.dataset.source[2].push('Số lượng sinh viên');
      option.dataset.source[3].push('Tổng cộng');
      res.forEach((e) => {
        option.dataset.source[0].push(e.Year);
        option.dataset.source[1].push(e.TotalEmployee);
        option.dataset.source[2].push(e.TotalAlumnus);
        option.dataset.source[3].push(e.Total);
      });
      this.TotalPeopleChart = option;
      this.TotalPeopleChartShow = true;
    });
  }
  getVondautuInvestorChart() {
    this.dashboardService.getVondautuInvestors().then((res) => {
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            params.value = this.decimalPipe.transform(params.value, '1.0-0').split(',').join('.');
            return (
              params.seriesName +
              ' - ' +
              params.name +
              ' : ' +
              params.value +
              ' Tỉ đồng'
            );
          },
        },
        xAxis: {
          type: 'category',
          data: [],
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: (data) => {
              return this.decimalPipe.transform(data, '1.0-0').split(',').join('.');
            },
          },
        },
        series: [
          {
            name: 'Vốn đầu tư',
            data: [],
            type: 'line',
          },
        ],
        color: 'rgb(247, 151, 73)',
      };

      res.forEach((e) => {
        option.xAxis.data.push(e.Year);
        option.series[0].data.push(e.VondautuRegister / 1000000000);
      });
      this.VondautuInvestorChart = option;
      this.VondautuInvestorChartShow = true;
    });
  }
  getCompanyStatisticsInQTSC() {
    this.dashboardService.getCompanyStatisticsInQTSC().then(
      (response: CompanyStatisticsInQTSCModel[]) => {
        const label = response.map((e) => e.Country);
        const value = response.map((e) => ({ name: e.Country, value: e.Total }));
        this.companyStatisticsInQTSC = {
          title: {
            x: 'center',
          },
          tooltip: {
            trigger: 'item',
            formatter: (params) => {
              params.value = this.decimalPipe.transform(params.value, '1.0-0').split(',').join('.');
              return (
                params.seriesName + ' - ' + params.name + ' : ' + params.value + ' (' + params.percent + '%)'
              );
            },
          },
          legend: {
            type: 'scroll',
            orient: 'vertical',
            left: 0,
            data: label,
          },
          calculable: true,
          series: [
            {
              name: 'Tỉ lệ',
              selectedMode: 'single',
              type: 'pie',
              radius: 100,
              data: value,
            },
          ],
        };
        this.companyStatisticsInQTSCShow = true;
      },
      (error) => console.error(error)
    );
  }
  getVondautuSoftwareChart() {
    this.dashboardService.getVondautuSoftwares().then((res) => {
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            params.value = this.decimalPipe.transform(params.value, '1.0-0').split(',').join('.');
            return (
              params.seriesName +
              ' - ' +
              params.name +
              ' : ' +
              params.value +
              ' Tỉ đồng'
            );
          },
        },
        xAxis: {
          type: 'category',
          data: [],
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: (data) => {
              return this.decimalPipe.transform(data, '1.0-0').split(',').join('.');
            },
          },
        },
        series: [
          {
            name: 'Vốn đầu tư',
            data: [],
            type: 'line',
          },
        ],
        color: 'rgb(163, 213, 226)',
      };

      res.forEach((e) => {
        option.xAxis.data.push(e.Year);
        option.series[0].data.push(e.VondautuRegister / 1000000000);
      });
      this.VondautuSoftwareChart = option;
      this.VondautuSoftwareChartShow = true;
    });
  }
  getBuildingInventory() {
    this.dashboardService.getBuildingInventory().then((res) => {
      this.buildingInventory = res;
      this.buildingInventoryShow = true;
    });
  }
  getITCompanyPie() {
    this.dashboardService.getTotalInsideOutsideSoftwares().then(
      (response: TotalInsideOutsideSoftware[]) => {
        this.totalSoftwarePie = response;
        const itCompany = ['Số DN CNTT nội khu', 'Số DN CNTT bên ngoài'];
        const itCompanyData = [
          {
            name: 'Số DN CNTT nội khu',
            value: this.totalSoftwarePie[0].TotalInside,
          },
          {
            name: 'Số DN CNTT bên ngoài',
            value: this.totalSoftwarePie[0].TotalOutside,
          },
        ];
        this.pieITCompanyOptions = {
          title: {
            x: 'center',
          },
          tooltip: {
            trigger: 'item',
            formatter: (params) => {
              params.value = this.decimalPipe.transform(params.value, '1.0-0').split(',').join('.');
              return (
                params.seriesName + ' - ' + params.name + ' : ' + params.value + ' (' + params.percent + '%)'
              );
            },
          },
          legend: {
            x: 'center',
            y: 'bottom',
            data: itCompany,
          },
          calculable: true,
          series: [
            {
              name: 'Nhóm',
              selectedMode: 'single',
              type: 'pie',
              radius: 100,
              data: itCompanyData,
            },
          ],
          color: ['#2b3d4f', '#4190de', '#ca8622', '#d48265', '#91c7ae'],
        };
        this.totalSoftwarePieShow = true;
        this.pieITCompanyOptionsShow = true;
      },
      (error) => console.error(error)
    );
  }
  getDeputyPie() {
    this.dashboardService.getTotalInvestors().then(
      (response: TotalInvestor[]) => {
        this.totalInvestorPie = response;
        const deputy = ['NĐT Việt Nam', 'NĐT nước ngoài'];
        const deputyData = [
          {
            name: 'NĐT Việt Nam',
            value: this.totalInvestorPie[0].TotalDomestic,
          },
          {
            name: 'NĐT nước ngoài',
            value: this.totalInvestorPie[0].TotalInternational,
          },
        ];
        this.pieDeputyChartOptions = {
          title: {
            x: 'center',
          },
          tooltip: {
            trigger: 'item',
            formatter: (params) => {
              params.value = this.decimalPipe.transform(params.value, '1.0-0').split(',').join('.');
              return (
                params.seriesName + ' - ' + params.name + ' : ' + params.value + ' (' + params.percent + '%)'
              );
            },
          },
          legend: {
            x: 'center',
            y: 'bottom',
            data: deputy,
          },
          calculable: true,
          series: [
            {
              name: 'Tỉ lệ',
              selectedMode: 'single',
              type: 'pie',
              radius: 100,
              data: deputyData,
            },
          ],
          color: ['#e66b30', '#a52d16'],
        };
        this.totalInvestorPieShow = true;
        this.pieDeputyChartOptionsShow = true;
      },
      (error) => console.error(error)
    );
  }
  getProportionOfTelecommunicationRevenueInsideOutsideChart() {
    this.dashboardService
      .getProportionOfTelecommunicationRevenueInsideOutside()
      .then((res) => {
        const option = {
          title: {
            x: 'center',
          },
          tooltip: {
            trigger: 'item',
            formatter: (params) => {
              params.value = this.decimalPipe.transform(params.value, '1.0-0').split(',').join('.');
              return (
                params.seriesName + ' - ' + params.name + ' : ' + params.value + ' (' + params.percent + '%)'
              );
            },
          },
          legend: {
            x: 'center',
            y: 'bottom',
            data: [],
          },
          calculable: true,
          series: [
            {
              name: 'Tỉ lệ',
              selectedMode: 'single',
              type: 'pie',
              radius: 100,
              data: [],
            },
          ],
        };
        res.forEach((e) => {
          option.legend.data.push(e.CommonTelecomservice);
          option.series[0].data.push({
            name: e.CommonTelecomservice,
            value: e.ImplementRevenue,
          });
        });
        this.proportionOfTelecommunicationRevenueInsideOutsideChart = option;
        this.proportionOfTelecommunicationRevenueInsideOutsideChartShow = true;
      });
  }
  getProportionOfParentTelecommunicationRevenueChart() {
    this.dashboardService
      .getProportionOfParentTelecommunicationRevenue()
      .then((res) => {
        const option = {
          title: {
            x: 'center',
          },
          tooltip: {
            trigger: 'item',
            formatter: (params) => {
              params.value = this.decimalPipe.transform(params.value, '1.0-0').split(',').join('.');
              return (
                params.seriesName + ' - ' + params.name + ' : ' + params.value + ' (' + params.percent + '%)'
              );
            },
          },
          legend: {
            x: 'center',
            y: 'bottom',
            data: [],
          },
          calculable: true,
          series: [
            {
              name: 'Tỉ lệ',
              selectedMode: 'single',
              type: 'pie',
              radius: 100,
              data: [],
            },
          ],
        };
        res.forEach((e) => {
          option.legend.data.push(e.CommonTelecomservice);
          option.series[0].data.push({
            name: e.CommonTelecomservice,
            value: e.ImplementRevenue,
          });
        });
        this.proportionOfParentTelecommunicationRevenue = option;
        this.proportionOfParentTelecommunicationRevenueShow = true;
      });
  }
  getProportionOfTelecommunicationRevenueChart() {
    this.dashboardService
      .getProportionOfTelecommunicationRevenue()
      .then((res) => {
        const option = {
          title: {
            x: 'center',
          },
          tooltip: {
            trigger: 'item',
            formatter: (params) => {
              params.value = this.decimalPipe.transform(params.value, '1.0-0').split(',').join('.');
              return (
                params.seriesName + ' - ' + params.name + ' : ' + params.value + ' (' + params.percent + '%)'
              );
            },
          },
          legend: {
            type: 'scroll',
            orient: 'vertical',
            left: 0,
            data: [],
          },
          calculable: true,
          series: [
            {
              name: 'Tỉ lệ',
              selectedMode: 'single',
              type: 'pie',
              radius: 100,
              data: [],
            },
          ],
        };
        res.forEach((e) => {
          option.legend.data.push(e.CommonTelecomservice);
          option.series[0].data.push({
            name: e.CommonTelecomservice,
            value: e.ImplementRevenue,
          });
        });
        this.proportionOfTelecommunicationRevenue = option;
        this.proportionOfTelecommunicationRevenueShow = true;
      });
  }
  getGetCompleteRate() {
    this.dashboardService.getGetCompleteRate().then((res) => {
      this.getCompleteRate = res.map((e) => this.reCall(e));
      this.getCompleteRateShow = true;
    });
  }
  getIncreaseRateChart() {
    this.dashboardService.getIncreaseRate().then((res) => {
      const option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            params[0].value = this.decimalPipe.transform(
              params[0].value,
              '1.0-0'
            ).split(',').join('.');
            return (
              params[0].seriesName +
              ' - ' +
              params[0].name +
              ' : ' +
              params[0].value
            );
          },
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
            data: [],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: (data) => {
                return this.decimalPipe.transform(data, '1.0-0').split(',').join('.');
              },
            },
          },
        ],
        series: [
          {
            name: 'Tỷ lệ',
            type: 'bar',
            barWidth: '60%',
            data: [],
          },
        ],
      };
      res.forEach((e) => {
        option.xAxis[0].data.push('DS ' + e.Year);
        option.series[0].data.push(e.Total);
      });
      this.increaseRateChart = option;
      this.increaseRateChartShow = true;
    });
  }
  getIncreaseOutsideRateChart() {
    this.dashboardService.getIncreaseOutsideRate().then((res) => {
      const option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            params[0].value = this.decimalPipe.transform(
              params[0].value,
              '1.0-0'
            ).split(',').join('.');
            return (
              params[0].seriesName +
              ' - ' +
              params[0].name +
              ' : ' +
              params[0].value
            );
          },
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
            data: [],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: (data) => {
                return this.decimalPipe.transform(data, '1.0-0').split(',').join('.');
              },
            },
          },
        ],
        series: [
          {
            name: 'Tỷ lệ',
            type: 'bar',
            barWidth: '60%',
            data: [],
          },
        ],
      };
      res.forEach((e) => {
        option.xAxis[0].data.push('DS ' + e.Year);
        option.series[0].data.push(e.Total);
      });
      this.increaseRateOutSideChart = option;
      this.increaseRateOutSideChartShow = true;
    });
  }
  reCall(model: GetCompleteRate): TreeTabelModel {
    const children = model.Services
      ? model.Services.map((e) => this.reCall(e))
      : [];
    return {
      data: {
        Id: model.Id,
        Name: model.Name,
        ImplementRevenue: model.ImplementRevenue,
        RevenueRegister: model.RevenueRegister,
      },
      children,
    };
  }
  fetchChildren = (item: GetCompleteRate): GetCompleteRate[] => {
    return item.Services;
  }
  hasChildren = (item: GetCompleteRate): boolean => {
    return item.Services && item.Services.length > 0;
  }
  getTopRevenue() {
    this.dashboardService.getTopRevenue().then((res) => {
      this.topRevenueDashboard = res;
      this.topRevenueDashboardShow = true;
    });
  }
  RevenueYear: any = null;
  CompanyName: any = null;
  getTopIcome(){
    this.dashboardService.getTopIncome().then((res) => {      
      this.topIncomeDashboard = res;      
      this.topIncomeDashboardShow = true;
      this.RevenueYear = this.topIncomeDashboard.RevenueYear;
      this.CompanyName = this.topIncomeDashboard.CompanyName;
    });
  }
  getParticipantsInMonth() {
    this.dashboardService.getParticipantsInMonth().then((res) => {
      this.participantsInMonth = res;
      this.participantsInMonthShow = true;
    });
  }
  getContractExpire() {
    this.dashboardService.getContractExpire().then((res) => {
      this.contractExpire = res;
      this.contractExpireShow = true;
    });
  }
  getContractAdjustment() {
    this.dashboardService.getContractAdjustment().then((res) => {
      this.contractAdjustment = res;
      this.contractAdjustmentShow = true;
    });
  }
  getContractLiquidated() {
    this.dashboardService.getContractLiquidated().then((res) => {
      this.contractLiquidated = res;
      this.contractLiquidatedShow = true;
    });
  }
}

export const COLOR_PALETTES = {
  DEFAULT: [
    '#c23531',
    '#2f4554',
    '#61a0a8',
    '#d48265',
    '#91c7ae',
    '#749f83',
    '#ca8622',
    '#bda29a',
    '#6e7074',
    '#546570',
    '#c4ccd3',
  ],
};
