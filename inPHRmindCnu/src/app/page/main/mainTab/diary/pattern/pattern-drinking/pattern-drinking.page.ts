import { Component, OnInit } from '@angular/core';
import {AlertController} from '@ionic/angular';
import {AlertUtilService} from '../../../../../../util/common/alert-util.service';
import {MindManager} from '../../../../../../mind-module/mind.manager';
import {DiaryService} from "../../../../../../mind-module/service/diary.service";
import * as moment from "moment";
import {LoadingService} from "../../../../../../util/loading.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-pattern-drinking',
  templateUrl: './pattern-drinking.page.html',
  styleUrls: ['./pattern-drinking.page.scss'],
})
export class PatternDrinkingPage implements OnInit {
  selectedDate = '';
  selectedDateKo = '';

  etcCode = '';

  insertVo: any = {
    drinkAmount : '',
    drinkCode : '',
    drinkDt : this.selectedDate,
    drinkEtc : null,
    drinkWhen : ''
  };

  drinkList: any = [];
  drinkCodeList : any = [];

  chkWhen = {
    chkM : 'N',
    chkA : 'N',
    chkN : 'N'
  }

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
    this.getDrinkList();
    this.getDrinkCodeList();
  }

  getDirayDateInfo(date){
    this.selectedDate = date;
    this.selectedDateKo = moment(this.selectedDate).format('YYYY년 MM월 DD일 dddd');
    this.insertVo.drinkDt = this.selectedDate;
  }

  // 음주 리스트 조회
  getDrinkList(){
    this.diaryService.getDrinkList(this.selectedDate).subscribe(res => {
      if(res.data) {
        this.drinkList = res.data;
        for(let i = 0; i < this.drinkList.length; i++){
          if(this.drinkList[i].drinkWhen === 'M'){
            this.chkWhen.chkM = 'Y'
          }
          if(this.drinkList[i].drinkWhen === 'A'){
            this.chkWhen.chkA = 'Y'
          }
          if(this.drinkList[i].drinkWhen === 'N'){
            this.chkWhen.chkN = 'Y'
          }
        }
      }
    }, err =>{
      console.log('err', err);
    });
  }

  // 주종 리스트 조회
  getDrinkCodeList(){
    this.diaryService.getCodeList('alcohol').subscribe(res => {
      if(res.data) {
        this.drinkCodeList = res.data;
        for (let i = 0; i < this.drinkCodeList.length; i++) {
          if (this.drinkCodeList[i].userInput === 'Y') {
            this.etcCode = this.drinkCodeList[i].codeSeq;
          }
        }
      }
      console.log('drinkCodeList', this.drinkCodeList);
    }, err =>{
      console.log('err', err);
    });
  }

  // 유닛 설정
  checkUnit(drinkCode){
    if(this.drinkCodeList.length) {
      const index = this.drinkCodeList.findIndex(obj => obj.codeSeq == drinkCode);
      const unit = this.drinkCodeList[index].unit;

      return unit;
    }
  }

  // 시간대 선택
  selectDay(time) {
    this.insertVo.drinkWhen = time;
  }

  // 음주 입력값 확인
  addDrinkDiaryChk(){
    if (this.insertVo.drinkWhen === '') {
      this.alertUtilService.showAlert(null, '<p class="alert-message-font">음주한 시간을 선택해 주세요.</p>');
      return false;
    } else if (this.insertVo.drinkCode === '') {
      this.alertUtilService.showAlert(null, '<p class="alert-message-font">술의 종류를 입력해 주세요.</p>');
      return false;
    } else if (this.insertVo.drinkCode == this.etcCode && this.insertVo.drinkEtc === null || this.insertVo.drinkCode == this.etcCode && this.insertVo.drinkEtc === '') {
      this.alertUtilService.showAlert(null, '<p class="alert-message-font">기타 술의 종류를 입력해 주세요.</p>')
      return false;
    } else if (this.insertVo.drinkAmount === '' || this.insertVo.drinkAmount === null) {
      this.alertUtilService.showAlert(null, '<p class="alert-message-font">술의 양을 입력해 주세요.</p>');
      return false;
    }

    this.addDrinkDiaryAlert();
  }

  // 음주 추가 알림
  async addDrinkDiaryAlert() {
    const alert = await this.alertCtrl.create({
      header: '추가하기',
      message: '<p class="alert-message-font">추가하시겠습니까?</p>',
      buttons: [
        {
          text: '예',
          handler: data => {
            this.addDrinkDiary();
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

  // 음주 생활패턴 입력
  addDrinkDiary() {
    this.loadingService.showLoading(true, '생활패턴을 입력중입니다.');
    this.diaryService.addDrinkDiary(this.insertVo).subscribe(res => {
      this.loadingService.showLoading(false, '');
      this.alertUtilService.showAlert(null, '<p class="alert-message-center-font">추가되었습니다.</p>');
      this.getDrinkList();
      this.dataReset();
    }, err =>{
      this.loadingService.showLoading(false, '');
      console.log('err', err);
    });
  }

  // 음주 삭제 확인창
  async deleteDrinkAlert(drinkDetail) {
    const alert = await this.alertCtrl.create({
      header: '삭제하기',
      message: '<p class="alert-message-font">선택하신 음주리스트를 삭제하시겠습니까?</p>',
      buttons: [
        {
          text: '예',
          handler: data => {
            this.deleteDrinkDiary(drinkDetail);
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
  // 음주 삭제
  deleteDrinkDiary(drinkDetail) {
    const deleteVo = {
      code : drinkDetail.drinkCode,
      date : this.selectedDate,
      etc : drinkDetail.drinkEtc,
      when : drinkDetail.drinkWhen
    }
    if(drinkDetail.drinkCode === this.etcCode) {
      this.diaryService.deleteDrinkDiaryEtc(deleteVo).subscribe(res => {
        this.alertUtilService.showAlert(null, '<p class="alert-message-center-font">삭제되었습니다.</p>');
        this.dataReset();
        this.getDrinkList();
      }, err => {
        console.log('err', err);
      });
    } else {
      this.diaryService.deleteDrinkDiary(deleteVo).subscribe(res => {
        this.alertUtilService.showAlert(null, '<p class="alert-message-center-font">삭제되었습니다.</p>');
        this.dataReset();
        this.getDrinkList();
      }, err => {
        console.log('err', err);
      });
    }
  }

  // input 데이터 초기화
  dataReset(){
    this.insertVo = {
      drinkAmount : '',
      drinkCode : '',
      drinkDt : this.selectedDate,
      drinkEtc : null,
      drinkWhen : ''
    }
    this.drinkList = [];
    this.chkWhen = {
      chkM : 'N',
      chkA : 'N',
      chkN : 'N'
    }
  }

}
