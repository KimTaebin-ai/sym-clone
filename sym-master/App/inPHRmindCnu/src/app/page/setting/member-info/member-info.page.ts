import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {MindManager} from '../../../mind-module/mind.manager';

@Component({
  selector: 'app-member-info',
  templateUrl: './member-info.page.html',
  styleUrls: ['./member-info.page.scss'],
})
export class MemberInfoPage implements OnInit {

  constructor(
      private navController: NavController,
      private mindManager: MindManager
  ) { }

  ngOnInit() {
  }

  goToPage(url) {
  /*  const pageInfo: any = {
      url: '/main/main/home',
      title: ''
    };
    if (url === '/care-management') {
      pageInfo.title = '설정';
      this.mindManager.setPageInfo(pageInfo);
    } else if (url === 'member-info') {
      pageInfo.title = '개인정보';
      this.mindManager.setPageInfo(pageInfo);
    }*/
    this.navController.navigateRoot([url]);
  }

}
