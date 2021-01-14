import { Component, OnInit } from '@angular/core';
import {IrbService} from '../../../mind-module/service/irb.service';
import {AlertUtilService} from '../../../util/common/alert-util.service';
import {DateService} from '../../../util/common/date.service';
import {PageInfoService} from '../../../services/page-info.service';
import {AlertController, NavController} from '@ionic/angular';
import {NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-irb',
  templateUrl: './irb.page.html',
  styleUrls: ['./irb.page.scss'],
})
export class IRBPage implements OnInit {

  irbList: any = [];
  constructor(
      private irbService: IrbService,
      private alertUtilService: AlertUtilService,
      private dateService: DateService,
      private pageInfoService: PageInfoService,
      private navController: NavController,
      private alertCtrl: AlertController
  ) { }

  /*list$;*/

  ngOnInit() {
    this.getAgreed();
    /*this.list$ = this.irbService.getList();*/
  }

  selectList(item) {
    item.opened = !item.opened;
  }

  getAgreed() {
    this.irbService.getAgreed().subscribe(res => {
      this.irbList = this.irbService.setIrbList(res);
      console.log(this.irbList)
      for (let i = 0; i < this.irbList.length; i++) {
        this.irbList[i].opened = false;
      }
    }, err => {
      if (err === '303') {

      } else {
        this.alertUtilService.showAlert(null, err);
      }
    });
  }

  // 통합아이디 확인창
  async showWithdrawIrbConfirmAlert(item) {
    const alert = await this.alertCtrl.create({
      header: '알림',
      message: '철회하시겠습니까?',
      buttons: [
        {
          text: '예',
          handler: data => {
            this.withdrawIrb(item);
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

  withdrawIrb(item) {
    console.log(item.agreeSeq)
    this.irbService.withdrawIrb(item.agreeSeq).subscribe(res => {
      this.alertUtilService.showAlert(null, res);
      item.state = 'Withdraw';
      item.stateNm = '철회됨';
      item.withdrawalDt = this.dateService.getToday('YYYY-MM-DD');
    }, err => {
      this.alertUtilService.showAlert(null, err);
    });
  }

  getToPage(url, title) {
    this.pageInfoService.getToOtherPage('/irb', url, title).then(() => {
      this.navController.navigateRoot([url]);
    });
  }

}
