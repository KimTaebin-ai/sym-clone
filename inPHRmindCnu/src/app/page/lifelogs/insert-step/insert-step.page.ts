import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {NavigationExtras} from '@angular/router';
import {PageInfoService} from '../../../services/page-info.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-insert-step',
  templateUrl: './insert-step.page.html',
  styleUrls: ['./insert-step.page.scss'],
})
export class InsertStepPage implements OnInit {

  lifelogVo: any = {
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    value: ''
  };
  constructor(

  ) { }

  ngOnInit() {
    this.lifelogVo.startDate = moment().format('YYYY-MM-DD');
    this.lifelogVo.startTime = moment().subtract(1, 'hours').format('HH:mm');
    this.lifelogVo.endDate = moment().format('YYYY-MM-DD');
    this.lifelogVo.endTime = moment().format('HH:mm');
  }

  // 유효성 검사 및 데이터 정리
  validation() {
    console.log(this.lifelogVo.value)
    if (!this.lifelogVo.startDate || !this.lifelogVo.startTime || !this.lifelogVo.endDate || !this.lifelogVo.endTime || !this.lifelogVo.value) {
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
