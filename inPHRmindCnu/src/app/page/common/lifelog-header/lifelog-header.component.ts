import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertUtilService} from '../../../util/common/alert-util.service';
import {NavController} from '@ionic/angular';
import {MindManager} from '../../../mind-module/mind.manager';
import {PageInfoService} from '../../../services/page-info.service';
import {NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-lifelog-header',
  templateUrl: './lifelog-header.component.html',
  styleUrls: ['./lifelog-header.component.scss'],
})
export class LifelogHeaderComponent implements OnInit, OnDestroy {


  pageTitle: any = '';
  constructor(
      private alertUtilService: AlertUtilService,
      private navController: NavController,
      private mindManager: MindManager,
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

  goToPage() {
    let title = '';
    let url = '';
    const startUrl = this.pageInfoService.getPageInfo('url');
    if (startUrl === '') {
      url = 'insert-sleep';
      title = '수면 기록';
    } else if (startUrl === '') {
      url = 'insert-pulse';
      title = '맥박 기록';
    } else {
      url = 'insert-step';
      title = '활동량 기록';
    }

    const paramVo = {
      queryParams: {
        inputType : 'INSERT',
        data: null
      },
      animate: false
    };
    const navigationExtras: NavigationExtras = paramVo;
    this.pageInfoService.getToOtherPage(startUrl, url, title).then(() => {
      this.navController.navigateRoot([url], navigationExtras);
    });
  }
}
