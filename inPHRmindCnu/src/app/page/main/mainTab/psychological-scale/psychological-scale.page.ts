import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as Chart from 'chart.js';
import {PatientSurveyService} from '../../../../mind-module/service/patient-survey.service';
import {PageInfoService} from '../../../../services/page-info.service';
import {NavigationExtras} from '@angular/router';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-psychological-scale',
  templateUrl: './psychological-scale.page.html',
  styleUrls: ['./psychological-scale.page.scss'],
})
export class PsychologicalScalePage implements OnInit {
  @ViewChild('psychologicalScaleChart1', {static: true}) psychologicalScaleChart1: ElementRef;
  @ViewChild('psychologicalScaleChart2', {static: true}) psychologicalScaleChart2: ElementRef;
  @ViewChild('psychologicalScaleChart3', {static: true}) psychologicalScaleChart3: ElementRef;
  @ViewChild('psychologicalScaleChart4', {static: true}) psychologicalScaleChart4: ElementRef;
  Chart1: any;
  Chart2: any;
  Chart3: any;
  Chart4: any;


  surveyList: any = [];
  constructor(
      private surveyService: PatientSurveyService,
      private pageInfoService: PageInfoService,
      private navController: NavController
  ) {
  }

  ngOnInit() {
    this.getScaleInfo();
    // this.createChart();
  }


  getScaleInfo() {
    this.surveyService.getSurveyList().subscribe(res => {
      this.surveyList = res;
    }, err => {

    });
  }

  // 진행 퍼센트 계산
  getPercent(item) {
    const resultData = Math.floor(Number(item.completeCount) / Number(item.totalCount) * 100) / 100;
    return resultData;
  }

  // 상세 리스트 페이지로 이동
  getToSubList(item) {
    this.pageInfoService.getToOtherPage('/main/main/psychological-scale', '/scale-sub-list', '주간 심리 ' + item.surveyCategoryName).then(() => {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          surveyCategoryCode: item.surveyCategoryCode
        }
      };
      this.navController.navigateRoot(['/scale-sub-list'], navigationExtras);
    });
  }

  createChart(): any {
    // 차트 초기화-------------------
    if (this.Chart1){
      this.Chart1.destroy();
    }
    if (this.Chart2){
      this.Chart2.destroy();
    }
    if (this.Chart3){
      this.Chart1.destroy();
    }
    if (this.Chart4){
      this.Chart2.destroy();
    }
    // -------------------------------


    Chart.pluginService.register({
        beforeDraw(chart) {
          // @ts-ignore
          if (chart.config.options.chartType2){
            const ctx = chart.ctx;
            // @ts-ignore
            const centerConfig = chart.config.options.elements.center;
            const fontStyle =  'Arial';
            const txt = centerConfig.text;
            const color = '#3a4b5f';
            /*const sidePadding = 20;*/
            /*const sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)*/
            ctx.font = '5px ' + fontStyle;
            /*              const stringWidth = ctx.measureText(txt).width;
                      const elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;*/
            /*              const widthRatio = elementWidth / stringWidth;
                      const newFontSize = Math.floor(20);*/
            /*              const elementHeight = (chart.innerRadius * 2);
                      const fontSizeToUse = Math.min(newFontSize, elementHeight);*/
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
            const centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
            ctx.font = 'bold 1.3rem ' + fontStyle;
            ctx.fillStyle = color;
            ctx.fillText(txt, centerX, centerY);
          }
        }
    });

    // CHART1
    this.Chart1 = new Chart(this.psychologicalScaleChart1.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [40, 60],
          backgroundColor: ['#e1e5eb', '#44bbc8']
        }],

        labels: ['normal', 'altitudeObesity']
      },
      options: {
        elements: {
          // @ts-ignore
          center: {
            text: '10' + '%',
            color: '#000000', // Default is #000000
            fontStyle: 'Arial', // Default is Arial
            sidePadding: 20 // Defualt is 20 (as a percentage)
          }
        },
        /*circumference: 1 * Math.PI,*/
        rotation: 1 * Math.PI,
        cutoutPercentage: 60,
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        title: {
          display: false
        },
        layout: {
          padding: 0,
        },
        maintainAspectRatio: false,
        chartType2: {
          datalabels: {
            color: 'red',
            textAlign: 'center',
            font(context) {
              const width = context.chart.width;
              const size = Math.round(width / 32);
              return {
                size,
                weight: 600
              };
            },
            formatter(value, ctx) {
              return ctx.chart.data.labels[ctx.dataIndex];
            }
          }
        },
  }
  });

    // CHART2
    this.Chart2 = new Chart(this.psychologicalScaleChart2.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [40, 60],
          backgroundColor: ['#e1e5eb', '#3864a6']
        }],

        labels: ['normal', 'altitudeObesity']
      },
      options: {
        elements: {
          // @ts-ignore
          center: {
            text: '10' + '%',
            color: '#000000', // Default is #000000
            fontStyle: 'Arial', // Default is Arial
            sidePadding: 20 // Defualt is 20 (as a percentage)
          }
        },
        /*circumference: 1 * Math.PI,*/
        rotation: 1 * Math.PI,
        cutoutPercentage: 60,
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        title: {
          display: false
        },
        layout: {
          padding: 0,
        },
        maintainAspectRatio: false,
        chartType2: {
          datalabels: {
            color: 'red',
            textAlign: 'center',
            font(context) {
              const width = context.chart.width;
              const size = Math.round(width / 32);
              alert(context)
              return {
                size,
                weight: 600
              };
            },
            formatter(value, ctx) {
              return ctx.chart.data.labels[ctx.dataIndex];
            }
          }
        },
      }
    });

    // CHART3
    this.Chart3 = new Chart(this.psychologicalScaleChart3.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [40, 60],
          backgroundColor: ['#e1e5eb', '#1178b4']
        }],

        labels: ['normal', 'altitudeObesity']
      },
      options: {
        elements: {
          // @ts-ignore
          center: {
            text: '10' + '%',
            color: '#000000', // Default is #000000
            fontStyle: 'Arial', // Default is Arial
            sidePadding: 20 // Defualt is 20 (as a percentage)
          }
        },
        /*circumference: 1 * Math.PI,*/
        rotation: 1 * Math.PI,
        cutoutPercentage: 60,
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        title: {
          display: false
        },
        layout: {
          padding: 0,
        },
        maintainAspectRatio: false,
        chartType2: {
          datalabels: {
            color: 'red',
            textAlign: 'center',
            font(context) {
              const width = context.chart.width;
              const size = Math.round(width / 32);
              alert(context)
              return {
                size,
                weight: 600
              };
            },
            formatter(value, ctx) {
              return ctx.chart.data.labels[ctx.dataIndex];
            }
          }
        },
      }
    });

    // CHART4
    this.Chart4 = new Chart(this.psychologicalScaleChart4.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [40, 60],
          backgroundColor: ['#e1e5eb', '#005c92']
        }],

        labels: ['normal', 'altitudeObesity']
      },
      options: {
        elements: {
          // @ts-ignore
          center: {
            text: '10' + '%',
            color: '#000000', // Default is #000000
            fontStyle: 'Arial', // Default is Arial
            sidePadding: 20 // Defualt is 20 (as a percentage)
          }
        },
        /*circumference: 1 * Math.PI,*/
        rotation: 1 * Math.PI,
        cutoutPercentage: 60,
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        title: {
          display: false
        },
        layout: {
          padding: 0,
        },
        maintainAspectRatio: false,
        chartType2: {
          datalabels: {
            color: 'red',
            textAlign: 'center',
            font(context) {
              const width = context.chart.width;
              const size = Math.round(width / 32);
              alert(context)
              return {
                size,
                weight: 600
              };
            },
            formatter(value, ctx) {
              return ctx.chart.data.labels[ctx.dataIndex];
            }
          }
        },
      }
    });

