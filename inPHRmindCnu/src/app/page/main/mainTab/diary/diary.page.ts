import {Component, OnDestroy, OnInit} from '@angular/core';
import * as moment from "moment";
import {AlertController, ModalController, NavController} from "@ionic/angular";
import {PageInfoService} from "../../../../services/page-info.service";
import {DiaryService} from "../../../../mind-module/service/diary.service";
import {AlertUtilService} from "../../../../util/common/alert-util.service";
import {EventBusService} from "../../../../services/event-bus.service";
import {PatternReportPage} from "../../../mind-report/pattern-report/pattern-report.page";
import {EmotionInfoModalPage} from "../../../modal/emotion-info-modal/emotion-info-modal.page";
import {MindManager} from "../../../../mind-module/mind.manager";
import {NavigationExtras} from "@angular/router";

@Component({
  selector: 'app-diary',
  templateUrl: './diary.page.html',
  styleUrls: ['./diary.page.scss'],
})
export class DiaryPage implements OnInit, OnDestroy {
  fabButtonOpened = false;
  today = new Date();

  allDiaryDataList: any = [];

  selectedDate = new Date();
  selectedDateKo = '';

  /*공황------------------------*/
  panicDetailOpen = 'N';
  panicDataList: any = []
  totalPanicDuration: any = 0;

  /*---------------------------*/

  /*정서------------------------*/
  emotionInsertVo: any = {
    feelingPositive: '',
    feelingNegative: '',
    energyPositive: '',
    energyNegative: '',
    unrest: '',
    petulance: '',
    setDt : moment(this.selectedDate).format('YYYY-MM-DD')
  }
  emotionDataList: any = [];

  /*---------------------------*/

  /*생활패턴---------------------*/
  openYn : any = {
    drinkDetailOpen: 'N',
    caffeineDetailOpen: 'N',
    exDetailOpen: 'N'
  }
  drinkList: any = [];
  drinkCodeList: any = [];

  caffeineList: any = [];
  caffeineCodeList: any = [];

  exerciseList: any = [];
  smokeList: any = {};
  mealList: any = {};
  periodList: any = {};

  totalMealCount = 0;

  chkDrinkWhen = {
    chkM : 'N',
    chkA : 'N',
    chkN : 'N'
  }
  chkCaffeineWhen = {
    chkM : 'N',
    chkA : 'N',
    chkN : 'N'
  }
  chkExerciseWhen = {
    chkM : 'N',
    chkA : 'N',
    chkN : 'N'
  }
  /*---------------------------*/

  constructor(
      private alertCtrl: AlertController,
      private alertUtilService: AlertUtilService,
      private modalController: ModalController,
      private navController: NavController,
      private pageInfoService: PageInfoService,
      private diaryService: DiaryService,
      private eventBusService: EventBusService,
      private mindManager: MindManager
  ) { }

  ngOnInit() {
    this.eventBusService.tabInfo$.next('DIARY');
    console.log('Init');
    moment.locale('ko');
    this.selectedDateKo = moment(this.selectedDate).format('YYYY년 MM월 DD일 dddd');
    this.dataReset();
    this.getDiaryList(this.selectedDate);
    this.getCodeList();

    // 날짜 정보 받아와서 selectedDate 설정
    const dateBindingInfo = this.mindManager.getDateBinding();
    if(dateBindingInfo) {
      this.getDirayDateInfo(dateBindingInfo.dirayDate);
    }
  }

  getDirayDateInfo(date){
    this.selectedDate = date;
    this.selectedDateKo = moment(this.selectedDate).format('YYYY년 MM월 DD일 dddd');
    this.getDiaryList(this.selectedDate);
  }

  ngOnDestroy() {
    this.fabButtonOpened = false;
  }

