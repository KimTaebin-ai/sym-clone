import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as Chart from 'chart.js';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import * as moment from 'moment';
import {ModalController, NavController} from '@ionic/angular';
import {ActivatedRoute, NavigationExtras} from '@angular/router';
import {PageInfoService} from "../../services/page-info.service";
import {ReportService} from "../../report.service";
import {objectKeys} from "codelyzer/util/objectKeys";
import {observableToBeFn} from "rxjs/internal/testing/TestScheduler";
import {ResponseCode} from "../../mind-module/data/response.data";
import {DictionaryModalPage} from "../modal/dictionary-modal/dictionary-modal.page";
import {PatternReportPage} from "./pattern-report/pattern-report.page";
import {ChartOptions} from "chart.js";
import {EventBusService} from "../../services/event-bus.service";

@Component({
  selector: 'app-mind-report',
  templateUrl: './mind-report.page.html',
  styleUrls: ['./mind-report.page.scss'],
})
export class MindReportPage implements OnInit, OnDestroy {

  @ViewChild('emotionCanvas', {static: true}) emotionCanvas: ElementRef;
  @ViewChild('emotionCanvas_Month', {static: true}) emotionCanvas_Month: ElementRef;
  @ViewChild('panicCanvas', {static: false}) panicCanvas: ElementRef;
  @ViewChild('panicCanvas_Month', {static: false}) panicCanvas_Month: ElementRef;
  @ViewChild('psychoCanvas', {static: false}) psychoCanvas: ElementRef;
  fabButtonOpened = false;
  emotionCharts: any;
  emotionCharts_Month: any;
  panicCharts: any;
  panicCharts_Month: any;
  psychoCharts: any;

  weekDays: any = {
    today : new Date(),
    yesterDay : moment(new Date()).subtract(1, 'day').toDate(),
    twoDaysAgo : moment(new Date()).subtract(2, 'day').toDate(),
    threeDaysAgo : moment(new Date()).subtract(3, 'day').toDate(),
    fourDaysAgo : moment(new Date()).subtract(4, 'day').toDate(),
    fiveDaysAgo : moment(new Date()).subtract(5, 'day').toDate(),
    sixDaysAgo : moment(new Date()).subtract(6, 'day').toDate()
  }
  oneMonthAgo = moment(new Date()).subtract(29, 'day').toDate();
  oneWeekTerm = [];

