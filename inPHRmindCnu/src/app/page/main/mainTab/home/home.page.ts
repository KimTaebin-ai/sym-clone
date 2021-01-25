import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AlertController, ModalController, NavController} from '@ionic/angular';
import * as Chart from 'chart.js';
import {SymptomInfoModalPage} from '../../../modal/symptom-info-modal/symptom-info-modal.page';
import {MainService} from '../../../../mind-module/service/main.service';
import {MindManager} from '../../../../mind-module/mind.manager';
import * as moment from 'moment';
import {PageInfoService} from '../../../../services/page-info.service';
import {EventBusService} from '../../../../services/event-bus.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  @ViewChild('chartView1', {static: true}) chartView1: ElementRef;
  @ViewChild('chartView2', {static: true}) chartView2: ElementRef;
  @ViewChild('chartView3', {static: true}) chartView3: ElementRef;
  @ViewChild('chartView4', {static: true}) chartView4: ElementRef;
  Chart1: any;
  Chart2: any;
  Chart3: any;
  Chart4: any;
  weekSurveyForChart: any = [];
  fabButtonOpened = false;

  userInfo: any = this.mindManager.getMemberModel();
  today: any = moment().format('YYYY-MM-DD HH:mm');

  calendarInfo: any = {
    weekDay: [],
    day: []
  };

  dailyEmotion: any = {
    energy: {
      negative: null,
      positive : null
    },
    felling: {
      negative: null,
      positive : null
    },
    petulance: null,
    unrest: null
  };

  mainInfo: any = {};

  /*정서불안 차트------------------*/
  @ViewChild('emotionCanvas', {static: true}) emotionCanvas: ElementRef;
  emotionCharts: any;
  emotionWeekList: any = [];

  dataChk = false;
  /*----------------------------*/

  // ---------------------------------------------
  constructor(
      private alertCtrl: AlertController,
      private modalController: ModalController,
      private mainService: MainService,
      private mindManager: MindManager,
      private pageInfoService: PageInfoService,
      private navController: NavController,
      private eventBusService: EventBusService
  ) {
  }

  ngOnInit() {
    this.eventBusService.tabInfo$.next('HOME');
    moment.locale('ko');
    this.getMainInfo();
  }

  ngOnDestroy() {
    this.fabButtonOpened = false;
  }


  fabHandler(event): any {
    this.fabButtonOpened = event;
  }

  setDayInfo() {
    const daysInfo = [];
    for (let i = 6; i >= 0; i--) {
      const thisMonth = moment().format('MM');
      const weekDay: any = {
        weekDay: moment().subtract(i, 'd').format('ddd'),
        data: {},
        thisMonth: moment().subtract(i, 'd').format('MM') === thisMonth ? true : false
      };
      this.calendarInfo.weekDay.push(weekDay);
      const day: any = {
        day: moment().subtract(i, 'd').format('DD'),
        data: {},
        thisMonth: moment().subtract(i, 'd').format('MM') === thisMonth ? true : false
      };
      for (const item of this.mainInfo.panicInfos) {
        const formatType = 'YYYY-MM-DD';
        if (moment(item.panicDate).format(formatType) === moment().subtract(i, 'd').format(formatType)) {
          day.data = item;
          weekDay.data = item;
        }
      }
      this.calendarInfo.day.push(day);
    }

    if (this.mainInfo.dailyEmotion !== null) {
      const dailyEmotion = this.mainInfo.dailyEmotion;
      this.dailyEmotion = {
        energy: {
          negative: dailyEmotion.energyNegative,
          positive : dailyEmotion.energyPositive
        },
        felling: {
          negative: dailyEmotion.feelingNegative,
          positive : dailyEmotion.feelingPositive
        },
        petulance: dailyEmotion.petulance,
        unrest: dailyEmotion.unrest
      };
    }
  }

  getMainInfo() {
    this.mainService.getMainInfo().subscribe(res => {
      this.mainInfo = res;
      this.setDayInfo();
      if (res.weekSurveyPercent !== null) {
        this.createChart();
      }

      /*정서불안 차트------------------*/
      if (res.dailyEmotion != null) {
        this.emotionWeekList = res.dailyEmotion;
        // 3시 이전, 이후 계산
        const compareTime = moment().format('YYYY-MM-DD') + ' 15:00:00';
        for (const item of res.dailyEmotion) {
          console.log('현재 시간 : ' + moment().format('YYYY년 MM월 DD일 HH:mm:ss'));
          // 3시 이전 일때
          if (moment(moment()).isBefore(compareTime)) {
            if (moment().isSame(moment(item.setDt), 'day') || moment().subtract(1, 'days').isSame(moment(item.setDt), 'day')) {
              this.dataChk = true;
            }
          } else {
            if (moment().isSame(moment(item.setDt), 'day')) {
              this.dataChk = true;
            }
          }
        }
        this.createEmotionChart('NOT_NULL');
      } else {
        this.createEmotionChart('NULL');
      }


      /*-----------------------------*/

    }, err => {
      this.setDayInfo();
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
      this.Chart4.destroy();
    }
    // -------------------------------

    for (let i = 0; i < this.mainInfo.weekSurveyPercent.length; i++) {
      this.weekSurveyForChart.push(this.mainInfo.weekSurveyPercent[i].surveyInterval);
      if (i === 0) {
        // CHART1
        this.Chart1 = new Chart(this.chartView1.nativeElement, {
          type: 'doughnut',
          data: {
            datasets: [{
              data: [100 - this.mainInfo.weekSurveyPercent[i].percent, this.mainInfo.weekSurveyPercent[i].percent],
              backgroundColor: ['#e1e5eb', '#44bbc8']
            }],

            labels: ['normal', 'altitudeObesity']
          },
          options: {
            elements: {
              // @ts-ignore
              center: {
                text: this.mainInfo.weekSurveyPercent[i].percent.toString() + '%',
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
      } else if (i === 1) {
        // CHART2
        this.Chart2 = new Chart(this.chartView2.nativeElement, {
          type: 'doughnut',
          data: {
            datasets: [{
              data: [100 - this.mainInfo.weekSurveyPercent[i].percent, this.mainInfo.weekSurveyPercent[i].percent],
              backgroundColor: ['#e1e5eb', '#3864a6']
            }],

            labels: ['normal', 'altitudeObesity']
          },
          options: {
            elements: {
              // @ts-ignore
              center: {
                text: this.mainInfo.weekSurveyPercent[i].percent.toString() + '%',
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
      } else if (i === 2) {
        // CHART3
        this.Chart3 = new Chart(this.chartView3.nativeElement, {
          type: 'doughnut',
          data: {
            datasets: [{
              data: [100 - this.mainInfo.weekSurveyPercent[i].percent, this.mainInfo.weekSurveyPercent[i].percent],
              backgroundColor: ['#e1e5eb', '#1178b4']
            }],

            labels: ['normal', 'altitudeObesity']
          },
          options: {
            elements: {
              // @ts-ignore
              center: {
                text: this.mainInfo.weekSurveyPercent[i].percent.toString() + '%',
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
      } else if (i === 3) {
        // CHART4
        this.Chart4 = new Chart(this.chartView4.nativeElement, {
          type: 'doughnut',
          data: {
            datasets: [{
              data: [100 - this.mainInfo.weekSurveyPercent[i].percent, this.mainInfo.weekSurveyPercent[i].percent],
              backgroundColor: ['#e1e5eb', '#1178b4']
            }],

            labels: ['normal', 'altitudeObesity']
          },
          options: {
            elements: {
              // @ts-ignore
              center: {
                text: this.mainInfo.weekSurveyPercent[i].percent.toString() + '%',
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
    }

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

  }

  // 정서불안 차트 생성
  createEmotionChart(type){
    if (this.emotionCharts){
      this.emotionCharts.destroy();
    }

    const sixDaysAgo = moment().subtract(6, 'day').toDate();
    const oneWeekTerm = [];
    for (let i = 6; i >= 0; i--){
      oneWeekTerm.push(moment(moment(new Date()).subtract( i, 'day').toDate()).format('dd'));
    }

    const emotionChartDataList: any = {
      feelingData : [],
      energyData : [],
      unrestData: [],
      petulanceData : []
    };

    // this.emotionWeekList = [];

    for (let i = 0; i < 7; i++){
      emotionChartDataList.feelingData.push([null]);
      emotionChartDataList.energyData.push([null]);
      emotionChartDataList.unrestData.push(null);
      emotionChartDataList.petulanceData.push(null);
    }
    if (type === 'NOT_NULL') {
      for (let i = 6; i >= 0; i--) {
        for (let j = this.emotionWeekList.length - 1; j >= 0; j--){
          if (this.emotionWeekList[j].setDt === moment(moment(sixDaysAgo).add(i, 'day').toDate()).format('YYYY-MM-DD')){
            emotionChartDataList.feelingData[i][0] = this.emotionWeekList[j].feelingNegative;
            emotionChartDataList.feelingData[i][1] = this.emotionWeekList[j].feelingPositive;
            emotionChartDataList.energyData[i][0] = this.emotionWeekList[j].energyNegative;
            emotionChartDataList.energyData[i][1] = this.emotionWeekList[j].energyPositive;
            emotionChartDataList.unrestData[i] = this.emotionWeekList[j].unrest;
            emotionChartDataList.petulanceData[i] = this.emotionWeekList[j].petulance;
          }
        }
      }
    } else {
      for (let i = 6; i >= 0; i--) {
        emotionChartDataList.feelingData[i][0] = 0;
        emotionChartDataList.feelingData[i][1] = 0;
        emotionChartDataList.energyData[i][0] = 0;
        emotionChartDataList.energyData[i][1] = 0;
        emotionChartDataList.unrestData[i] = 0;
        emotionChartDataList.petulanceData[i] = 0;
      }
    }


    const emotionDatasetList: any = [
      {
        label: '기분', // API 연동하면 typeNm으로
        data: emotionChartDataList.feelingData,
        backgroundColor: '#19d288',
        borderWidth: 1
      }, {
        label: '에너지',
        data: emotionChartDataList.energyData,
        backgroundColor: '#4bb5f2',
        borderWidth: 1
      }, {
        label: '불안',
        data: emotionChartDataList.unrestData,
        backgroundColor: '#836ae3',
        borderWidth: 1
      }, {
        label: '짜증',
        data: emotionChartDataList.petulanceData,
        backgroundColor: '#ff7661',
        borderWidth: 1
      }
    ];

    this.emotionCharts = new Chart(this.emotionCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: oneWeekTerm,
        datasets: emotionDatasetList,
      },
      options: {
        scales: {
          xAxes: [{
            display: true,
            ticks: {
              fontColor: '#000000'
            }
          }],
          yAxes: [{
            ticks: {
              display: true,
              stepSize : 1,
              suggestedMin: -3,
              suggestedMax: 3
            },
            gridLines : {
              display: true,
              borderDash: [2, 2],
            }
          }]
        },
        responsive: true,
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 10,
            usePointStyle: true,
            padding: 15
          }
        },
        title: {
          display: false,
          text: '정서리포트'
        }
      }
    });
  }


  async openModal(type) {
    this.mindManager.setModalONOff('ON');
    const modal = await this.modalController.create({
      component: SymptomInfoModalPage,
      cssClass: 'symptomInfoModal',
      componentProps: {
        type
      }
    });
    modal.onDidDismiss()
        .then(() => {
          this.mindManager.setModalONOff('OFF');
        });
    return await modal.present();
  }










  async test() {
      const alert = await this.alertCtrl.create({
        header: '알림',
        message: '<p class="alert-header">inPHR에 가입된 회원입니다.<br></p><p class="alert-body">가입된 회원정보로 inPHRChild를 이용하시겠습니까?</p>',
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



  getDate(format) {
    return moment().format(format);
  }

  setWeekDayColor(type, index) {
    let classNm = '';
    if (type === 'panic') {
      if ('data' in this.calendarInfo.day[index]) {
        if (Object.keys(this.calendarInfo.day[index].data).length !== 0) {
          const panicInfos = this.calendarInfo.day[index].data;
          if (panicInfos.countPanic === 0) {
            classNm = 'main-card1-date3-point0';
          } else if (panicInfos.countPanic === 1) {
            if (panicInfos.panicTime >= 30 && panicInfos.panicTime < 60 ) {
              classNm = 'main-card1-date3-point2';
            } else if (panicInfos.panicTime >= 60 && panicInfos.panicTime < 90 ) {
              classNm = 'main-card1-date3-point3';
            } else if (panicInfos.panicTime >= 90) {
              classNm = 'main-card1-date3-point4';
            } else {
              classNm = 'main-card1-date3-point1';
            }
          } else if (panicInfos.countPanic === 2) {
            if (panicInfos.panicTime >= 60 && panicInfos.panicTime < 90 ) {
              classNm = 'main-card1-date3-point3';
            } else if (panicInfos.panicTime >= 90) {
              classNm = 'main-card1-date3-point4';
            } else {
              classNm = 'main-card1-date3-point2';
            }
          } else if (panicInfos.countPanic === 3) {
            if (panicInfos.panicTime >= 90) {
              classNm = 'main-card1-date3-point4';
            } else {
              classNm = 'main-card1-date3-point3';
            }
          } else if (panicInfos.countPanic === 4) {
            classNm = 'main-card1-date3-point4';
          }
        }
      }
    } else {
      if (index === 6){
        classNm = 'weekDay-today';
      } else {
        if ('data' in this.calendarInfo[type][index]) {
          classNm = this.calendarInfo[type][index].thisMonth ? 'weekDay-withData' : '';
        }
      }
    }
    return classNm;
  }

  getToPage(type) {
    if (type === 'diary') {
      const diaryDateInfo = this.mindManager.getDateBinding();
      if (diaryDateInfo) {
        diaryDateInfo.dirayDate = moment().format('YYYY-MM-DD');
        this.mindManager.setDateBinding(diaryDateInfo);
      } else {
        this.mindManager.setDateBinding({
          dirayDate : moment().format('YYYY-MM-DD')
        });
      }
      this.pageInfoService.moveToTab('/main/main/diary', '메인화면/다이어리').then(data => {
        this.eventBusService.tabInfo$.next('DIARY');
        this.navController.navigateRoot(['/main/main/diary']);
      });
    } else {
      this.pageInfoService.moveToTab('/main/main/psychological-scale', '메인화면/심리척도').then(data => {
        this.eventBusService.tabInfo$.next('SCALE');
        this.navController.navigateRoot(['/main/main/psychological-scale']);
      });
    }
  }
}


