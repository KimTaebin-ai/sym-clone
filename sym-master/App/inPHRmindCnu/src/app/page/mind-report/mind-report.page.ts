import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as Chart from "chart.js";
import * as moment from "moment";
import {NavController} from "@ionic/angular";
import {NavigationExtras} from "@angular/router";

@Component({
  selector: 'app-mind-report',
  templateUrl: './mind-report.page.html',
  styleUrls: ['./mind-report.page.scss'],
})
export class MindReportPage implements OnInit, OnDestroy {

  @ViewChild('emotionCanvas', {static: true}) emotionCanvas: ElementRef;
  @ViewChild('panicCanvas', {static: false}) panicCanvas: ElementRef;
  @ViewChild('psychoCanvas', {static: false}) psychoCanvas: ElementRef;
  fabButtonOpened = false;
  emotionCharts: any;
  panicCharts: any;
  psychoCharts: any;

  today: any = new Date();
  weekDays: any = {
    yesterDay : moment(this.today).subtract(1, 'day').toDate(),
    twoDayAgo : moment(this.today).subtract(2, 'day').toDate(),
    threeDayAgo : moment(this.today).subtract(3, 'day').toDate(),
    fourDayAgo : moment(this.today).subtract(4, 'day').toDate(),
    fiveDayAgo : moment(this.today).subtract(5, 'day').toDate(),
    sixDayAgo : moment(this.today).subtract(6, 'day').toDate()
  }
  oneWeekTerm = [
    moment(this.weekDays.sixDayAgo).format('dd'),
    moment(this.weekDays.fiveDayAgo).format('dd'),
    moment(this.weekDays.fourDayAgo).format('dd'),
    moment(this.weekDays.threeDayAgo).format('dd'),
    moment(this.weekDays.twoDayAgo).format('dd'),
    moment(this.weekDays.yesterDay).format('dd'),
    moment(this.today).format('dd')
  ];

  monthDays: any = {
    oneMonthAgo : moment(this.today).subtract(30, 'day').toDate()
  }

  mindType = 'emotion';

  /*정서불안-------------------------------------------*/
  emotionTerm = 'week';
  emotionChartTerm : any = this.oneWeekTerm;
  emotionDataList : any = {
    feelingData : [[-1, 1], 2, [0, -2], 1, 3, 2, [3, -1]],
    energyData : [3, [1, -2], 2, 1, [1, -3], 3, 1],
    unrestData: [1, 2, 3, 2, 3, 1, 2],
    annoyedData : [2, 1, 2, 3, 1, 1, 2]
  }
  // todayEmotionData : any = [3, [-1,1], 2, 1];
  thisWeekEmoData : any = [
    {
      date : '2020-12-07',
      data: [[-3,3], [-1,1], 2, 1]
    },
    {
      date: '2020-12-06',
      data: [[-3,2], [0, 2], 3, 2]
    }
  ]

  /*--------------------------------------------------*/

  /*공황-----------------------------------------------*/
  panicTerm = 'week';
  panicChartTerm : any = this.oneWeekTerm;
  panicDataList1 = [2, 5, null, 5];
  panicDataList2 = [7, 3, null, 1];
  panicDataList3 = [null, 1, null, 2];
  panicResultList = [
    {
      startDate : '2020.11.11',
      startTime : '16:51',
      durationTime : 10,
      panicDegree : 3,
      symptomChoiceList : ['심박수 증가', '오한', '답답함']
    },
    {
      startDate : '2020.11.25',
      startTime : '20:31',
      durationTime : 5,
      panicDegree : 1,
      symptomChoiceList : ['호흡곤란', '오한', '답답함']
    }
  ]
  /*--------------------------------------------------*/

  /*생활패턴--------------------------------------------*/

  /*--------------------------------------------------*/

