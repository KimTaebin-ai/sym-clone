import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MindManager} from '../../../../../mind-module/mind.manager';
import {AlertController, NavController} from '@ionic/angular';
import {DiaryService} from '../../../../../mind-module/service/diary.service';
import * as moment from 'moment';
import {AlertUtilService} from '../../../../../util/common/alert-util.service';
import {LoadingService} from '../../../../../util/loading.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-panic-diary',
  templateUrl: './panic-diary.page.html',
  styleUrls: ['./panic-diary.page.scss'],
})
export class PanicDiaryPage implements OnInit {

    selectedDate = '';
    selectedDateKo = '';

    panicInsertVo: any = {
      startTime : '',
      panicTime : '',
      panicIntensity : 0,
      symptoms : [],
    };
    panicInsertEtc = {
      etcValueYn : 'N',
      etcValue : '',
      etcCode : ''
    };
    panicDataList: any = [];

    // 동반증상 리스트
    panicSymptomList: any = [];
    symptomClickList: any = [];

  constructor(
      private alertCtrl: AlertController,
      private alertUtilService: AlertUtilService,
      private navController: NavController,
      private mindManager: MindManager,
      private diaryService: DiaryService,
      private loadingService: LoadingService,
  ) { }

    @ViewChild('panicChild') private panic;

  ngOnInit() {
    const dateBindingInfo = this.mindManager.getDateBinding();
    if(dateBindingInfo) {
      this.getDirayDateInfo(dateBindingInfo.dirayDate);
    }

    this.getPanicList();
    this.getPanicSymptomList();
  }

    getDirayDateInfo(date){
      this.selectedDate = date;
      this.selectedDateKo = moment(this.selectedDate).format('YYYY년 MM월 DD일 dddd');
    }

  // 일간 공황 리스트 조회
    getPanicList(){
      const date = this.selectedDate;
      console.log('date', date);
        this.diaryService.getPanicList(date).subscribe(res => {
            console.log('resTs', res, res.data);
            if(res.data) {
                this.panicDataList = res.data;
            }
        }, err => {
            console.log('err', err);
        })

    }

    // 공황 동반증상 리스트 조회
    getPanicSymptomList(){
      this.diaryService.getCodeList('panicSymptom').subscribe(res => {
        if(res.data) {
            this.panicSymptomList = res.data;
            for (let i = 0; i < this.panicSymptomList.length; i++) {
                this.symptomClickList.push('N');
            }
        }
      }, err => {
          console.log('err', err);
      })
    }

    // 공황 강도 선택
    clickPanicDegree(degree){
      this.panicInsertVo.panicIntensity = degree;
    }

    // 공황 증상 선택
    clickPanicSymptom(symptom, symptomNum) {
      for(let i = 0; i < this.panicSymptomList.length; i++){
          if(i === symptomNum){
              if(this.symptomClickList[i] === 'N'){
                  this.symptomClickList[i] = 'Y';
              } else {
                  this.symptomClickList[i] = 'N';
              }
          }
      }

      if(symptom.codeId === 'etc'){
          if(this.panicInsertEtc.etcValueYn === 'N'){
              this.panicInsertEtc.etcValueYn = 'Y';
              this.panicInsertEtc.etcCode = symptom.codeSeq;
          } else {
              this.panicInsertEtc.etcValueYn = 'N';
              this.panicInsertEtc.etcValue = '';
          }
      }

      const search = this.panicInsertVo.symptoms.findIndex(function (item) {return item.symptomCode === symptom.codeSeq}); // 동반증상 리스트에 해당 codeSeq가 있는지 확인
      if(search !== -1){ // 있으면
        this.panicInsertVo.symptoms.splice(search, 1); // 리스트에서 제거
      } else { // 리스트에 없으면
          if(symptom.codeId === 'etc'){ // 기타일때
              this.panicInsertVo.symptoms.push({symptomCode: this.panicInsertEtc.etcCode, symptomEtc: this.panicInsertEtc.etcValue});
          } else { // 기타가 아닐때
              this.panicInsertVo.symptoms.push({symptomCode: symptom.codeSeq});
          }
      }
    }

