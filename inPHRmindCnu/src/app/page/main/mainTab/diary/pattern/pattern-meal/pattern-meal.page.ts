import { Component, OnInit } from '@angular/core';
import {AlertController} from '@ionic/angular';
import {AlertUtilService} from '../../../../../../util/common/alert-util.service';
import {MindManager} from "../../../../../../mind-module/mind.manager";
import * as moment from "moment";
import {DiaryService} from "../../../../../../mind-module/service/diary.service";
import {LoadingService} from "../../../../../../util/loading.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-pattern-meal',
  templateUrl: './pattern-meal.page.html',
  styleUrls: ['./pattern-meal.page.scss'],
})
export class PatternMealPage implements OnInit {
  selectedDate = '';
  selectedDateKo = '';

  totalMealCount = 0;

  insertVo: any = {
    breakfast: 'N',
    lunch: 'N',
    dinner: 'N',
    snackMorning: 'N',
    snackAfternoon: 'N',
    snackMidnight: 'N',
    eatDt: this.selectedDate
  };

  mealList: any = []

  constructor(
      private alertCtrl: AlertController,
      private alertUtilService: AlertUtilService,
      private mindManager: MindManager,
      private diaryService: DiaryService,
      private loadingService: LoadingService,
  ) { }

  ngOnInit() {
    const dateBindingInfo = this.mindManager.getDateBinding();
    if(dateBindingInfo) {
      this.getDirayDateInfo(dateBindingInfo.dirayDate);
    }
    moment.locale('ko');
    this.getMealList();
  }

  getDirayDateInfo(date){
    this.selectedDate = date;
    this.selectedDateKo = moment(this.selectedDate).format('YYYY년 MM월 DD일 dddd');
    this.insertVo.eatDt = this.selectedDate;
  }

  // 식사 리스트 조회
  getMealList(){
    this.diaryService.getMealList(this.selectedDate).subscribe(res => {
      if(res.data) {
        this.mealList = res.data;
        this.insertVo.breakfast = this.mealList.breakfast;
        this.insertVo.lunch = this.mealList.lunch;
        this.insertVo.dinner = this.mealList.dinner;
        this.insertVo.snackMorning = this.mealList.snackMorning;
        this.insertVo.snackAfternoon = this.mealList.snackAfternoon;
        this.insertVo.snackMidnight = this.mealList.snackMidnight;

        this.totalMealCount = 0;
        if(this.mealList.breakfast === 'Y'){
          this.totalMealCount = this.totalMealCount + 1
        }
        if(this.mealList.lunch === 'Y'){
          this.totalMealCount = this.totalMealCount + 1
        }
        if(this.mealList.dinner === 'Y'){
          this.totalMealCount = this.totalMealCount + 1
        }
        if(this.mealList.snackMorning === 'Y'){
          this.totalMealCount = this.totalMealCount + 1
        }
        if(this.mealList.snackAfternoon === 'Y'){
          this.totalMealCount = this.totalMealCount + 1
        }
        if(this.mealList.snackMidnight === 'Y'){
          this.totalMealCount = this.totalMealCount + 1
        }
      }
    }, err =>{
      console.log('err', err);
    });
  }

  // 시간대 선택
  selectMeaalInfo(time) {
    if (time === 'breakfast') {
      if (this.insertVo.breakfast === 'Y') {
        this.insertVo.breakfast = 'N';
      } else {
        this.insertVo.breakfast = 'Y';
      }
    }
    if (time === 'lunch') {
      if (this.insertVo.lunch === 'Y') {
        this.insertVo.lunch = 'N';
      } else {
        this.insertVo.lunch = 'Y';
      }
    }
    if (time === 'dinner') {
      if (this.insertVo.dinner === 'Y') {
        this.insertVo.dinner = 'N';
      } else {
        this.insertVo.dinner = 'Y';
      }
    }
    if (time === 'snackMorning') {
      if (this.insertVo.snackMorning === 'Y') {
        this.insertVo.snackMorning = 'N';
      } else {
        this.insertVo.snackMorning = 'Y';
      }
    }
    if (time === 'snackAfternoon') {
      if (this.insertVo.snackAfternoon === 'Y') {
        this.insertVo.snackAfternoon = 'N';
      } else {
        this.insertVo.snackAfternoon = 'Y';
      }
    }
    if (time === 'snackMidnight') {
      if (this.insertVo.snackMidnight === 'Y') {
        this.insertVo.snackMidnight = 'N';
      } else {
        this.insertVo.snackMidnight = 'Y';
      }
    }
  }

  // 식사 입력값 확인
  addMealDiaryChk(){
    if (this.insertVo.breakfast === 'N' && this.insertVo.lunch === 'N' && this.insertVo.dinner === 'N' && this.insertVo.snackMorning === 'N' && this.insertVo.snackAfternoon === 'N' && this.insertVo.snackMidnight === 'N') {
      this.alertUtilService.showAlert(null, '<p class="alert-message-font">식사 여부를 선택해 주세요.</p>');
      return false;
    }
    this.addMealDiaryAlert();

  }

  // 식사 추가 알림
  async addMealDiaryAlert() {
    const alert = await this.alertCtrl.create({
      header: '저장하기',
      message: '<p class="alert-message-font">저장하시겠습니까?</p>',
      buttons: [
        {
          text: '예',
          handler: data => {
            this.addMealDiary();
          }
        },
        {
          text: '아니요',
          role: 'cancel',
          handler: data => {
          }
        }
      ]
    });
    await alert.present();
  }

  // 식사 생활패턴 입력
  addMealDiary() {
    this.loadingService.showLoading(true, '생활패턴을 입력중입니다.');
    this.diaryService.addMealDiary(this.insertVo).subscribe(res => {
      this.loadingService.showLoading(false, '');
      this.alertUtilService.showAlert(null, '<p class="alert-message-center-font">저장되었습니다.</p>');
      this.getMealList();
    }, err =>{
      this.loadingService.showLoading(false, '');
      console.log('err', err);
    });
  }
}
