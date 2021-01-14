import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as Chart from 'chart.js';
import * as moment from 'moment';
import {NavigationExtras} from '@angular/router';
import {PageInfoService} from '../../../services/page-info.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.page.html',
  styleUrls: ['./steps.page.scss'],
})
export class StepsPage implements OnInit {
  @ViewChild('chart', {static: true}) chart: ElementRef;
  reqVo: any = {
    dateType : 'WEEK'
  };

  chartView: any
  chartData: any = {
    startDt: '2020-11-26',
    endDt: '2020-12-02',
    data: [],
    label: []
  };

  constructor(
      private pageInfoService: PageInfoService,
      private navController: NavController
  ) { }

  ngOnInit() {
    for (let i = 6; 0 <= i ; i--) {
      this.chartData.data.push(60);
      if (i !== 0) {
        this.chartData.label.push(moment(this.chartData.endDt).subtract(i, 'days').format('MM/DD'));
      } else {
        this.chartData.label.push(moment(this.chartData.endDt).format('MM/DD'));
      }
    }
    this.createChart();
  }

  createChart() {
    if (this.chartView) {
      this.chartView.destroy();
    }
    this.chartView = new Chart(this.chart.nativeElement, {
      type: 'bar',
      data: {
        datasets: [{
          data: this.chartData.data,
          backgroundColor: ['#9fcaf0', '#147ad6', '#147ad6', '#76afe2', '#9fcaf0', '#147ad6', '#76afe2']
        }],

        labels: this.chartData.label
      },
      options: {
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        },
        layout: {
          padding: 0,
        },
        scales:
            {
              yAxes: [{
                display: false,
              }],
              xAxes: [{
                gridLines: {
                  display: false,
                }
              }]
            },
        maintainAspectRatio: false,
      }
    });
  }

  nextData() {
    if (this.reqVo.dateType === 'WEEK') {
      this.chartData.startDt = moment(this.chartData.startDt).add(6, 'days').format('YYYY-MM-DD');
      this.chartData.endDt = moment(this.chartData.endDt).add(6, 'days').format('YYYY-MM-DD');
      this.chartData.data = [];
      this.chartData.label = [];
      for (let i = 6; 0 <= i ; i--) {
        this.chartData.data.push(60);
        if (i !== 0) {
          this.chartData.label.push(moment(this.chartData.endDt).subtract(i, 'days').format('MM/DD'));
        } else {
          this.chartData.label.push(moment(this.chartData.endDt).format('MM/DD'));
        }
      }
      this.createChart();
    } else if (this.reqVo.dateType === 'MONTH') {

    } else if (this.reqVo.dateType === 'YEAR') {

    }

  }

  lastData() {
    this.chartData.startDt = moment(this.chartData.startDt).subtract(6, 'days').format('YYYY-MM-DD');
    this.chartData.endDt = moment(this.chartData.endDt).subtract(6, 'days').format('YYYY-MM-DD');
    this.chartData.data = [];
    this.chartData.label = [];
    for (let i = 6; 0 <= i ; i--) {
      this.chartData.data.push(60);
      if (i !== 0) {
        this.chartData.label.push(moment(this.chartData.endDt).subtract(i, 'days').format('MM/DD'));
      } else {
        this.chartData.label.push(moment(this.chartData.endDt).format('MM/DD'));
      }
    }
    this.createChart();
  }

  goToPage(data) {
    const url = 'insert-step';
    const title = '활동량 기록 수정';
    const paramVo = {
      queryParams: {
        inputType : 'UPDATE',
        data
      },
      animate: false
    };
    const navigationExtras: NavigationExtras = paramVo;
    this.pageInfoService.getToOtherPage('/sleeps', url, title).then(() => {
      this.navController.navigateRoot([url], navigationExtras);
    });
  }
}
