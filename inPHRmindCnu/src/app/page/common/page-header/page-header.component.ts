import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertUtilService} from '../../../util/common/alert-util.service';
import {NavController} from '@ionic/angular';
import {MindManager} from '../../../mind-module/mind.manager';
import {PageInfoService} from '../../../services/page-info.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit, OnDestroy {

  pageTitle: any = '';
  constructor(
      private alertUtilService: AlertUtilService,
      private navController: NavController,
      private pageInfoService: PageInfoService
  ) { }

  ngOnInit() {
    this.pageTitle = this.pageInfoService.getPageInfo('title');
  }

  ngOnDestroy(): void {
  }

  goBack() {
    const lastUrl = this.pageInfoService.getToBack();
    if (lastUrl) {
      this.navController.navigateRoot([lastUrl]);
    } else {
      this.alertUtilService.showAlert(null, '이전 위치를 조회하는 도중 오류가 발생하였습니다.APP를 종료 후 다시 실행 시켜주세요.');
    }
  }
}
