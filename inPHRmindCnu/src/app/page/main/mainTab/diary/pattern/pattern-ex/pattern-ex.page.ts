import { Component, OnInit } from '@angular/core';
import {AlertController} from '@ionic/angular';
import {AlertUtilService} from '../../../../../../util/common/alert-util.service';
import {MindManager} from "../../../../../../mind-module/mind.manager";
import {DiaryService} from "../../../../../../mind-module/service/diary.service";
import * as moment from "moment";
import {LoadingService} from "../../../../../../util/loading.service";

@Component({
  selector: 'app-pattern-ex',
  templateUrl: './pattern-ex.page.html',
  styleUrls: ['./pattern-ex.page.scss'],
})
export class PatternExPage implements OnInit {

  today = moment(new Date).format('YYYY-MM-DD');
  etcCode = '';

  insertVo: any = {
    exerciseCode: '',
    exerciseDt: this.today,
    exerciseEtc: null,
    exerciseTime: '',
    exerciseWhen: ''
  };

  exerciseList: any = [];
  exCodeList : any = [];

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
      private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.getExList();
    this.getExCodeList();

  }

  // 운동 리스트 조회
  getExList(){
    this.diaryService.getExList(this.today).subscribe(res => {
      if(res.data) {
        this.exerciseList = res.data;
        for(let i = 0; i < this.exerciseList.length; i++){
          if(this.exerciseList[i].exerciseWhen === 'M'){
            this.chkWhen.chkM = 'Y'
          }
          if(this.exerciseList[i].exerciseWhen === 'A'){
            this.chkWhen.chkA = 'Y'
          }
          if(this.exerciseList[i].exerciseWhen === 'N'){
            this.chkWhen.chkN = 'Y'
          }
        }
      }
      console.log('exerciseList', this.exerciseList);
    }, err =>{
      console.log('err', err);
    });
  }

  // 운동 종류 리스트 조회
  getExCodeList(){
    this.diaryService.getCodeList('exercise').subscribe(res => {
      this.exCodeList = res.data;
      for(let i = 0; i < this.exCodeList.length; i++){
        if(this.exCodeList[i].userInput === 'Y'){
          this.etcCode = this.exCodeList[i].codeSeq;
        }
      }
      console.log('exCodeList', this.exCodeList);
    }, err =>{
      console.log('err', err);
    });
  }


  // 시간대 선택
  selectDay(time) {
    this.insertVo.exerciseWhen = time;
  }

  // 운동 입력값 확인
  addExDiaryChk(){
    if (this.insertVo.exerciseWhen === '') {
      this.alertUtilService.showAlert(null, '<p class="alert-message-font">운동한 시간대를 선택해 주세요.</p>');
      return false;
    } else if (this.insertVo.exerciseCode === '') {
      this.alertUtilService.showAlert(null, '<p class="alert-message-font">운동의 종류를 입력해 주세요.</p>');
      return false;
    } else if (this.insertVo.exerciseCode == this.etcCode && this.insertVo.exerciseEtc === null || this.insertVo.exerciseCode == this.etcCode && this.insertVo.exerciseEtc === '') {
      this.alertUtilService.showAlert(null, '<p class="alert-message-font">기타 운동의 종류를 입력해 주세요.</p>')
      return false;
    } else if (this.insertVo.exerciseTime === '' || this.insertVo.exerciseTime === null) {
      this.alertUtilService.showAlert(null, '<p class="alert-message-font">운동한 시간을 입력해 주세요.</p>');
      return false;
    }
    this.addExDiaryAlert();
  }


  // 리스트 추가 확인창
  async addExDiaryAlert() {
    const alert = await this.alertCtrl.create({
      header: '추가하기',
      message: '<p class="alert-message-font">추가하시겠습니까?</p>',
      buttons: [
        {
          text: '예',
          handler: data => {
            this.addExDiary();
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

  // 운동 생활패턴 입력
  addExDiary() {
    this.loadingService.showLoading(true, '생활패턴을 입력중입니다.');
    this.diaryService.addExDiary(this.insertVo).subscribe(res => {
      this.loadingService.showLoading(false, '');
      this.alertUtilService.showAlert(null, '<p class="alert-message-center-font">추가되었습니다.</p>');
      this.getExList();
      this.dataReset();
    }, err =>{
      this.loadingService.showLoading(false, '');
      console.log('err', err);
    });
  }

  // 운동 삭제 확인창
  async deleteExAlert(exDetail) {
    const alert = await this.alertCtrl.create({
      header: '삭제하기',
      message: '<p class="alert-message-font">선택하신 목록을 삭제하시겠습니까?</p>',
      buttons: [
        {
          text: '예',
          handler: data => {
            this.deleteExDiary(exDetail);
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
  // 운동 삭제
  deleteExDiary(exDetail){
    const deleteVo = {
      code : exDetail.exerciseCode,
      date : this.today,
      etc : exDetail.exerciseEtc,
      when : exDetail.exerciseWhen
    }
    if(exDetail.exerciseCode === this.etcCode) {
      console.log('etc');
      this.diaryService.deleteExDiaryEtc(deleteVo).subscribe(res => {
        this.alertUtilService.showAlert(null, '<p class="alert-message-center-font">삭제되었습니다.</p>');
        this.dataReset();
        this.getExList();
      }, err => {
        console.log('err', err);
      });
    } else {
      console.log('etcX');
      this.diaryService.deleteExDiary(deleteVo).subscribe(res => {
        this.alertUtilService.showAlert(null, '<p class="alert-message-center-font">삭제되었습니다.</p>');
        this.dataReset();
        this.getExList();
      }, err => {
        console.log('err', err);
      });
    }
  }

  // input 데이터 초기화
  dataReset(){
    this.insertVo = {
      exerciseCode: '',
      exerciseDt: this.today,
      exerciseEtc: null,
      exerciseTime: '',
      exerciseWhen: ''
    };
    this.exerciseList = [];
    this.chkWhen = {
      chkM : 'N',
      chkA : 'N',
      chkN : 'N'
    }
  }
}
