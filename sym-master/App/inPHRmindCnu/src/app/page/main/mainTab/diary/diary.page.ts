import {Component, OnDestroy, OnInit} from '@angular/core';
import * as moment from "moment";
import {AlertController, ModalController, NavController} from "@ionic/angular";

@Component({
  selector: 'app-diary',
  templateUrl: './diary.page.html',
  styleUrls: ['./diary.page.scss'],
})
export class DiaryPage implements OnInit, OnDestroy {
  fabButtonOpened = false;
  today = new Date();

  /*정서-----*/
  emotionInsertVo: any = {
    feelingDegree : [0, 0],
    energyDegree : [0, 0],
    unrestDegree : 0,
    annoyDegree : 0
  }
  emotionDegree
  emotionList = [];


  /*--------*/

  /*공황-----*/
  panicDetailOpen = 'N';
  panicDataList = [
    {
      startDate : '2020-11-29',
      startTime : '11:30',
      durationTime : '5',
      panicDegree : 2,
      symptomChoiceList : ['어지럼증', '오한(열감)', '비현실감(이인감)']
    },
    {
      startDate : '2020-12-03',
      startTime : '13:22',
      durationTime : '3',
      panicDegree : 5,
      symptomChoiceList : ['통제상실(미칠 것 같은 두려움)', '떨림']
    }
  ]
  totalPanicDuration : any = 0;

  /*--------*/

  /*생활패턴--*/
  drinkDetailOpen = 'N';
  smokeDetailOpen = 'N';
  caffeineDetailOpen = 'N';

  drinkingList: any = [
    {
      day: 'AFTERNOON',
      dayNm: '오후',
      dataList: [
        {
          type: 'SOJU',
          typeNm: '소주',
          count: 3
        },
        {
          type: 'YANGJU',
          typeNm: '양주',
          count: 2
        },
        {
          type: 'BEER',
          typeNm: '맥주',
          count: 3
        }
      ]
    }
  ]
  smokingAmount = 42;
  caffeineList: any = [
    {
      day: 'MORNING',
      dayNm: '오전',
      dataList: [
        {
          type: 'OFFICE ',
          typeNm: '회사 커피',
          count: 2
        }
      ]
    },
    {
      day: 'AFTERNOON',
      dayNm: '오후',
      dataList: [
        {
          type: 'CAFE',
          typeNm: '커피전문점 커피',
          count: 1
        }
      ]
    }
  ]
  /*--------*/

  constructor(
      private alertCtrl: AlertController,
      private modalController: ModalController,
      private navController: NavController
  ) { }

  ngOnInit() {
    console.log('Init');
    moment.locale('ko');
  }

  ngOnDestroy() {
    this.fabButtonOpened = false;
  }


  fabHandler(event): any {
    this.fabButtonOpened = event;
  }

  /*공황 --------------------------------------------------------*/
  // 공황 데이터 삭제
  async deletePanicData(index){
    const alert = await this.alertCtrl.create({
      header: '',
      message: '<p class="alert-message-font">선택하신 공황 증상을 삭제하시겠습니까?</p>',
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
  /*------------------------------------------------------------*/

  /*정서 --------------------------------------------------------*/
  // 정서 정도 선택
  clickFeeling(degree){
    if (degree > 0) { // 클릭한 값이 양수 일 때
      this.emotionInsertVo.feelingDegree[1] = degree;
    } else if (degree === 0) { // 클릭한 값이 0일 때
      if(this.emotionInsertVo.feelingDegree[0] === 0 || this.emotionInsertVo.feelingDegree[1] === 0){ // 0번 또는 1번 배열에 0이 있을 경우
        return false;
      } else { // 둘다 0이 없으면
        this.emotionInsertVo.feelingDegree = [0, 0];
      }
    } else { // 클릭한 값이 음수 일 때
      this.emotionInsertVo.feelingDegree[0] = degree;
    }
    console.log('feeling', this.emotionInsertVo.feelingDegree);
  }

  clickEnergy(degree){
    if (degree > 0) { // 클릭한 값이 양수 일 때
      this.emotionInsertVo.energyDegree[1] = degree;
    } else if (degree === 0) { // 클릭한 값이 0일 때
      if(this.emotionInsertVo.energyDegree[0] === 0 || this.emotionInsertVo.energyDegree[1] === 0){ // 0번 또는 1번 배열에 0이 있을 경우
        return false;
      } else { // 둘다 0이 없으면
        this.emotionInsertVo.energyDegree = [0, 0];
      }
    } else { // 클릭한 값이 음수 일 때
      this.emotionInsertVo.energyDegree[0] = degree;
    }
    console.log('energy', this.emotionInsertVo.energyDegree);
  }
  clickUnrest(degree){
    this.emotionInsertVo.unrestDegree = degree;
  }
  clickAnnoy(degree){
    this.emotionInsertVo.annoyDegree = degree;
  }

  //정서 저장
  saveEmotionDegree(){
    this.emotionList.push(this.emotionInsertVo);
    console.log('emotion', this.emotionList);
  }
  cancelEmotionDegree(){
    this.emotionDataReset();
  }
  emotionDataReset(){
    this.emotionInsertVo = {
      feelingDegree : [],
      energyDegree : [],
      unrestDegree : 0,
      annoyDegree : 0
    }
  }
  // 정서 수정
  modifyEmotionDegree(){

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
    if(this.drinkDetailOpen === 'N') {
      this.drinkDetailOpen = 'Y'
    } else {
      this.drinkDetailOpen = 'N'
    }
  }

  // 흡연 상세조회
  openSmokeDetail(){
    if(this.smokeDetailOpen === 'N') {
      this.smokeDetailOpen = 'Y'
    } else {
      this.smokeDetailOpen = 'N'
    }
  }

  // 카페인 상세조회
  openCaffeineDetail(){
    if(this.caffeineDetailOpen === 'N') {
      this.caffeineDetailOpen = 'Y'
    } else {
      this.caffeineDetailOpen = 'N'
    }
  }



  goToPage(url){
    this.navController.navigateRoot([url]);
  }


}