  // 전체 다이어리 조회
  getDiaryList(date) {
    this.diaryService.getDiaryList(moment(date).format('YYYY-MM-DD')).subscribe(res => {
      if(res.data){
        this.allDiaryDataList = res.data;
      }
      console.log('allDiaryDataList', this.allDiaryDataList);
      if(res.data.panics) {
        this.panicDataList = res.data.panics;
        this.totalPanicDuration = 0;
        for (let i = 0; i < this.panicDataList.length; i++) {
          this.totalPanicDuration = this.totalPanicDuration + this.panicDataList[i].panicTime;
        }
      }
      if(res.data.emotion) {
        this.emotionDataList = res.data.emotion;
        this.emotionInsertVo = {
          feelingPositive: this.emotionDataList.feelingPositive,
          feelingNegative: this.emotionDataList.feelingNegative,
          energyPositive: this.emotionDataList.energyPositive,
          energyNegative: this.emotionDataList.energyNegative,
          unrest: this.emotionDataList.unrest,
          petulance: this.emotionDataList.petulance,
          setDt: moment(this.selectedDate).format('YYYY-MM-DD')
        }
      }

      if(res.data.drinks) {
        this.drinkList = res.data.drinks;
        for(let i = 0; i < this.drinkList.length; i++){
          if(this.drinkList[i].drinkWhen === 'M'){
            this.chkDrinkWhen.chkM = 'Y';
          }
          if(this.drinkList[i].drinkWhen === 'A'){
            this.chkDrinkWhen.chkA = 'Y';
          }
          if(this.drinkList[i].drinkWhen === 'N'){
            this.chkDrinkWhen.chkN = 'Y';
          }
        }
      }
      if(res.data.caffeines) {
        this.caffeineList = res.data.caffeines;
        for(let i = 0; i < this.caffeineList.length; i++){
          if(this.caffeineList[i].caffeineWhen === 'M'){
            this.chkCaffeineWhen.chkM = 'Y';
          }
          if(this.caffeineList[i].caffeineWhen === 'A'){
            this.chkCaffeineWhen.chkA = 'Y';
          }
          if(this.caffeineList[i].caffeineWhen === 'N'){
            this.chkCaffeineWhen.chkN = 'Y';
          }
        }
      }
      if(res.data.exercises) {
        this.exerciseList = res.data.exercises;
        for(let i = 0; i < this.exerciseList.length; i++){
          if(this.exerciseList[i].exerciseWhen === 'M'){
            this.chkExerciseWhen.chkM = 'Y';
          }
          if(this.exerciseList[i].exerciseWhen === 'A'){
            this.chkExerciseWhen.chkA = 'Y';
          }
          if(this.exerciseList[i].exerciseWhen === 'N'){
            this.chkExerciseWhen.chkN = 'Y';
          }
        }
      }
      if(res.data.smoke) {
        this.smokeList = res.data.smoke;
      }
      if(res.data.meal) {
        this.mealList = res.data.meal;

        this.totalMealCount = 0;
        if(this.mealList.breakfast === 'Y'){
          this.totalMealCount = this.totalMealCount + 1;
        }
        if(this.mealList.lunch === 'Y'){
          this.totalMealCount = this.totalMealCount + 1;
        }
        if(this.mealList.dinner === 'Y'){
          this.totalMealCount = this.totalMealCount + 1;
        }
        if(this.mealList.snackMorning === 'Y'){
          this.totalMealCount = this.totalMealCount + 1;
        }
        if(this.mealList.snackAfternoon === 'Y'){
          this.totalMealCount = this.totalMealCount + 1;
        }
        if(this.mealList.snackMidnight === 'Y'){
          this.totalMealCount = this.totalMealCount + 1;
        }
      }
      if(res.data.menstruation) {
        this.periodList = res.data.menstruation;
      }

    }, err => {
      console.log('err', err);
    })
  }

  // 코드 리스트 조회
  getCodeList(){
    this.diaryService.getCodeList('alcohol').subscribe(res => {
      this.drinkCodeList = res.data;
      console.log('drinkCodeList', this.drinkCodeList);
    }, err => {
      console.log('err', err);
    });
    this.diaryService.getCodeList('caffeine').subscribe(res => {
      this.caffeineCodeList = res.data;
      console.log('caffeineCodeList', this.caffeineCodeList);
    }, err => {
      console.log('err', err);
    });
  }

