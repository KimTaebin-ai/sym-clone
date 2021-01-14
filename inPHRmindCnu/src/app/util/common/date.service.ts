import { Injectable } from '@angular/core';
import * as moment from 'moment';
import {DateModel} from '../../mind-module/model/date.model';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  // 데이트 모델
  // 1. date: 요청한 날짜,
  // 2. dateFormat: 요청한 포맷 형식의 날짜 포멧 날짜,
  // 3. compareVal: 비교 요청에 대한 결과

  constructor() { }

  // 날짜 요청--------------------------------------------------

  // 오늘 날짜 불러오기
  getToday(format) {
    const returnVal = new DateModel();
    if (format) {
      returnVal.dateFormat = moment().format(format);
      return returnVal;
    } else {
      returnVal.date = new Date();
      return returnVal;
    }
  }

  // N일(시간) 후 날짜(시간) 불러오기
  // addType = y: 년, M: 월, d: 일, h: 시, m: 분, s: 초,
  addDate(date, addNum, addType, format) {
    const returnVal = new DateModel();
    if (format) {
      returnVal.dateFormat = moment(date).add(addNum, addType).format(format);
      return returnVal;
    } else {
      returnVal.date = moment(date).add(addNum, addType).toDate();
      return returnVal;
    }
  }

  // N일(시간) 이전 날짜(시간) 불러오기
  // addType = y: 년, M: 월, d: 일, h: 시, m: 분, s: 초,
  subtractDate(date, subtractNum, subtractType, format) {
    const returnVal = new DateModel();
    if (format) {
      returnVal.dateFormat = moment(date).subtract(subtractNum, subtractType).format(format);
      return returnVal;
    } else {
      returnVal.date = moment(date).subtract(subtractNum, subtractType).toDate();
      return returnVal;
    }
  }

  // 달의 마지막 날 불러오기
  // date: 요청한 날이 포함된 달의 마지막날 요청 (ex: 2020-10-07)
  getLastDay(date, format) {
    const returnVal = new DateModel();
    if (format) {
      returnVal.dateFormat = moment(date).startOf('month').format(format);
      return returnVal;
    } else {
      returnVal.date = moment(date).startOf('month').toDate();
      return returnVal;
    }
  }

  // 날짜 포맷
  getDateFormat(date, format) {
    const returnVal = new DateModel();
    returnVal.dateFormat = moment(date).format(format);
    return returnVal;
  }

  // /날짜 요청----------------------------------------------------


  // 날짜 비교------------------------------------------------------

  // 날짜 이전, 이후, 같음 비교
  // compareType = AFTER: 이후, BEFORE: 이전, SAME: 동일
  // date1가 date2보다 compareType 한지 비교
  compareDate(date1, date2, compareType) {
    const returnVal = new DateModel();
    if (compareType === 'AFTER') {
      returnVal.compareVal = moment(date1).isAfter(date2);
      return returnVal;
    } else if (compareType === 'BEFORE') {
      returnVal.compareVal = moment(date1).isBefore(date2);
      return returnVal;
    } else {
      returnVal.compareVal = moment(date1).isSame(date2);
      return returnVal;
    }
  }

  // 날짜 비교-----------------------------------------------------

}
