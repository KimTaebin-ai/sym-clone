import { Component, OnInit } from '@angular/core';
import {AlertController} from '@ionic/angular';
import {AlertUtilService} from '../../../../../../util/common/alert-util.service';
import {MindManager} from "../../../../../../mind-module/mind.manager";

@Component({
  selector: 'app-pattern-meal',
  templateUrl: './pattern-meal.page.html',
  styleUrls: ['./pattern-meal.page.scss'],
})
export class PatternMealPage implements OnInit {

  patternCount = 0;

  reportVo: any = {
    day: 'MORNING',
    dayNm: '오전',
    type: 'SOJU',
    count: 0
  };

  reportList: any = {
    breakfast: 'N',
    lunch: 'N',
    dinner: 'N',
    snackMonig: 'N',
    snackAfternoon: 'N',
    snackNight: 'N'
  };

  constructor(
      private alertCtrl: AlertController,
      private alertUtilService: AlertUtilService,
      private mindManager: MindManager
  ) { }

  ngOnInit() {
    const pageInfo: any = {
      url: '/main/main/diary',
      title: '생활패턴 입력'
    };
    this.mindManager.setPageInfo(pageInfo);
  }

  // 오전,오후,저녁 선택
  selectMeaalInfo(type) {
    this.reportVo.day = type;
    if (type === 'BREAKFAST') {
      if (this.reportList.breakfast === 'Y') {
        this.reportList.breakfast = 'N';
        this.patternCount--;
      } else {
        this.reportList.breakfast = 'Y';
        this.patternCount++;
      }
    } else if (type === 'LUNCH') {
      if (this.reportList.lunch === 'Y') {
        this.reportList.lunch = 'N';
        this.patternCount--;
      } else {
        this.reportList.lunch = 'Y';
        this.patternCount++;
      }
    } else if (type === 'DINNER') {
      if (this.reportList.dinner === 'Y') {
        this.reportList.dinner = 'N';
        this.patternCount--;
      } else {
        this.reportList.dinner = 'Y';
        this.patternCount++;
      }
    } else if (type === 'SNACK_MONING') {
      if (this.reportList.snackMonig === 'Y') {
        this.reportList.snackMonig = 'N';
        this.patternCount--;
      } else {
        this.reportList.snackMonig = 'Y';
        this.patternCount++;
      }
    } else if (type === 'SNACK_AFTERNOON') {
      if (this.reportList.snackAfternoon === 'Y') {
        this.reportList.snackAfternoon = 'N';
        this.patternCount--;
      } else {
        this.reportList.snackAfternoon = 'Y';
        this.patternCount++;
      }
    } else if (type === 'SNACK_NIGHT') {
      if (this.reportList.snackNight === 'Y') {
        this.reportList.snackNight = 'N';
        this.patternCount--;
      } else {
        this.reportList.snackNight = 'Y';
        this.patternCount++;
      }
    }

  }
}
