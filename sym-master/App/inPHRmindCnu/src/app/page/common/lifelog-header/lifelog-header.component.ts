import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertUtilService} from '../../../util/common/alert-util.service';
import {NavController} from '@ionic/angular';
import {MindManager} from '../../../mind-module/mind.manager';

@Component({
  selector: 'app-lifelog-header',
  templateUrl: './lifelog-header.component.html',
  styleUrls: ['./lifelog-header.component.scss'],
})
export class LifelogHeaderComponent implements OnInit, OnDestroy {


  pageInfo: any = {};
  constructor(
      private alertUtilService: AlertUtilService,
      private navController: NavController,
      private mindManager: MindManager
  ) { }

  ngOnInit() {
    this.pageInfo = this.mindManager.getPageInfo();
  }

  ngOnDestroy(): void {
  }

  goBack() {
    const pageInfo = this.mindManager.getPageInfo();
    console.log(pageInfo)
    if (pageInfo.url) {
      this.navController.navigateRoot([pageInfo.url]);
    } else {
      this.alertUtilService.showAlert(null, '이전 위치를 조회하는 도중 오류가 발생하였습니다.APP를 종료 후 다시 실행 시켜주세요.');
    }
  }
}
