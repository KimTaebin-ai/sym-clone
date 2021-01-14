import { Component, OnInit } from '@angular/core';
import {DiaryRegModalPage} from '../../../modal/diary-reg-modal/diary-reg-modal.page';
import * as moment from 'moment';
import {AlertController, ModalController} from '@ionic/angular';
import {TermModalPage} from '../../../modal/term-modal/term-modal.page';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  // ---달력------------------------------------
  current: any = {
    dates: []
  };
  today: Date = new Date();
  selectedDate = '';
  // ----------------------------------------------
  constructor(
      private alertCtrl: AlertController,
      private modalController: ModalController
  ) { }

  ngOnInit() {
    // 달력
    this.current = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1
    };
    this.current.dates = this.setDates(new Date(this.current.year, this.current.month - 1, 1));
  }


  // ---다이어리------------------------------------
  async openDiaryInsertModal() {
    const modal = await this.modalController.create({
      component: DiaryRegModalPage,
      componentProps: {
        date: '2020-05-21'
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
        data.color = dataDay === 0 ? '#28a1ae' : 'black';
        data.today = isToday && monthDate === this.today.getDate() ? 'Y' : 'N';
        if (!this.selectedDate) {
          data.selectDay = isToday && monthDate === this.today.getDate() ? 'Y' : 'N';
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
    return datesInfo;
  }

  // 지난달
  calcPrev(): any {
    const prevCalendar = new Date(this.current.year, this.current.month - 2, 1);
    this.current.year = prevCalendar.getFullYear();
    this.current.month = prevCalendar.getMonth() + 1;
    this.current.dates = this.setDates(prevCalendar);
  }

  // 다음달
  calcNext(): any {
    const nextCalendar = new Date(this.current.year, this.current.month, 1);
    this.current.year = nextCalendar.getFullYear();
    this.current.month = nextCalendar.getMonth() + 1;
    this.current.dates = this.setDates(nextCalendar);
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
      this.current.dates[index].selectDay = 'Y';
      this.selectedDate = this.current.year + '-' + this.current.month + '-' + this.current.dates[index].date;
    }
  }
// ---------------------------------------------



}