/*    this.Chart1 = new Chart(this.psychologicalScaleChart1.nativeElement, {
      type: 'bar',
      data: {
        labels: ['1', '2', '3', '4'],
        datasets: [{
          label: '기분',
          data: [1, 2, 3, 4],
          backgroundColor: 'rgba(25, 210, 136, 0.5)',
          borderColor: 'rgba(25, 210, 136, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 10,
            padding: 15
          }
        },
        title: {
          display: false,
          text: '정서리포트'
        }
      }
    });*/
  }
    /*/!*const fontHeight;*!/
    /!*const bmi = this.bmiChartData.bmi;*!/
    const underWeight = '저체중';
    const normal = '정상';
    const overWeight = '과체중';
    const obesity = '비만';
    const altitudeObesity = '고도비만';
    this.Chart1 = new Chart(this.psychologicalScaleChart1.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [20, 40, 13.3, 13.3, 13.4],
          backgroundColor: ['#6a9ef7', '#8ad1ad', '#FD5362', '#E33E4D', '#AF1522']
        }],

        labels: [underWeight, normal, overWeight, obesity, altitudeObesity]
      },
      options: {
        circumference: 1 * Math.PI,
        rotation: 1 * Math.PI,
        cutoutPercentage: 60,
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        /!*        elements: {
                  center: {
                    text: this.bmiChartData.kg.toString() + 'Kg',
                    color: '#262626',
                    fontStyle: 'Helvetica', // Default Arial시도
                    sidePadding: 0 // Default 20 (as a percentage)
                  }
                },*!/
        plugins: {
          datalabels: {
            color: '#ffffff',
            textAlign: 'center',
            font(context) {
              const width = context.chart.width;
              const size = Math.round(width / 32);
              return {
                size,
                weight: 600
              };
            },
            /!*color: '#ffffff',*!/
            formatter(value, ctx) {
              return ctx.chart.data.labels[ctx.dataIndex];
            }
          }
        },
      }
    });

    /!*this.setArrow();*!/*/
}
