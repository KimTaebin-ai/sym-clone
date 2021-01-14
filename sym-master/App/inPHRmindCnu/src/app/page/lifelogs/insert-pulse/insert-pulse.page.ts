import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-insert-pulse',
  templateUrl: './insert-pulse.page.html',
  styleUrls: ['./insert-pulse.page.scss'],
})
export class InsertPulsePage implements OnInit {

  lifelogVo: any = {
    measurementDate: '',
    measurementTime: '',
    value: ''
  };
  constructor(
  ) { }

  ngOnInit() {
    this.lifelogVo.measurementDate = moment().format('YYYY-MM-DD');
    this.lifelogVo.measurementTime = moment().format('HH:mm');
  }

  // 유효성 검사 및 데이터 정리
  validation() {
    console.log(this.lifelogVo.value)
    if (!this.lifelogVo.measurementDate || !this.lifelogVo.measurementTime || !this.lifelogVo.value) {
      return false;
    }
    return true;
  }

  checkVal(event: any) { // without type info
    console.log(event.keyCode)
    const text = event.target.value;
    // 숫자키만 입력 가능
    if (event.keyCode >= 48 && event.keyCode <= 57) {
      if (Number(event.target.value) > 200){
        event.target.value = event.target.value.slice(0, event.target.value.length - 1);
      } else {
        this.lifelogVo.value = event.target.value;
      }
    } else if (event.keyCode === 8) {
      this.lifelogVo.value = event.target.value;
    }else {
      event.target.value = event.target.value.replace(/[^0-9]/gi, '');
    }
  }

}
