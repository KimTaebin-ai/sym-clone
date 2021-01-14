import { Component, OnInit } from '@angular/core';
import {AlertController} from '@ionic/angular';
import {AlertUtilService} from '../../../../../../util/common/alert-util.service';
import {MindManager} from "../../../../../../mind-module/mind.manager";

@Component({
  selector: 'app-pattern-physiology',
  templateUrl: './pattern-physiology.page.html',
  styleUrls: ['./pattern-physiology.page.scss'],
})
export class PatternPhysiologyPage implements OnInit {


  patternCount = 0;

  reportVo: any = {
    day: 'MORNING',
    dayNm: '오전',
    type: 'SOJU',
    count: 0
  };

  reportList: any = {
    physiologyYn: ''
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
  selectPhysiologyInfo(type) {
    this.reportList.physiologyYn = type;
  }
}
