import { Component, OnInit } from '@angular/core';
import {AlertController} from '@ionic/angular';
import {AlertUtilService} from '../../../../../../util/common/alert-util.service';
import {MindManager} from "../../../../../../mind-module/mind.manager";
import {DiaryService} from "../../../../../../mind-module/service/diary.service";
import * as moment from "moment";
import {LoadingService} from "../../../../../../util/loading.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-pattern-smoking',
  templateUrl: './pattern-smoking.page.html',
  styleUrls: ['./pattern-smoking.page.scss'],
})
export class PatternSmokingPage implements OnInit {
  selectedDate = '';
  selectedDateKo = '';

  insertVo: any = {
    smokeAmount: '',
    smokeDt: this.selectedDate
  };

  smokeList: any = [];

  constructor(
      private alertCtrl: AlertController,
      private alertUtilService: AlertUtilService,
      private mindManager: MindManager,
      private diaryService: DiaryService,
      private loadingService: LoadingService,
      private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const dateBindingInfo = this.mindManager.getDateBinding();
    if(dateBindingInfo) {
      this.getDirayDateInfo(dateBindingInfo.dirayDate);
    }
    moment.locale('ko');
    this.getSmokeList();
  }

  getDirayDateInfo(date){
    this.selectedDate = date;
    this.selectedDateKo = moment(this.selectedDate).format('YYYY년 MM월 DD일 dddd');
    this.insertVo.smokeDt = this.selectedDate;
  }

  // 흡연 리스트 조회
  getSmokeList(){
    this.diaryService.getSmokeList(this.selectedDate).subscribe(res => {
      if(res.data) {
        this.smokeList = res.data;
      }
    }, err =>{
      console.log('err', err);
    });
  }

  // 흡연 입력값 확인
  addSmokeDiaryChk(){
    if (this.insertVo.smokeAmount === '' || this.insertVo.smokeAmount === null) {
      this.alertUtilService.showAlert(null, '흡연한 담배의 갯수를 입력해주세요.');
      return false;
    } else {
      this.addSmokeDiaryAlert();
    }
  }

  // 흡연 추가 알림
  async addSmokeDiaryAlert() {
    const alert = await this.alertCtrl.create({
      header: '추가하기',
      message: '<p class="alert-message-font">추가하시겠습니까?</p>',
      buttons: [
        {
          text: '예',
          handler: data => {
            this.addSmokeDiary();
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

  // 흡연 생활패턴 입력
  addSmokeDiary() {
    this.loadingService.showLoading(true, '생활패턴을 입력중입니다.');
    this.diaryService.addSmokeDiary(this.insertVo).subscribe(res => {
      this.loadingService.showLoading(false, '');
      this.getSmokeList();
      this.dataReset();
      this.alertUtilService.showAlert(null, '추가되었습니다.');
    }, err =>{
      this.loadingService.showLoading(false, '');
      this.loadingService.showLoading(false, '');
      console.log('err', err);
    });
  }


  // 흡연 삭제 확인창
  async deleteSmokeAlert() {
    const alert = await this.alertCtrl.create({
      header: '삭제하기',
      message: '<p class="alert-message-font">해당 목록을 삭제하시겠습니까?</p>',
      buttons: [
        {
          text: '예',
          handler: data => {
            this.deleteSmokeDiary();
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
  // 흡연 삭제
  deleteSmokeDiary() {
    const date = this.selectedDate;
    this.diaryService.deleteSmokeDiary(date).subscribe(res => {
      console.log('resTs3', res);
      this.alertUtilService.showAlert(null, '삭제되었습니다.');
      this.dataReset();
      this.getSmokeList();
    }, err => {
      console.log('err', err);
    });
  }

  // 데이터 초기화
  dataReset(){
    this.insertVo = {
      smokeAmount: '',
      smokeDt: this.selectedDate
    };
    this.smokeList = [];
  }
}