  /*심리척도--------------------------------------------*/
  psychologyType = 'feeling';
  psychologyChart : any = {
    psychologyChartWeek : [
      moment(this.weekDays.fourDayAgo).format('MMM Do'),
      moment(this.weekDays.threeDayAgo).format('Do'),
      moment(this.weekDays.twoDayAgo).format('Do'),
      moment(this.weekDays.yesterDay).format('Do'),
      moment(this.today).format('Do')
    ],
    psychologyChartColor : '#1178B4'
  }
  psychologyList : any = {
    // 가데이터
    feelingList : [{
      code: 'PHQ-9',
      name: '우울증 선별도구(PHQ-9)',
      dataList: [80, 300, 150, 220, 280]
    }, {
      code: 'K-MDQ',
      name: '기분장애 척도(K-MDQ)',
      dataList: [300, 200, 150, 250, 70]
    }, {
      code: 'K-CESD-R',
      name: '우울 척도(K-CESD-R)',
      dataList: [100, 300, 250, 180, 280]
    }],

    anxietyList : [{
      code: 'STAI1', /*STAI가 두개라서 코드로 분류시 어려움*/
      name: '상태불안 척도(STAI)',
      dataList: [100, 300, 250, 180, 280]
    }, {
      code: 'GOD-7',
      name: '범불안 척도(GOD-7)',
      dataList: []
    }, {
      code: 'STAI2',
      name: '특성불안 척도(STAI)',
      dataList: [300, 200, 150, 250, 100]
    }],

    stressList : [{
      code: 'KOSS-SF', /*STAI가 두개라서 코드로 분류시 어려움*/
      name: '직무 스트레스 척도(KOSS-SF)',
      dataList: [100, 300, 250, 180, 280]
    }, {
      code: 'KRG-53',
      name: '회복탄력성 척도(KRG-53)',
      dataList: []
    }],

    suicideList : [{
      code: 'SSI',
      name: '자살사고 척도(SSI)',
      dataList: [200, 300, 150, 220, 280]
    }],

    dependenceList : [{
      code: 'HIS',
      name: '흡연의존 척도(HIS)',
      dataList: [100, 300, 250, 180, 280]
    }, {
      code: 'AUDIT-K',
      name: '알콜의존 척도(AUDIT-K)',
      dataList: [200, 300, 150, 220, 280]
    }],

    rhythmList : [{
      code: 'KtDS',
      name: '아침저녁 척도(KtDS)',
      dataList: []
    }, {
      code: 'DAST',
      name: '계절성양상 척도(DAST)',
      dataList: [100, 300, 250, 180, 280]
    }],
    experienceList : [{
      code: 'LES',
      name: '생활경험 척도(LES)',
      dataList: []
    }],

    etcList : [{
      code: 'wHOQOL-BREF',
      name: '삶의 질 척도(wHOQOL-BREF)',
      dataList: [200, 300, 150, 220, 280]
    }, {
      code: 'IPAQ-SF',
      name: '신체활동 척도(IPAQ-SF)',
      dataList: [100, 300, 250, 180, 280]
    }]
  }
  psychoDataList = this.psychologyList.feelingList;
  psychoChartDataList = this.psychoDataList[0].dataList;
  psychoTitle : any = {
    psychoStandardCode : this.psychoDataList[0].code,
    psychoStandardNm : this.psychoDataList[0].name
  }

  /*--------------------------------------------------*/

  constructor(
      private navController: NavController
  ) {
  }

  ngOnInit() {
    console.log('Init');
    moment.locale('ko');
    this.getMindResult();
    console.log('erfe', this.monthDays.oneMonthAgo);
  }
  ngOnDestroy() {
    this.fabButtonOpened = false;
  }


  fabHandler(event): any {
    this.fabButtonOpened = event;
  }

  getMindResult() {
    this.createEmotionChart();
  }

  // 리포트 타입 변경
  changeReportType(mind) {
    this.dataReset();
    this.mindType = mind;
    if(mind === 'emotion') {
      this.createEmotionChart();
    } else if(mind === 'panic') {
      this.createPanicChart();
    } else if(mind === 'psychology'){
      this.createPsychoChart();
    }
  }

  /*정서불안-----------------------------------------------------*/
  // 정서 그래프 기간 선택

  changeEmotionTerm(term){
    this.emotionTerm = term;
    this.createEmotionChart();
  }

