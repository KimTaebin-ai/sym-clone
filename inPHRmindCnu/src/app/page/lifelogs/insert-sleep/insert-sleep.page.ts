import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {NavigationExtras} from '@angular/router';
import {PageInfoService} from '../../../services/page-info.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-insert-sleep',
  templateUrl: './insert-sleep.page.html',
  styleUrls: ['./insert-sleep.page.scss'],
})
export class InsertSleepPage implements OnInit {

  lifelogVo: any = {
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: ''
  };
  constructor(

  ) { }

  ngOnInit() {
    this.lifelogVo.startDate = moment().format('YYYY-MM-DD');
    this.lifelogVo.endDate = moment().format('YYYY-MM-DD');
  }

  // 유효성 검사 및 데이터 정리
  validation() {
    if (!this.lifelogVo.startDate || !this.lifelogVo.startTime || !this.lifelogVo.endDate || !this.lifelogVo.endTime) {
      return false;
    }
    return true;
  }




}