  // 유닛 설정
  checkDrinkUnit(drinkCode){
    if(this.drinkCodeList.length) {
      const index = this.drinkCodeList.findIndex(obj => obj.codeSeq === drinkCode);
      const unit = this.drinkCodeList[index].unit;

      return unit;
    }
  }
  checkCaffeinUnit(caffeineCode){
    if(this.caffeineCodeList.length) {
      const index = this.caffeineCodeList.findIndex(obj => obj.codeSeq === caffeineCode);
      const unit = this.caffeineCodeList[index].unit;

      return unit;
    }
  }

  // 전 날로 이동
  moveLastDay() {
    this.selectedDate = moment(this.selectedDate).subtract(1, 'day').toDate();
    this.selectedDateKo = moment(this.selectedDate).format('YYYY년 MM월 DD일 dddd');
    this.dataReset();
    this.getDiaryList(this.selectedDate);
  }

  // 다음 날로 이동
  moveNextDay(){
    this.selectedDate = moment(this.selectedDate).add(1, 'day').toDate();
    this.selectedDateKo = moment(this.selectedDate).format('YYYY년 MM월 DD일 dddd');
    this.dataReset();
    this.getDiaryList(this.selectedDate);
  }

  isSameToday(): boolean {
    return moment(this.selectedDate).isSame(this.today, 'day');
  }
  /*공황 --------------------------------------------------------*/


  /*------------------------------------------------------------*/

  /*정서 --------------------------------------------------------*/
  // 정서 선택
  clickFeeling(degree){
    if (degree > 0) { // 클릭한 값이 양수 일 때
      this.emotionInsertVo.feelingPositive = degree;
    } else if (degree === 0) { // 클릭한 값이 0일 때
      this.emotionInsertVo.feelingPositive = 0;
      this.emotionInsertVo.feelingNegative = 0;
    } else { // 클릭한 값이 음수 일 때
      this.emotionInsertVo.feelingNegative = degree;
    }
  }
  clickEnergy(degree){
    if (degree > 0) { // 클릭한 값이 양수 일 때
      this.emotionInsertVo.energyPositive = degree;
    } else if (degree === 0) { // 클릭한 값이 0일 때
      this.emotionInsertVo.energyPositive = 0;
      this.emotionInsertVo.energyNegative = 0;
    } else { // 클릭한 값이 음수 일 때
      this.emotionInsertVo.energyNegative = degree;
    }
  }
  clickUnrest(degree){
    this.emotionInsertVo.unrest = degree;
  }
  clickPetulance(degree){
    this.emotionInsertVo.petulance = degree;
  }

  // 정서 저장/수정 확인창
  saveEmotionDataChk() {
    if(this.emotionInsertVo.feelingPositive ==='' && this.emotionInsertVo.feelingNegative ===''){
      this.alertUtilService.showAlert(null, '<p class="alert-message-center-font">기분의 정도를 선택해주세요.</p>');
    } else if(this.emotionInsertVo.energyPositive ==='' && this.emotionInsertVo.energyNegative ===''){
      this.alertUtilService.showAlert(null, '<p class="alert-message-center-font">에너지의 정도를 선택해주세요.</p>');
    } else if(this.emotionInsertVo.unrest ===''){
      this.alertUtilService.showAlert(null, '<p class="alert-message-center-font">불안의 정도를 선택해주세요.</p>');
    } else if(this.emotionInsertVo.petulance ===''){
      this.alertUtilService.showAlert(null, '<p class="alert-message-center-font">짜증의 정도를 선택해주세요.</p>');
    } else {
      this.saveEmotionDataAlert();
    }
  }

