import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import * as moment from 'moment';
import {CalendarService} from '../../../mind-module/service/calendar.service';
import {AlertUtilService} from '../../../util/common/alert-util.service';
import {CodeService} from '../../../services/code.service';
import {environment} from '../../../../environments/environment';
import {ResponseCode} from '../../../mind-module/data/response.data';
import {LoadingService} from '../../../util/loading.service';

@Component({
  selector: 'app-diary-reg-modal',
  templateUrl: './diary-reg-modal.page.html',
  styleUrls: ['./diary-reg-modal.page.scss'],
})
export class DiaryRegModalPage implements OnInit, OnDestroy {

  // 기분-----------------
  // 기쁨: PLEASURE
  // 행복: HAPPINESS
  // 설렘: FLUTTER
  // 우울: DEPRESSED
  // 슬픔: SADNESS
  // 후회: REGRET
  // 짜증: PETULANCE
  // 분노: ANGER
  // 무난: NORMAL
  // ----------------------


  @Input() date: string;
  @Input() type: string;
  @Input() calendarSeq: string;

  urlForenImg = environment.simApi + '/api/file/';
  selectedEm = '';

  feelingInfo: any = {
    content: '',
    diaryTime: '',
  }

  feelingEnList: any = [];

  regResult = false;

  constructor(
      private modalController: ModalController,
      private calenderService: CalendarService,
      private alertUtilService: AlertUtilService,
      private codeService: CodeService,
      private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.codeService.getGroupCodeList('feeling').subscribe(res => {
      console.log(res)
      // 감정 이모티콘 3개 단위로 나누기
      const len = res.length;
      const cnt = Math.floor(len / 3) + (Math.floor(len % 3) > 0 ? 1 : 0);
      console.log('cnt : ' + cnt);
      for (let i = 0; i < cnt; i++) {
        this.feelingEnList.push(res.splice(0, 3));
      }
      console.log('feelingEnList : ' , this.feelingEnList);
    }, err => {});
    if (this.type === 'UPDATE') {
      this.getCalendarInfo();
    }
  }

  ngOnDestroy(): void {
    this.selectedEm = '';
    this.feelingInfo.content = '';
    this.feelingInfo.diaryTime = '';
  }

  getCalendarInfo() {
    this.calenderService.getCalendarInfo(this.calendarSeq).subscribe(res => {
      this.feelingInfo.content = res.content;
      this.selectedEm = res.feelingCode.toString();
      this.feelingInfo.diaryTime = moment(res.diaryDt).format('HH:mm');
    }, err => {
      if (err.code !== ResponseCode.NO_MATCHING) {
        this.alertUtilService.showAlert(null, '데이터를 불러오는 도중 오류가 발생하였습니다.');
      }
      this.selectedEm = '';
      this.feelingInfo.content = '';
      this.feelingInfo.diaryTime = '';
    })
  }

  selectEm(em) {
    if (this.selectedEm === em) {
      this.selectedEm = '';
    } else {
      this.selectedEm = em;
    }
  }

  checkValidation() {
    const returnData = !this.feelingInfo.content || !this.feelingInfo.diaryTime || !this.selectedEm ? false : true;
    return returnData;
  }

  regCalendar(){
    const reqVo: any = {
      content: this.feelingInfo.content,
      diaryDt: '',
      feelingCode: this.selectedEm
    };
    this.loadingService.showLoading(true, '일기를 등록 중입니다.');
    if (this.type === 'UPDATE') {
      reqVo.calendarSeq = this.calendarSeq;
      reqVo.diaryDt = moment(this.date + ' ' + this.feelingInfo.diaryTime).format('YYYY-MM-DD HH:mm');
      this.updateCalendar(reqVo);
    } else {
      reqVo.diaryDt = moment(this.date + ' ' + moment(this.feelingInfo.diaryTime).format('HH:mm')).format('YYYY-MM-DD HH:mm');
      this.insertCalendar(reqVo);
    }
  }

  dateFormat() {
    this.feelingInfo.diaryTime = moment(this.feelingInfo.diaryTime).format('HH:mm');
    console.log('date', moment(this.feelingInfo.diaryTime).format('HH:mm')); // 2019-04-22
  }

  insertCalendar(reqVo) {
    this.calenderService.insertCalendar(reqVo).subscribe(res => {
      this.alertUtilService.showAlert(null, res);
      this.loadingService.showLoading(false, '');
      this.regResult = true;
      this.dismiss();
    }, err => {
      this.alertUtilService.showAlert(null, err);
      this.loadingService.showLoading(false, '');
    });
  }

  updateCalendar(reqVo) {
    this.calenderService.updateCalendar(reqVo).subscribe(res => {
      this.alertUtilService.showAlert(null, res);
      this.loadingService.showLoading(false, '');
      this.regResult = true;
      this.dismiss();
    }, err => {
      this.alertUtilService.showAlert(null, err);
      this.loadingService.showLoading(false, '');
    });
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
      regResult: this.regResult
    });
  }

  // 데이터 포멧
  formatDate(date) {
    return moment(date).format('YYYY년 MM월 DD일');
  }

/*  // 시간 포멧
  formatTime() {
    alert(this.feelingInfo.diaryTime)
    this.feelingInfo.diaryTime = moment(this.feelingInfo.diaryTime).format('HH:mm');
    alert(this.feelingInfo.diaryTime)
    console.log(this.feelingInfo)
  }*/
}
