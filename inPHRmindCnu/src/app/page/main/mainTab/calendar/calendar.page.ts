import {Component, OnInit, ViewChild} from '@angular/core';
import {DiaryRegModalPage} from '../../../modal/diary-reg-modal/diary-reg-modal.page';
import * as moment from 'moment';
import {AlertController, IonContent, ModalController} from '@ionic/angular';
import {TermModalPage} from '../../../modal/term-modal/term-modal.page';
import {ResponseCode} from '../../../../mind-module/data/response.data';
import {AlertUtilService} from '../../../../util/common/alert-util.service';
import {CalendarService} from '../../../../mind-module/service/calendar.service';
import {environment} from '../../../../../environments/environment';
import {LoadingService} from '../../../../util/loading.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  symUrlForImg = environment.simApi + '/api/file/';

  // ---달력------------------------------------
  current: any = {
    dates: []
  };
  today: Date = new Date();
  selectedDate = '';
  // ----------------------------------------------

  // 일간 일기 리스트
  calendarList: any = [];
  // 월간 일기 리스트
  calendarMonthList: any = [];

  constructor(
      private alertCtrl: AlertController,
      private modalController: ModalController,
      private calendarService: CalendarService,
      private alertUtilService: AlertUtilService,
      private loadingService: LoadingService
  ) { }

  ngOnInit() {
    moment.locale('ko', {
      weekdays: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
      weekdaysShort: ['일', '월', '화', '수', '목', '금', '토']
    });
    // 달력
    this.current = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1
    };
    this.selectedDate = moment().format('YYYY-MM-DD');
    this.getCalenderMonthList();
  }

  getCalenderMonthList() {
    this.loadingService.showLoading(true, '캘린더 데이터를 조회 중입니다.');
    this.calendarService.getCalenderMonthList(moment(this.selectedDate).format('YYYY-MM')).subscribe(res => {
      console.log('월별 일기 리스트는 :' , res);
      this.calendarMonthList = res;
      this.current.dates = this.setDates(new Date(this.current.year, this.current.month - 1, 1));
      this.getCalenderList();
    }, err => {
      if (err.code !== ResponseCode.NO_MATCHING) {
        this.alertUtilService.showAlert(null, err.message);
      }
      this.calendarMonthList = [];
      this.current.dates = this.setDates(new Date(this.current.year, this.current.month - 1, 1));
      this.getCalenderList();
    });
  }


  getCalenderList() {
    this.calendarService.getCalenderList(moment(this.selectedDate).format('YYYY-MM-DD')).subscribe(res => {
      this.calendarList = res;
      this.loadingService.showLoading(false, '');
    }, err => {
      if (err.code !== ResponseCode.NO_MATCHING) {
        this.alertUtilService.showAlert(null, err.message);
      }
      this.loadingService.showLoading(false, '');
      this.calendarList = [];
    });
  }

  // ---일기------------------------------------
  async openDiaryInsertModal(type, calendarSeq) {
    const modal = await this.modalController.create({
      component: DiaryRegModalPage,
      componentProps: {
        date: this.selectedDate,
        type,
        calendarSeq
      }
    });
    modal.onDidDismiss()
        .then((data) => {
          if (data.data.regResult) {
            this.getCalenderMonthList();
          }
        });
    return await modal.present();
  }

  // 달력 생성
  setDates(date): any {
    console.log(this.current);
    // 선택한 달 오늘 날짜 포함여부 확인
    const isToday: boolean = this.today.getFullYear() === date.getFullYear() && this.today.getMonth() === date.getMonth();
    // 선택한 달의 시작 날짜
    const selectedMonthStaryDay: number = date.getDay();
    // 선택한 달의 종료 날짜
    const selectedMonthEndDay: number = this.calcEndDate(date.getFullYear(), date.getMonth() + 1 );
    // 이전달 마지막 날짜
    const lastMonthEndDay: number = this.calcEndDate(date.getFullYear(), date.getMonth());
    // 달력 내용 목록
    const datesInfo = [];
    let monthDate = 1;
    let nextMonthDate = 1;
    for (let i = 0; i < 42; i++) {
      const data: any = {};
      if (i < selectedMonthStaryDay) {
        data.color = 'lightgray';
        data.disabled = 'lightgray';
        data.date = lastMonthEndDay - (selectedMonthStaryDay - i) + 1;
        data.selectDay = 'N';
        data.today = 'N';
      } else if (monthDate <= selectedMonthEndDay) {
        /*data.color = isToday && monthDate === this.today.getDate() ? 'gray' : 'black';*/
        const dataDate = this.current.year + '-' + this.current.month + '-' + monthDate;
        const dataDay = moment(dataDate).day();
        if (dataDay === 0 && !moment(dataDate).isAfter(moment())) {
          data.color = '#28a1ae';
        } else if (moment(dataDate).isAfter(moment())) {
          data.color = 'lightgray';
        } else {
          data.color = 'black';
        }
        /*data.color = dataDay === 0 ? '#28a1ae' : 'black';*/
        data.today = isToday && monthDate === this.today.getDate() ? 'Y' : 'N';
        data.selectDay = Number(moment(this.selectedDate).format('D')) === monthDate ? 'Y' : 'N';
        data.dynamic = false;
        data.negative = false;
        data.positive = false;
        data.static = false;
        if (monthDate.toString() in this.calendarMonthList){
          for (const item of this.calendarMonthList[monthDate.toString()]) {
            if (item === 'dynamic') {
              data.dynamic = true;
            } else if (item === 'negative') {
              data.negative = true;
            } else if (item === 'positive') {
              data.positive = true;
            } else if (item === 'static') {
              data.static = true;
            }
          }
        }
        data.date = monthDate++;
      } else {
        data.color = 'lightgray';
        data.disabled = 'lightgray';
        data.selectDay = 'N';
        data.today = 'N';
        data.date = nextMonthDate++;
      }
      datesInfo.push(data);
    }
    if (!this.selectedDate) {
      this.selectedDate = moment().format('YYYY-MM-DD')
    }
    return datesInfo;
  }

  // 지난달
  calcPrev(): any {
    const prevCalendar = new Date(this.current.year, this.current.month - 2, 1);
    this.current.year = prevCalendar.getFullYear();
    this.current.month = prevCalendar.getMonth() + 1;
    this.selectedDate = this.current.year + '-' + this.current.month + '-' + '01';
    //this.current.dates = this.setDates(prevCalendar);
    this.getCalenderMonthList();
  }

  // 다음달
  calcNext(): any {
    const nextCalendar = new Date(this.current.year, this.current.month, 1);
    console.log(moment(nextCalendar).format('YYYY-MM-DD'))
    if (!moment(nextCalendar).isAfter(moment())) {
      this.current.year = nextCalendar.getFullYear();
      this.current.month = nextCalendar.getMonth() + 1;
      this.selectedDate = this.current.year + '-' + this.current.month + '-' + '01';
      this.getCalenderMonthList();
    } else {
      this.alertUtilService.showAlert(null, '선택가능한 마지막 달입니다.');
    }
    //this.current.dates = this.setDates(nextCalendar);

  }

  // 마지막일
  calcEndDate(year, month): number {
    return new Date(year, month, 0).getDate();
  }

  // 데이트 선택
  selectDate(item, index): any {
    if (item.color !== 'lightgray') {
      for (const i in this.current.dates) {
        if (this.current.dates[i].selectDay === 'Y') {
          this.current.dates[i].selectDay = 'N';
        }
      }
      this.content.scrollToTop();
      this.current.dates[index].selectDay = 'Y';
      this.selectedDate = this.current.year + '-' + this.current.month + '-' + this.current.dates[index].date;
      this.getCalenderList();
    }
  }

  // 데이터 포멧
  formatDate(date, type) {
    if (type === 'SELECT_DATE') {
      return moment(date).format('MM.DD (ddd)');
    } else {
      return moment(date).format('YYYY.MM.DD HH:mm');
    }


  }

// ---------------------------------------------





}
