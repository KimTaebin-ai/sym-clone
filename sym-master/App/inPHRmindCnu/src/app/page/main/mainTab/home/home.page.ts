import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import * as Chart from 'chart.js';
import {SymptomInfoModalPage} from '../../../modal/symptom-info-modal/symptom-info-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  @ViewChild('chartView1', {static: true}) chartView1: ElementRef;
  @ViewChild('chartView2', {static: true}) chartView2: ElementRef;
  @ViewChild('chartView3', {static: true}) chartView3: ElementRef;
  Chart1: any;
  Chart2: any;
  Chart3: any;
  fabButtonOpened = false;


  // ---------------------------------------------
  constructor(
      private alertCtrl: AlertController,
      private modalController: ModalController
  ) {
  }

  ngOnInit() {
    this.createChart();
  }

  ngOnDestroy() {
    this.fabButtonOpened = false;
    alert()
  }


  fabHandler(event): any {
    this.fabButtonOpened = event;
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
    // -------------------------------


    Chart.pluginService.register({
      beforeDraw(chart) {
        // @ts-ignore
        if (chart.config.options.chartType1){
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
    this.Chart1 = new Chart(this.chartView1.nativeElement, {
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
        cutoutPercentage: 75,
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
        chartType1: {
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

    // CHART2
    this.Chart2 = new Chart(this.chartView2.nativeElement, {
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
        cutoutPercentage: 75,
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
        chartType1: {
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
    this.Chart3 = new Chart(this.chartView3.nativeElement, {
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
        cutoutPercentage: 75,
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
        chartType1: {
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
  }


  async openModal() {
    const modal = await this.modalController.create({
      component: SymptomInfoModalPage,
      cssClass: 'symptomInfoModal',
    });
    return await modal.present();
  }










  async test() {
      const alert = await this.alertCtrl.create({
        header: '알림',
        message: '<p class="alert-header">inPHR에 가입된 회원입니다.<br></p><p class="alert-body">가입된 회원정보로 inPddddddddddddddddddddddddHRChild를 이용하시겠습니까?</p>',
        buttons: [
          {
            text: '예',
            handler: data => {
              console.log('예');
            }
          },
          {
            text: '아니요',
            role: 'cancel',
            handler: data => {
              console.log('아니요');
            }
          }
        ]
      });
      await alert.present();
    }




}
