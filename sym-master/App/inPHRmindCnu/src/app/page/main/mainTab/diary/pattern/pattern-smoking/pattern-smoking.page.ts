import { Component, OnInit } from '@angular/core';
import {AlertController} from '@ionic/angular';
import {AlertUtilService} from '../../../../../../util/common/alert-util.service';
import {MindManager} from "../../../../../../mind-module/mind.manager";

@Component({
  selector: 'app-pattern-smoking',
  templateUrl: './pattern-smoking.page.html',
  styleUrls: ['./pattern-smoking.page.scss'],
})
export class PatternSmokingPage implements OnInit {

  patternCount = 0;
  reportVo: any = {
    count: ''
  };

  reportList: any = [2, 6, 8, 10, 15];

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

    for (let i = 0; i < this.reportList.length; i++){
      this.patternCount = this.patternCount + Number(this.reportList[i]);
    }
  }

  delList(index) {
    const count = this.reportList[index];
    this.reportList.splice(index, 1);
    this.patternCount = this.patternCount - Number(count);
  }

  // 리스트 삭제 확인창
  async delListConfirmAlert(index) {
    const alert = await this.alertCtrl.create({
      header: '삭제하기',
      message: '<p class="alert-body">선택하신 목록을<br>삭제하시겠습니까?</p>',
      buttons: [
        {
          text: '예',
          handler: data => {
            this.delList(index);
          }
        },
        {
          text: '아니요',
          role: 'cancel',
          handler: data => {
          }
        }
      ]
    });
    await alert.present();
  }

  // 리스트 추가 확인창
  async addReportConfirmAlert() {
    const alert = await this.alertCtrl.create({
      header: '추가하기',
      message: '<p class="alert-body">추가하시겠습니까?</p>',
      buttons: [
        {
          text: '예',
          handler: data => {
            this.addReport();
            this.dataReset();
          }
        },
        {
          text: '아니요',
          role: 'cancel',
          handler: data => {
          }
        }
      ]
    });
    await alert.present();
  }

  addReport() {
    if (this.reportVo.count === 0) {
      this.alertUtilService.showAlert(null, '흡연한 담배 갯수를 입력해주세요.');
      return false;
    }
    this.reportList.push(this.reportVo.count);
    this.patternCount = 0;
    for (let i = 0; i < this.reportList.length; i++){
      this.patternCount = this.patternCount + Number(this.reportList[i]);
    }
  }

  dataReset(){
    this.reportVo.count = '';
  }
}
