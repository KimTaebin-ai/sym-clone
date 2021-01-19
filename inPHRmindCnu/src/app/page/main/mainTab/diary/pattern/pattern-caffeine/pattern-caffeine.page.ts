import { Component, OnInit } from '@angular/core';
import {AlertController} from '@ionic/angular';
import {AlertUtilService} from '../../../../../../util/common/alert-util.service';
import {MindManager} from "../../../../../../mind-module/mind.manager";
import {DiaryService} from "../../../../../../mind-module/service/diary.service";
import * as moment from "moment";
import {LoadingService} from "../../../../../../util/loading.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-pattern-caffeine',
  templateUrl: './pattern-caffeine.page.html',
  styleUrls: ['./pattern-caffeine.page.scss'],
})
export class PatternCaffeinePage implements OnInit {

  today = moment(new Date).format('YYYY-MM-DD');
  selectedDate = '';
  selectedDateKo = '';

  etcCode = '';

  insertVo: any = {
    caffeineAmount : '',
    caffeineCode : '',
    caffeineDt : this.selectedDate,
    caffeineEtc : null,
    caffeineWhen: ''
  };

  caffeineList: any = [];
  caffeineCodeList : any = [];

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
    this.getCaffeineList();
    this.getCaffeineCodeList();
  }

  getDirayDateInfo(date){
    this.selectedDate = date;
    this.selectedDateKo = moment(this.selectedDate).format('YYYY년 MM월 DD일 dddd');
    this.insertVo.caffeineDt = this.selectedDate;
  }

  // 카페인 리스트 조회
  getCaffeineList(){
    this.diaryService.getCaffeineList(this.selectedDate).subscribe(res => {
      if(res.data) {
        this.caffeineList = res.data;
        for(let i = 0; i < this.caffeineList.length; i++){
          if(this.caffeineList[i].caffeineWhen === 'M'){
            this.chkWhen.chkM = 'Y'
          }
          if(this.caffeineList[i].caffeineWhen === 'A'){
            this.chkWhen.chkA = 'Y'
          }
          if(this.caffeineList[i].caffeineWhen === 'N'){
            this.chkWhen.chkN = 'Y'
          }
        }
      }
      console.log('caffeineList', this.caffeineList);
    }, err =>{
      console.log('err', err);
    });
  }

  // 카페인 종류 리스트 조회
  getCaffeineCodeList(){
    this.diaryService.getCodeList('caffeine').subscribe(res => {
      this.caffeineCodeList = res.data;
      for(let i = 0; i < this.caffeineCodeList.length; i++){
        if(this.caffeineCodeList[i].userInput === 'Y'){
          this.etcCode = this.caffeineCodeList[i].codeSeq;
        }
      }
      console.log('caffeineCodeList', this.caffeineCodeList);
    }, err =>{
      console.log('err', err);
    });
  }

  // 입력창 유닛 설정
  checkUnit(caffeineCode){
    if(this.caffeineCodeList.length) {
      const index = this.caffeineCodeList.findIndex(obj => obj.codeSeq == caffeineCode);
      const unit = this.caffeineCodeList[index].unit;

      return unit;
    }
  }

  // 시간대 선택
  selectDay(time) {
    this.insertVo.caffeineWhen = time;
  }

  // 카페인 입력값 확인
  addCaffeineDiaryChk(){
    if (this.insertVo.caffeineWhen === '') {
      this.alertUtilService.showAlert(null, '<p class="alert-message-font">카페인을 섭취한 시간을 선택해 주세요.</p>');
      return false;
    } else if (this.insertVo.caffeineCode === '') {
      this.alertUtilService.showAlert(null, '<p class="alert-message-font">섭취한 카페인의 종류를 입력해 주세요.</p>');
      return false;
    } else if (this.insertVo.caffeineCode == this.etcCode && this.insertVo.caffeineEtc === null || this.insertVo.caffeineCode == this.etcCode && this.insertVo.caffeineEtc === '') {
      this.alertUtilService.showAlert(null, '<p class="alert-message-font">기타 카페인의 종류를 입력해 주세요.</p>')
      return false;
    } else if (this.insertVo.caffeineAmount === '' || this.insertVo.caffeineAmount === null) {
      this.alertUtilService.showAlert(null, '<p class="alert-message-font">섭취한 카페인의 양을 입력해 주세요.</p>');
      return false;
    }
    this.addCaffeineDiaryAlert();
  }

  // 카페인 추가 알림
  async addCaffeineDiaryAlert() {
    const alert = await this.alertCtrl.create({
      header: '추가하기',
      message: '<p class="alert-message-font">추가하시겠습니까?</p>',
      buttons: [
        {
          text: '예',
          handler: data => {
            this.addCaffeineDiary();
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

  // 카페인 생활패턴 입력
  addCaffeineDiary() {
    this.loadingService.showLoading(true, '생활패턴을 입력중입니다.');
    this.diaryService.addCaffeineDiary(this.insertVo).subscribe(res => {
      this.loadingService.showLoading(false, '');
      this.alertUtilService.showAlert(null, '<p class="alert-message-center-font">추가되었습니다.</p>');
      this.getCaffeineList();
      this.dataReset();
    }, err =>{
      this.loadingService.showLoading(false, '');
      console.log('err', err);
    });
  }

  // 카페인 삭제 확인창
  async deleteCaffeineAlert(caffeineDetail) {
    const alert = await this.alertCtrl.create({
      header: '삭제하기',
      message: '<p class="alert-message-font">선택하신 목록을 삭제하시겠습니까?</p>',
      buttons: [
        {
          text: '예',
          handler: data => {
            this.deleteCaffeineDiary(caffeineDetail);
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
  // 카페인 삭제
  deleteCaffeineDiary(caffeineDetail) {
    const deleteVo = {
      code : caffeineDetail.caffeineCode,
      date : this.selectedDate,
      etc : caffeineDetail.caffeineEtc,
      when : caffeineDetail.caffeineWhen
    }
    if(caffeineDetail.caffeineCode === this.etcCode) {
      this.diaryService.deleteCaffeineDiaryEtc(deleteVo).subscribe(res => {
        this.alertUtilService.showAlert(null, '<p class="alert-message-center-font">삭제되었습니다.</p>');
        this.dataReset();
        this.getCaffeineList();
      }, err => {
        console.log('err', err);
      });
    } else {
      this.diaryService.deleteCaffeineDiary(deleteVo).subscribe(res => {
        this.alertUtilService.showAlert(null, '<p class="alert-message-center-font">삭제되었습니다.</p>');
        this.dataReset();
        this.getCaffeineList();
      }, err => {
        console.log('err', err);
      });
    }
  }

  // input 데이터 초기화
  dataReset(){
    this.insertVo = {
      caffeineAmount : '',
      caffeineCode : '',
      caffeineDt : this.selectedDate,
      caffeineEtc : null,
      caffeineWhen: ''
    };
    this.caffeineList = [];
    this.chkWhen = {
      chkM : 'N',
      chkA : 'N',
      chkN : 'N'
    }
  }

}