  thisEndDay: any = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + (6 - new Date().getDay()));

  mindType = 'emotion';

  /*정서불안-------------------------------------------*/
  emotionTerm = 'week';
  emotionChartTerm : any = this.oneWeekTerm;

  emotionWeekList : any = []; // 정서 1주 데이터 리스트
  emotionMonthList : any = []; // 정서 1개월 데이터 리스트

  emotionPage : any = {
    page : 1,
    totalPage : 0
  }
  emotionDataList : any = [];
  thisEmotionEndDate = moment(this.thisEndDay).format('YYYY-MM-DD');
  /*--------------------------------------------------*/

  /*공황-----------------------------------------------*/
  panicTerm = 'week';
  panicChartTerm : any = this.oneWeekTerm;

  panicWeekList : any = {}; // 공황 1주 데이터 리스트
  panicMonthList : any = {}; // 공황 1개월 데이터 리스트

  panicDataSetList : any = []

  panicPage : any = {
    page : 1,
    totalPage : 0
  }
  panicDataList : any = [];
  /*--------------------------------------------------*/

  /*생활패턴--------------------------------------------*/
  startDay: any = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + (0 - new Date().getDay()));
  endDay: any = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + (6 - new Date().getDay()));

  patternAllDataList: any = {};
  patternAllDataLength = 0;
  /*--------------------------------------------------*/

  /*심리척도--------------------------------------------*/
  psychologyCodeSeq : any = '';

  surveyDataList = [];

  psychoSurveyList : any = [];

  surveyCategoryList : any = [];
  surveyCategory : any = {
    surveySeq: '',
    shortTitle: '',
    titleEN: '',
    titleKO: ''
  }
  /*--------------------------------------------------*/

  constructor(
      private navController: NavController,
      private pageInfoService: PageInfoService,
      private reportService: ReportService,
      private route: ActivatedRoute,
      private modalController: ModalController,
      private eventBusService: EventBusService
  ) {
  }

  ngOnInit() {
    this.eventBusService.tabInfo$.next('REPORT');
    console.log('Init');
    moment.locale('ko');

    this.getEmotionWeekList();
    this.getEmotionPageList();

   /* this.getPanicWeekList();
    this.getPanicPageList();

    this.getPatternList();

    this.getPsychoSurveyList();*/
  }
  ngOnDestroy() {
    this.fabButtonOpened = false;
  }


  // 리포트 타입 변경
  changeReportType(mind) {
    this.dataReset();
    this.mindType = mind;
    if(mind === 'emotion') {
      this.dataReset();
      this.getEmotionWeekList();
      this.getEmotionPageList();
    } else if(mind === 'panic') {
      this.dataReset();
      this.getPanicWeekList();
      this.getPanicPageList();
    } else if(mind === 'lifePattern') {
      this.dataReset();
      this.getPatternList();
    } else if(mind === 'psychology'){
      this.dataReset();
      this.getPsychoSurveyList();
      this.createPsychoChart();
    }
  }

  /*정서불안--------------------------------------------------------------------------------*/
  // 데이트 포맷
  formatDate(date) {
    const format = moment(date).format('dd');
    return format;
  }

  // 정서 그래프 기간 선택
  changeEmotionTerm(term){
    this.emotionTerm = term;
    if(this.emotionTerm === 'week') {
      this.getEmotionWeekList();
    } else {
      this.getEmotionMonthList();
    }
  }

  // 정서불안 1주일 데이터 조회
  getEmotionWeekList() {
    // 차트 1주
    this.oneWeekTerm = [];
    for(let i = 6; i >= 0; i--){
      this.oneWeekTerm.push(moment(moment(new Date()).subtract( i, 'day').toDate()).format('dd'))
    }

    this.reportService.getEmotionWeekList().subscribe(res => {
      if(res.data){
        this.emotionWeekList = res.data;
      }
      this.createEmotionChart();
    }, err => {
      console.log('err', err);
    });
  }

  //정서불안 1개월 데이터 조회
  getEmotionMonthList(){
    this.reportService.getEmotionMonthList().subscribe(res => {
      if(res.data){
        this.emotionMonthList = res.data;
      }
      this.createEmotionChart();
    }, err => {
      console.log('err', err);
    });
  }

  // 정서불안 차트 생성
  createEmotionChart(){
    if(this.emotionCharts){
      this.emotionCharts.destroy();
    }
    if(this.emotionCharts_Month){
      this.emotionCharts_Month.destroy();
    }

    let emotionChartXaxis;
    let emotionChartDataList : any = {
      feelingData : [],
      energyData : [],
      unrestData: [],
      petulanceData : []
    }

    // 1주 선택 시
    if(this.emotionTerm === 'week') {
      this.emotionChartTerm = this.oneWeekTerm
      emotionChartXaxis = true;

      for(let i = 0; i < 7; i++){
        emotionChartDataList.feelingData.push([null]);
        emotionChartDataList.energyData.push([null]);
        emotionChartDataList.unrestData.push(null);
        emotionChartDataList.petulanceData.push(null);
      }
      for (let i = 6; i >= 0; i--) {
        for (let j = this.emotionWeekList.length-1; j >= 0; j--){
          if(this.emotionWeekList[j].setDt === moment(moment(this.weekDays.sixDaysAgo).add(i, 'day').toDate()).format('YYYY-MM-DD')){
            emotionChartDataList.feelingData[i][0] = this.emotionWeekList[j].feelingNegative;
            emotionChartDataList.feelingData[i][1] = this.emotionWeekList[j].feelingPositive;
            emotionChartDataList.energyData[i][0] = this.emotionWeekList[j].energyNegative;
            emotionChartDataList.energyData[i][1] = this.emotionWeekList[j].energyPositive;
            emotionChartDataList.unrestData[i] = this.emotionWeekList[j].unrest;
            emotionChartDataList.petulanceData[i] = this.emotionWeekList[j].petulance;
          }
        }
      }
    } else { // 1개월 선택 시
      this.emotionChartTerm = [];
      for(let i = 29; i >= 0; i--){
        this.emotionChartTerm.push(moment(moment(new Date()).subtract( i, 'day').toDate()).format('MM월 DD일'))
      }
      emotionChartXaxis = false;
      for(let i = 0; i < 30; i++){
        emotionChartDataList.feelingData.push([null]);
        emotionChartDataList.energyData.push([null]);
        emotionChartDataList.unrestData.push(null);
        emotionChartDataList.petulanceData.push(null);
      }
      for (let i = 29; i >= 0; i--) {
        for (let j = this.emotionMonthList.length-1; j >= 0; j--){
          if(this.emotionMonthList[j].setDt === moment(moment(this.oneMonthAgo).add(i, 'day').toDate()).format('YYYY-MM-DD')){
            emotionChartDataList.feelingData[i][0] = this.emotionMonthList[j].feelingNegative;
            emotionChartDataList.feelingData[i][1] = this.emotionMonthList[j].feelingPositive;
            emotionChartDataList.energyData[i][0] = this.emotionMonthList[j].energyNegative;
            emotionChartDataList.energyData[i][1] = this.emotionMonthList[j].energyPositive;
            emotionChartDataList.unrestData[i] = this.emotionMonthList[j].unrest;
            emotionChartDataList.petulanceData[i] = this.emotionMonthList[j].petulance;
          }
        }
      }
    }

    const emotionDatasetList: any = [
      {
        label: '기분', //API 연동하면 typeNm으로
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

    this.emotionCharts = new Chart(this.emotionCanvas.nativeElement,{
      type: 'bar',
      data: {
        labels: this.emotionChartTerm,
        datasets: emotionDatasetList,
      },
      options: {
        scales: {
          xAxes: [{
            display: emotionChartXaxis,
            ticks: {
              fontColor: '#000000'
            }
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

    this.emotionCharts_Month = new Chart(this.emotionCanvas_Month.nativeElement,{
      type: 'bar',
      data: {
        labels: this.emotionChartTerm,
        datasets: emotionDatasetList,
      },
      options: {
        scales: {
          xAxes: [{
            display: emotionChartXaxis,
            ticks: {
              fontColor: '#000000'
            }
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

  // 정서불안 데이터 리스트 조회
  getEmotionPageList(){
    this.reportService.getEmotionPageList(this.emotionPage.page).subscribe(res => {
      if(res.data){
        this.emotionPage.totalPage = res.data.maxPage;
        if(this.emotionPage.page === 1){
          this.emotionDataList = [];
        }
        this.emotionDataList.push(
            {
              startDt : moment(moment(res.data.endDt).subtract( 6, 'day').toDate()).format('YYYY-MM-DD'),
              endDt : res.data.endDt,
              emotionData : []
            }
        );
        for(let i = 0; i < res.data.emotions.length; i++){
          this.emotionDataList[this.emotionPage.page-1].emotionData.push(
              {
                setDt : res.data.emotions[i].setDt,
                dataList : [[res.data.emotions[i].feelingNegative,res.data.emotions[i].feelingPositive],[res.data.emotions[i].energyNegative,res.data.emotions[i].energyPositive], res.data.emotions[i].unrest, res.data.emotions[i].petulance]
              }
          );
        }
      }
    }, err => {
      console.log('err', err);
    })
  }

  // 정서불안 인피니티 스크롤
  loadEmotionData(event){
    setTimeout(() => {
      this.emotionPage.page++;
      event.target.complete();
      this.getEmotionPageList();
      if (this.emotionPage.page >= this.emotionPage.totalPage){
        event.target.disabled = true;
      }
    }, 500);
  }

  isToday(date : Date) : boolean{
    return moment(date).isSame(moment(this.weekDays.today).format('YYYY-MM-DD'));
  }

  /*--------------------------------------------------------------------------------------*/


  /*공황-----------------------------------------------------------------------------------*/

  // 공황 차트 출력 기간 변경
  changePanicTerm(term){
    this.panicTerm = term;
    if(this.panicTerm === 'week') {
      this.getPanicWeekList();
    } else {
      this.getPanicMonthList();
    }
  }

  // 공황 1주일 데이터 조회
  getPanicWeekList() {
    // 차트 1주
    this.oneWeekTerm = [];
    for(let i = 6; i >= 0; i--){
      this.oneWeekTerm.push(moment(moment(new Date()).subtract( i, 'day').toDate()).format('dd'))
    }

    this.reportService.getPanicWeekList().subscribe(res => {
      if(res.data){
        this.panicWeekList = res.data;
      }
      console.log('panicWeekList', this.panicWeekList);
      this.createPanicChart();
    }, err => {
      console.log('err', err);
    });
  }

  // 공황 1개월 데이터 조회
  getPanicMonthList() {
    this.reportService.getPanicMonthList().subscribe(res => {
      if(res.data){
        this.panicMonthList = res.data;
      }
      console.log('panicMonthList', this.panicMonthList);
      this.createPanicChart();
    }, err => {
      console.log('err', err);
    });
  }

  // 공황 차트 생성
  createPanicChart(){
    if(this.panicCharts){
      this.panicCharts.destroy();
    }
    if(this.panicCharts_Month){
      this.panicCharts_Month.destroy();
    }

    let panicChartThick;
    let panicChartXaxis;
    let panicChartDataList = [];
    console.log('first', panicChartDataList);

    // 1주 선택 시

    if(this.panicTerm === 'week') {
      this.panicChartTerm = [];
      this.panicChartTerm = this.oneWeekTerm;
      panicChartThick = 15; // bar차트 두께
      panicChartXaxis = true; // x축값 출력 여부

      let maxLengthW;
      if(this.panicWeekList) {
        for(let i = 0; i < this.panicWeekList.length; i++){
          if (maxLengthW) {
            if (this.panicWeekList[i].panicTimes.length > maxLengthW) {
              maxLengthW = this.panicWeekList[i].panicTimes.length;
            }
          } else {
            maxLengthW = this.panicWeekList[i].panicTimes.length;
          }
        }
        for(let i = 0; i < maxLengthW; i++){
          panicChartDataList.push([null, null, null, null, null, null, null]);
        }
        for(let j = 0; j < this.panicWeekList.length; j++){
          for (let i = 0; i < this.panicChartTerm.length; i++){
            for(let x = 0; x < maxLengthW; x++) {
              if (this.panicWeekList[j].panicDate === moment(moment(this.weekDays.sixDaysAgo).add(i, 'day').toDate()).format('YYYY-MM-DD')) {
                if (this.panicWeekList[j].panicTimes[x]) {
                  panicChartDataList[x][i] = this.panicWeekList[j].panicTimes[x]
                }
              }
            }
          }

        }
      }
    } else { // 1개월 선택 시
      this.panicChartTerm = [];
      for(let i = 0; i < 30; i++){
        this.panicChartTerm.push(moment(moment(this.oneMonthAgo).add( i, 'day').toDate()).format('MM월 DD일'))
      }
      panicChartThick = 5; // bar차트 두께
      panicChartXaxis = false; // x축값 미출력 여부

      let maxLengthM;
      if(this.panicMonthList) {
        for(let i = 0; i < this.panicMonthList.length; i++){
          if (maxLengthM) {
            if (this.panicMonthList[i].panicTimes.length > maxLengthM) {
              maxLengthM = this.panicMonthList[i].panicTimes.length;
            }
          } else {
            maxLengthM = this.panicMonthList[i].panicTimes.length;
          }
        }
        for(let i = 0; i < maxLengthM; i++){
          panicChartDataList.push([null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]);
        }
        for(let j = 0; j < this.panicMonthList.length; j++){
          for (let i = 0; i < this.panicChartTerm.length; i++){
            for(let x = 0; x < maxLengthM; x++) {
              if (this.panicMonthList[j].panicDate === moment(moment(this.oneMonthAgo).add(i, 'day').toDate()).format('YYYY-MM-DD')) {
                if (this.panicMonthList[j].panicTimes[x]) {
                  panicChartDataList[x][i] = this.panicMonthList[j].panicTimes[x]
                }
              }
            }
          }
        }
      }
    }

    this.panicDataSetList = [];
    for(let i = 0; i < panicChartDataList.length; i++){
      this.panicDataSetList.push(
          {
            label: '공황',
            data: panicChartDataList[i],
            backgroundColor: '#7e8da0',
            borderColor: '#ffffff',
            borderWidth: 1,
            barThickness: panicChartThick,
            fill: false
          }
      )
    }

    this.panicCharts = new Chart(this.panicCanvas.nativeElement,{
      type: 'bar',
      data: {
        labels: this.panicChartTerm,
        datasets: this.panicDataSetList
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

    this.panicCharts_Month = new Chart(this.panicCanvas_Month.nativeElement,{
      type: 'bar',
      data: {
        labels: this.panicChartTerm,
        datasets: this.panicDataSetList
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

  // 공황 데이터 리스트 조회
  getPanicPageList(){
    this.reportService.getPanicPageList(this.panicPage.page).subscribe(res => {
      if(res.data){
        this.panicPage.totalPage = res.data.maxPage;
        if(this.panicPage.page === 1){
          this.panicDataList = [];
        }
        for(let i = 0; i < res.data.panics.length; i++){
          this.panicDataList.push(res.data.panics[i]);
        }
      }
    }, err => {
      console.log('err', err);
    })
  }

  // 공황 인피니티 스크롤
  loadPanicData(event){
    setTimeout(() => {
      this.panicPage.page++;
      event.target.complete();
      this.getPanicPageList();
      if (this.panicPage.page >= this.panicPage.totalPage){
        event.target.disabled = true;
      }
    }, 500);
  }


  /*--------------------------------------------------------------------------------------*/


  /*생활패턴--------------------------------------------------------------------------------*/
  // 생활패턴 조회
  getPatternList(){
    const startDt = moment(this.startDay).format('YYYY-MM-DD');
    this.reportService.getPatternList(startDt).subscribe(res => {
      if(res.data){
        console.log('res.data', res.data);
        this.patternAllDataList = res.data.dailyPattern;
        this.patternAllDataLength = Object.keys(this.patternAllDataList).length;
      }
    }, err => {
      console.log('err', err);
      this.patternAllDataList = {};
      this.patternAllDataLength = 0;
    });
    console.log('patternAllDataList', this.patternAllDataList);
  }

  moveLastWeek() {
    this.startDay = moment(this.startDay).subtract(7, 'day').toDate();
    this.endDay = moment(this.endDay).subtract(7,'day').toDate();
    this.getPatternList();
  }

  moveNextWeek(){
    this.startDay = moment(this.startDay).add(7, 'day').toDate();
    this.endDay = moment(this.endDay).add(7,'day').toDate();
    this.getPatternList();
  }

  isAfterToday(): boolean {
    return moment(this.endDay).isAfter(this.weekDays.today, 'day');
  }

  isSameEndDay(): boolean {
    return moment(this.endDay).isSame(this.weekDays.today, 'day');
  }

  // 생활패턴 상세조회 모달
  async openPatternModal(type) {
    const startDt = this.startDay;
    const modal = await this.modalController.create({
      component: PatternReportPage,
      componentProps: {
        type, startDt
      }
    });
    return await modal.present();
  }

  /*--------------------------------------------------------------------------------------*/


  /*심리척도--------------------------------------------------------------------------------*/
  // 심리척도 설문 유형 리스트 조회
  getPsychoSurveyList() {
    this.reportService.getCodeList('survey').subscribe(res => {
      this.psychoSurveyList = res.data;
      // surveyList의 첫번째를 초기 설문 유형으로 설정
      if(this.psychoSurveyList.length) {
        this.psychologyCodeSeq = this.psychoSurveyList[0].codeSeq;
        this.getSurveyCategoryList(this.psychologyCodeSeq);
      }
    }, err => {
      console.log('err', err);
    })
  }

  // 심리척도 설문 카테고리 리스트 조회
  getSurveyCategoryList(surveyCategoryCode) {
    this.reportService.getSurveyCategoryList(surveyCategoryCode).subscribe(res => {
      this.surveyCategoryList = res.data;
      // categoryList의 첫번째를 초기 설문 카테고리로 설정
      console.log('survey', this.surveyCategoryList);
      if(this.surveyCategoryList.length){
        this.surveyCategory = {
          surveySeq: this.surveyCategoryList[0].surveySeq,
          shortTitle: this.surveyCategoryList[0].surveyShortTitle,
          titleEN: this.surveyCategoryList[0].surveyTitleEN,
          titleKO: this.surveyCategoryList[0].surveyTitleKO
        }
        this.getSurveyChartData(this.surveyCategory.surveySeq);
      }
    }, err => {
      console.log('err', err);
    })
  }


  // 심리척도 설문 유형 선택
  changeSurveyType(survey) {
    this.psychologyCodeSeq = survey.codeSeq;
    this.getSurveyCategoryList(survey.codeSeq);
  }

  // 심리척도 설문 카테고리 선택
  clickSurveyCategory(category){
    this.surveyCategory = {
      surveySeq: category.surveySeq,
      shortTitle: category.surveyShortTitle,
      titleEN: category.surveyTitleEN,
      titleKO: category.surveyTitleKO
    }
    console.log('surveyCategory.titleKO', category);
    this.getSurveyChartData(this.surveyCategory.surveySeq);
  }

  // 심리척도 설문 데이터 조회
  getSurveyChartData(surveySeq){
    this.reportService.getSurveyChartData(surveySeq).subscribe(res => {
      if(res.data){
        this.surveyDataList = res.data;
      }
      console.log('surveyDataList', res.data);
      this.createPsychoChart();
    }, err => {
      console.log('err', err);
    })
  }

  // 심리척도 차트 생성
  createPsychoChart() {
    if (this.psychoCharts) {
      this.psychoCharts.destroy();
    }

    // surveyDataList.length가 1이라고 설정
    const surveyChartTerm: any = [];
    const surveyChartDataList: any = [];
    const surveyChartDataColor: any = [];
    const surveyChartDatasets: any = [];
    const surveyCutoffList: any = [];
    if (!this.surveyDataList.length) {
      return;
    }
    for (let i = 0; i < this.surveyDataList[0].charts.length; i++) {
      surveyChartDataList.push([]);
      surveyChartDataColor.push([]);
      for (let j = 0; j < this.surveyDataList[0].charts[i].values.length; j++) {
        if(i === 0) {
          surveyChartTerm.push(moment(this.surveyDataList[0].charts[i].values[j].completeDt).format('MM월DD일'));
        }
        surveyChartDataList[i].push(this.surveyDataList[0].charts[i].values[j].dotValue);
        surveyChartDataColor[i].push(this.surveyDataList[0].charts[i].values[j].dotColor);
      }
    }
    console.log('surveyChartTerm', surveyChartTerm);
    console.log('surveyChartDataList', surveyChartDataList);
    for (let i = 0; i < this.surveyDataList[0].charts.length; i++) {
      surveyChartDatasets.push({
        label: this.surveyDataList[0].charts[i].chartLabelKo,
        data: surveyChartDataList[i],
        type: 'line',
        lineTension: 0,
        borderWidth: 1,
        borderColor: this.surveyDataList[0].charts[i].bgColor,
        pointBackgroundColor: surveyChartDataColor[i],
        pointRadius: 4,
        fill: false,
        spanGaps: true
      })
    }
    for (let i = 0; i < this.surveyDataList[0].cutoffs.length; i++) {
      surveyCutoffList.push(
          {
            drawTime: 'beforeDatasetsDraw',
            id: 'line' + [i],
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: this.surveyDataList[0].cutoffs[i].cutoffValue,
            borderColor: this.surveyDataList[0].cutoffs[i].cutoffColor,
            borderWidth: 1,
            // borderDash: [3, 5],
            label: {
              backgroundColor: '#00ff0000',
              fontSize: 10,
              fontStyle: 'normal',
              fontColor: this.surveyDataList[0].cutoffs[i].cutoffColor,
              position: 'right',
              enabled: true,
              content: this.surveyDataList[0].cutoffs[i].cutoffLabelKo,
              yAdjust: -5
            }
          }
      )
    }
    this.psychoCharts = new Chart(this.psychoCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: surveyChartTerm,
        datasets: surveyChartDatasets
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
            gridLines: {
              display: true,
              borderDash: [2, 2],

            },
            ticks: { // y축 간격
              display: true,
              stepSize: this.surveyDataList[0].stepSize,
              suggestedMin: this.surveyDataList[0].minValue,
              suggestedMax: this.surveyDataList[0].maxValue
            }
          }]
        },
        legend: {
          display: false
        },
        title: {
          display: false,
          text: this.surveyDataList[0].axisComment
        },
        annotation: {
          annotations: surveyCutoffList
        }
      } as ChartOptions,
      plugins: [ChartAnnotation]
    });
  }
  /*--------------------------------------------------------------------------------------*/

  // 데이터 초기화
  dataReset(){

    this.oneWeekTerm = [];

    /*-----------------------------*/
    this.emotionTerm = 'week';
    this.emotionChartTerm = this.oneWeekTerm;

    this.emotionWeekList = [];
    this.emotionMonthList = [];

    this.emotionPage = {
      page : 1,
      totalPage : 0
    }
    this.emotionDataList = [];
    /*-----------------------------*/
    this.panicTerm = 'week';
    this.panicChartTerm = this.oneWeekTerm;

    this.panicWeekList = {};
    this.panicMonthList = {};

    this.panicPage = {
      page : 1,
      totalPage : 0
    }
    this.panicDataList = [];
    /*-----------------------------*/
    this.patternAllDataList = {};
    this.patternAllDataLength = 0;
    /*-----------------------------*/
    this.psychologyCodeSeq = '';

    /*this.psychologyList = {};
    this.psychoTitle = {
      psychoStandardCode : '',
      psychoStandardNm : ''
    }

    this.psychoSurveyList = [];

    this.psychoSurveyList = [];

    this.surveyCategoryList = [];
    this.surveyCategory = {
      surveySeq: '',
      shortTitle: '',
      titleEN: '',
      titleKO: ''
    } */
  }

}
