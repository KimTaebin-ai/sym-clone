import { Component, OnInit } from '@angular/core';
import {AlertController} from '@ionic/angular';
import {AlertUtilService} from '../../../../../../util/common/alert-util.service';
import {MindManager} from '../../../../../../mind-module/mind.manager';
import * as moment from "moment";
import {DiaryService} from "../../../../../../mind-module/service/diary.service";
import {LoadingService} from "../../../../../../util/loading.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-pattern-period',
  templateUrl: './pattern-period.page.html',
  styleUrls: ['./pattern-period.page.scss'],
})
export class PatternPeriodPage implements OnInit {
  selectedDate = '';
  selectedDateKo = '';

  insertVo: any = {
    menstruationDt: this.selectedDate,
    menstruationYn: ''
  };

  periodList: any = [];

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
    this.getPeriodList();
  }

  getDirayDateInfo(date){
    this.selectedDate = date;
    this.selectedDateKo = moment(this.selectedDate).format('YYYY년 MM월 DD일 dddd');
    this.insertVo.menstruationDt = this.selectedDate;
  }

  // 생리 리스트 조회
  getPeriodList(){
    this.diaryService.getPeriodList(this.selectedDate).subscribe(res => {
      if(res.data) {
        this.periodList = res.data;
        this.insertVo.menstruationYn = res.data.menstruationYn;
      }
    }, err =>{
      console.log('err', err);
    });
  }

  // 시간대 선택
  selectPeriodInfo(type) {
    this.insertVo.menstruationYn = type;
  }

  // 생리 입력값 확인
  addPeriodDiaryChk(){
    if (this.insertVo.menstruationYn === '' || this.insertVo.menstruationYn === null) {
      this.alertUtilService.showAlert(null, '<p class="alert-message-font">생리 여부를 선택해 주세요.</p>');
      return false;
    }
    this.addPeriodDiaryAlert();

  }

  // 생리 추가 알림
  async addPeriodDiaryAlert() {
    const alert = await this.alertCtrl.create({
      header: '추가하기',
      message: '<p class="alert-message-font">저장하시겠습니까?</p>',
      buttons: [
        {
          text: '예',
          handler: data => {
            this.addPeriodDiary();
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

  // 생리 생활패턴 입력
  addPeriodDiary(){
    this.loadingService.showLoading(true, '생활패턴을 입력중입니다.');
    this.diaryService.addPeriodDiary(this.insertVo).subscribe(res => {
      this.loadingService.showLoading(false, '');
      this.getPeriodList();
      this.alertUtilService.showAlert(null, '<p class="alert-message-center-font">저장되었습니다.</p>');
    }, err =>{
      this.loadingService.showLoading(false, '');
      console.log('err', err);
    });
  }

}