    // 공황 추가 확인창
    async addPanicDiaryChk() {
        const index = this.panicInsertVo.symptoms.findIndex(obj => obj.symptomCode === this.panicInsertEtc.etcCode); // 동반증상리스트에 기타가 있는지 확인
        if(index !== -1){ // 있으면
            this.panicInsertVo.symptoms.splice(index, 1); // 제거
            this.panicInsertVo.symptoms.push({symptomCode: this.panicInsertEtc.etcCode, symptomEtc: this.panicInsertEtc.etcValue}); // 기타입력값까지 삽입
        }
         if(this.panicInsertVo.startTime === ''){
             this.alertUtilService.showAlert(null, '시작시간을 선택해 주세요.');
            return false;
        } else if(this.panicInsertVo.panicTime === ''){
            this.alertUtilService.showAlert(null, '지속시간을 선택해 주세요.');
            return false;
        } else if(this.panicInsertVo.panicIntensity === 0){
            this.alertUtilService.showAlert(null, '증상강도를 선택해 주세요.');
            return false;
        } else if(this.panicInsertVo.symptoms.length == 0){
            this.alertUtilService.showAlert(null, '동반증상을 선택해 주세요.');
            return false;
        } else if(this.panicInsertEtc.etcValueYn === 'Y' && this.panicInsertEtc.etcValue === ''){
            this.alertUtilService.showAlert(null, '기타 공황 동반증상을 입력해 주세요.');
            return false;
        } else {
            const alert = await this.alertCtrl.create({
                header: '',
                message: '<p class="alert-message-font">해당 공황상황을 추가하시겠습니까?</p>',
                buttons: [
                    {
                        text: '예',
                        handler: data => {
                            console.log('예');
                            this.addPanicDiary();
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
    }

    // 공황 추가
    async addPanicDiary(){
          const reqVo = {
              startDt : this.selectedDate + ' ' + moment(this.panicInsertVo.startTime).format('HH:mm'),
              panicTime : this.panicInsertVo.panicTime,
              panicIntensity : this.panicInsertVo.panicIntensity,
              symptoms : this.panicInsertVo.symptoms
          };
          console.log('reqVo', reqVo);
          this.loadingService.showLoading(true, '공황 다이어리를 입력중입니다.');

        //   this.diaryService.addPanicDiary(reqVo).subscribe(() => {
        //       this.getPanicList();
        //   }, err => {
        //       this.loadingService.showLoading(false, '');
        //       console.log('err', err);
        //   })

        this.diaryService.addPanicDiary(reqVo);
        this.getPanicList();
            this.loadingService.showLoading(false, '');
            this.alertUtilService.showAlert(null, '추가되었습니다.');
            this.dataReset();
            await this.scrollBottom();
    }

    // 공황 삭제 확인창
    async deletePanicDiaryChk(panicSeq) {
      const alert = await this.alertCtrl.create({
          header: '',
          message: '<p class="alert-message-font">선택하신 공황 증상을 삭제하시겠습니까?</p>',
          buttons: [
              {
                  text: '예',
                  handler: data => {
                      console.log('예');
                      this.deletePanicDiary(panicSeq);
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

    // 공황 삭제
    deletePanicDiary(panicSeq){
      this.diaryService.deletePanicDiary(panicSeq).subscribe(res => {
          this.alertUtilService.showAlert(null, '삭제되었습니다.');
          this.getPanicList();
      }, err => {
          console.log('err', err);
      })
    }

    dataReset(){
      this.panicInsertVo = {
          startTime : '',
          panicTime : '',
          panicIntensity : 0,
          symptoms : [],
      };
      this.panicInsertEtc = {
          etcValueYn : 'N',
          etcValue : '',
          etcCode : ''
      };
      this.panicDataList = [];

      this.symptomClickList = [];
      for(let i = 0; i < this.panicSymptomList.length; i++){
        this.symptomClickList.push('N');
      }
    }

    scrollBottom() {
        console.log('스크롤 함');
        
        this.panic.scrollToBottom();
    }

}