  // 정서불안 차트 생성
  createEmotionChart(){
    if(this.emotionCharts){
      this.emotionCharts.destroy();
    }

    let emotionChartXaxis;
    if(this.emotionTerm === 'week') {
      this.emotionChartTerm = this.oneWeekTerm
      emotionChartXaxis = true;
    } else {
      this.emotionChartTerm = [];
      for(let i = this.monthDays.oneMonthAgo.getDate(); i <= 30; i++){
        this.emotionChartTerm.push((moment(this.monthDays.oneMonthAgo).add(i, 'day').toDate()).getDate());
      }
      emotionChartXaxis = false;
    }
    console.log('this', this.emotionChartTerm)
    this.emotionCharts = new Chart(this.emotionCanvas.nativeElement,{
      type: 'bar',
      data: {
        labels: this.emotionChartTerm,
        datasets: [{
          label: '기분', //API 연동하면 typeNm으로
          data: this.emotionDataList.feelingData,
          backgroundColor: '#19d288',
          borderWidth: 1
        }, {
          label: '에너지',
          data: this.emotionDataList.energyData,
          backgroundColor: '#4bb5f2',
          borderWidth: 1
        }, {
          label: '불안',
          data: this.emotionDataList.unrestData,
          backgroundColor: '#836ae3',
          borderWidth: 1
        }, {
          label: '짜증',
          data: this.emotionDataList.annoyedData,
          backgroundColor: '#ff7661',
          borderWidth: 1
        }],
      },
      options: {
        scales: {
          xAxes: [{
            display: emotionChartXaxis
          }],
          yAxes: [{
            ticks: {
              display: true,
              stepSize : 1,
              suggestedMin : 0
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

  isToday(date : Date) : boolean{
    return moment(date).isSame(moment(this.today).format('yyyy-MM-DD'));
  }

  /*-----------------------------------------------------------*/


  /*공황--------------------------------------------------------*/
  changePanicTerm(term){
    this.panicTerm = term;
    this.createPanicChart();
  }

  createPanicChart(){
    if(this.panicCharts){
      this.panicCharts.destroy();
    }
    let panicChartThick;
    let panicChartXaxis;
    if(this.panicTerm === 'week') {
      this.panicChartTerm = this.oneWeekTerm;
      panicChartThick = 15;
      panicChartXaxis = true;
    } else {
      this.panicChartTerm = [];
      for(let i = this.monthDays.oneMonthAgo.getDate(); i <= 30; i++){
        this.panicChartTerm.push((moment(this.monthDays.oneMonthAgo).add(i, 'day').toDate()).getDate());
      }
      panicChartThick = 5;
      panicChartXaxis = false;
    }
    this.panicCharts = new Chart(this.panicCanvas.nativeElement,{
      type: 'bar',
      data: {
        labels: this.panicChartTerm,
        datasets: [{
          label: '공황',
          data: this.panicDataList1,
          backgroundColor: '#7e8da0',
          borderColor: 'white',
          borderWidth: 1,
          barThickness: panicChartThick,
          fill: false
        },{
          label: '공황',
          data: this.panicDataList2,
          backgroundColor: '#7e8da0',
          borderColor: '#ffffff',
          borderWidth: 1,

          barThickness: panicChartThick,
          fill: false
        },{
          label: '공황',
          data: this.panicDataList3,
          backgroundColor: '#7e8da0',
          borderColor: '#ffffff',
          borderWidth: 1,
          barThickness: panicChartThick,
          fill: false
        }
        ]
      },
      options: {
        scales: {
          xAxes: [{
            display : panicChartXaxis,
            stacked : true,
            gridLines : {
              display: false
            },
          }],
          yAxes: [{
            stacked : true,
            ticks: { // y축 간격
              display: true,
              stepSize : 5,
              // suggestedMax : 30
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
            padding: 15
          },
          display: false
        },
        title: {
          display: false,
          text: '공황리포트'
        }
      }
    });
  }


  /*-----------------------------------------------------------*/


  /*생활패턴-----------------------------------------------------*/




  /*-----------------------------------------------------------*/


  /*심리척도-----------------------------------------------------*/
  // 심리척도 타입 선택
  changePsychoType(psycho) {
    if(this.psychologyType === psycho){
      return false;
    } else {
      this.psychologyType = psycho;

      if (psycho === 'feeling') {
        this.psychoDataList = this.psychologyList.feelingList;
        this.psychologyChart.psychologyChartColor = '#1178B4'
      } else if (psycho === 'anxiety') {
        this.psychoDataList = this.psychologyList.anxietyList;
        this.psychologyChart.psychologyChartColor = '#1882C0'
      } else if (psycho === 'stress') {
        this.psychoDataList = this.psychologyList.stressList;
        this.psychologyChart.psychologyChartColor = '#6CA7CA'
      } else if (psycho === 'suicide') {
        this.psychoDataList = this.psychologyList.suicideList;
        this.psychologyChart.psychologyChartColor = '#6192AE'
      } else if (psycho === 'dependence') {
        this.psychoDataList = this.psychologyList.dependenceList;
        this.psychologyChart.psychologyChartColor = '#A3CAE1'
      } else if (psycho === 'rhythm') {
        this.psychoDataList = this.psychologyList.rhythmList;
        this.psychologyChart.psychologyChartColor = '#399ED9'
      } else if (psycho === 'experience') {
        this.psychoDataList = this.psychologyList.experienceList;
        this.psychologyChart.psychologyChartColor = '#B0D6EC'
      } else if (psycho === 'etc') {
        this.psychoDataList = this.psychologyList.etcList;
        this.psychologyChart.psychologyChartColor = '#5488A7'
      }
      this.psychoChartDataList = this.psychoDataList[0].dataList;
      this.psychoTitle = {
        psychoStandardCode: this.psychoDataList[0].code,
        psychoStandardNm: this.psychoDataList[0].name
      }
      this.createPsychoChart();
    }
  }

  clickPsychoStandard(psycho, index){
    if(this.psychoTitle.psychoStandardCode === psycho.code){
      return false;
    } else {
      this.psychoTitle = {
        psychoStandardCode : psycho.code,
        psychoStandardNm : psycho.name
      }
      this.psychoChartDataList = [];
      this.psychoChartDataList = this.psychoDataList[index].dataList
      this.createPsychoChart();
    }
  }
  // 심리척도 차트 생성
  createPsychoChart() {
    if(this.psychoCharts){
      this.psychoCharts.destroy();
    }
    let max;
    let min;
    for (let i = 0; i < this.psychoChartDataList.length; i++){
      if (this.psychoChartDataList[i]){
        if (max) {
          if (this.psychoChartDataList[i] > max) {
            max = this.psychoChartDataList[i];
          }
        } else {
          max = this.psychoChartDataList[i];
        }
        if (min) {
          if (this.psychoChartDataList[i] < min) {
            min = this.psychoChartDataList[i];
          }
        } else {
          min = this.psychoChartDataList[i];
        }
      }
    }
    if (min > 10) {
      min = min - 10;
    } else {
      min = 0;
    }
    max = max + 10;

    this.psychoCharts = new Chart(this.psychoCanvas.nativeElement,{
      type: 'line',
      data: {
        labels: this.psychologyChart.psychologyChartWeek,
        datasets: [{
          label: this.psychoTitle.psychoStandardNm,
          data: this.psychoChartDataList,
          type: 'line',
          lineTension: 0,
          borderWidth: 1,
          borderColor: this.psychologyChart.psychologyChartColor,
          pointBackgroundColor: this.psychologyChart.psychologyChartColor,
          pointRadius: 4,
          fill: false,
          spanGaps: true
        }]
      },
      options: {
        scales: {
          xAxes: [{
            display: true,
            gridLines: {
              display: false
            },
            ticks: {
              fontStyle: 'normal',
              fontFamily: 'NunitoSans'
            }
          }],
          yAxes: [{
            display: true,
            gridLines : {
              display: true,
              borderDash: [2, 2],

            },
            ticks: { // y축 간격
              display: true,
              stepSize : 100,
              suggestedMin: min,
              suggestedMax: max
            }
          }]
        },
        legend: {
          display: false
        },
        title: {
        display: false,
        text: '심리척도_기분'
      }
      }
    });
  }
  /*-----------------------------------------------------------*/

  goToPage(url, pType){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        patternType: pType
      }
    };
    this.navController.navigateRoot([url], navigationExtras);
  }

  dataReset(){
    this.emotionTerm = 'week';
    this.panicTerm = 'week';

    this.psychologyType = 'feeling';
    this.psychologyChart = {
      psychologyChartWeek : [
        moment(this.weekDays.fourDayAgo).format('MMM Do'),
        moment(this.weekDays.threeDayAgo).format('Do'),
        moment(this.weekDays.twoDayAgo).format('Do'),
        moment(this.weekDays.yesterDay).format('Do'),
        moment(this.today).format('Do')
      ],
      psychologyChartColor : '#1178B4'
    }
    /*this.psychologyList = {
      feelingList : [{
        code: 'PHQ-9',
        name: '우울증 선별도구(PHQ-9)',
        dataList: [200, 300, 150, 220, 280]
      }, {
        code: 'K-MDQ',
        name: '기분장애 척도(K-MDQ)',
        dataList: [200, 300, 150, 220, 280]
      }, {
        code: 'K-CESD-R',
        name: '우울 척도(K-CESD-R)',
        dataList: [200, 300, 150, 220, 280]
      }],
      anxietyList : [{
        code: 'STAI1',
        name: '상태불안 척도(STAI)'
      }, {
        code: 'GOD-7',
        name: '범불안 척도(GOD-7)'
      }, {
        code: 'STAI2',
        name: '특성불안 척도(STAI)'
      }],
      stressList : [],
      suicideList : [],
      dependenceList : [],
      rhythmList : [],
      etcList : []
    }
    this.psychoDataList = {
      feelingDataList : [],
      anxietyDataList : [],
      stressDataList : [],
      suicideDataList : [],
      dependenceDataList : [],
      rhythmDataList : [],
      etcDataList : []
    }
    this.feelingTitle = {
      feelingStandardCode : 'PHQ-9',
      feelingStandardNm: '우울증 선별도구(PHQ-9)'
    }
    this.anxietyTitle = {
      anxietyStandardCode : 'STAI1',
      anxietyStandardNm : '상태불안 척도(STAI)'
    }*/
  }


}