  async saveEmotionDataAlert(){
    const alert = await this.alertCtrl.create({
      header: '',
      message: '<p class="alert-message-font">선택하신 정서를 저장하시겠습니까?</p>',
      buttons: [
        {
          text: '예',
          handler: data => {
            console.log('예');
            this.saveEmotionData();
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

  // 정서 저장/수정
  saveEmotionData(){
    if(this.emotionInsertVo.feelingPositive === '' && this.emotionInsertVo.feelingNegative !== ''){
      this.emotionInsertVo.feelingPositive = 0;
    }
    if(this.emotionInsertVo.feelingPositive !== '' && this.emotionInsertVo.feelingNegative === ''){
      this.emotionInsertVo.feelingNegative = 0;
    }
    if(this.emotionInsertVo.energyPositive === '' && this.emotionInsertVo.energyNegative !== ''){
      this.emotionInsertVo.energyPositive = 0;
    }
    if(this.emotionInsertVo.energyPositive !== '' && this.emotionInsertVo.energyNegative === ''){
      this.emotionInsertVo.energyNegative = 0;
    }
    this.diaryService.saveEmotionDiary(this.emotionInsertVo).subscribe(res => {
      this.alertUtilService.showAlert(null, '<p class="alert-message-center-font">저장되었습니다.</p>');
      this.getDiaryList(this.selectedDate);
    }, err => {
      console.log('err', err);
    })
  }


  // 정서 저장 취소 > 입력값 초기화
  cancelEmotionDegree(){
    this.emotionInsertVo = {
      feelingPositive: '',
      feelingNegative: '',
      energyPositive: '',
      energyNegative: '',
      unrest: '',
      petulance: '',
      setDt : moment(new Date).format('YYYY-MM-DD')
    }
  }

  // 긍정/부정 입력 info 모달
  async showInformation(type) {
    this.mindManager.setModalONOff('ON');
    const modal = await this.modalController.create({
      component: EmotionInfoModalPage,
      cssClass: 'emotion_info_modal',
      componentProps: {
        type
      }
    });
    modal.onDidDismiss()
        .then(()=>{
          this.mindManager.setModalONOff('OFF');
        });
    return await modal.present();
  }
  /*-------------------------------------------*/

  // 공황 상세조회
  openPanicDetail(){
    if(this.panicDetailOpen === 'N') {
      this.panicDetailOpen = 'Y'
    } else {
      this.panicDetailOpen = 'N'
    }
  }

  // 음주 상세조회
  openDrinkDetail(){
    if(this.openYn.drinkDetailOpen === 'N') {
      this.openYn.drinkDetailOpen = 'Y'
    } else {
      this.openYn.drinkDetailOpen = 'N'
    }
  }

  // 카페인 상세조회
  openCaffeineDetail(){
    if(this.openYn.caffeineDetailOpen === 'N') {
      this.openYn.caffeineDetailOpen = 'Y'
    } else {
      this.openYn.caffeineDetailOpen = 'N'
    }
  }

  // 운동 상세조회
  openExDetail(){
    if(this.openYn.exDetailOpen === 'N') {
      this.openYn.exDetailOpen = 'Y'
    } else {
      this.openYn.exDetailOpen = 'N'
    }
  }

  // 페이지 이동
  goToPage(url, title) {
    this.pageInfoService.getToOtherPage('/main/main/diary', url, title).then(() => {
      const diaryDateInfo = this.mindManager.getDateBinding();
      if (diaryDateInfo) {
        diaryDateInfo.dirayDate = moment(this.selectedDate).format('YYYY-MM-DD');
        this.mindManager.setDateBinding(diaryDateInfo);
      } else {
        this.mindManager.setDateBinding({
          dirayDate : moment(this.selectedDate).format('YYYY-MM-DD')
        });
      }
      this.navController.navigateRoot([url]);
    });
  }

  dataReset(){
    this.allDiaryDataList = [];

    this.panicDataList = [];
    this.panicDetailOpen = 'N';
    this.totalPanicDuration = 0;

    this.emotionInsertVo = {
      feelingPositive: '',
      feelingNegative: '',
      energyPositive: '',
      energyNegative: '',
      unrest: '',
      petulance: '',
      setDt : moment(this.selectedDate).format('YYYY-MM-DD')
    }
    this.emotionDataList = [];

    this.openYn = {
      drinkDetailOpen: 'N',
      caffeineDetailOpen: 'N',
      exDetailOpen: 'N'
    }
    this.drinkList = [];
    this.drinkList= [];
    this.smokeList = {};
    this.caffeineList = [];
    this.mealList = {};
    this.exerciseList = [];
    this.periodList = {};

    this.totalMealCount = 0;

    this.chkDrinkWhen = {
      chkM : 'N',
      chkA : 'N',
      chkN : 'N'
    }
    this.chkCaffeineWhen = {
      chkM : 'N',
      chkA : 'N',
      chkN : 'N'
    }
    this.chkExerciseWhen = {
      chkM : 'N',
      chkA : 'N',
      chkN : 'N'
    }
  }
}
