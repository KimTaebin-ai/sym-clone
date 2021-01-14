import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {MindManager} from '../../../mind-module/mind.manager';
import {PageInfoService} from '../../../services/page-info.service';

@Component({
  selector: 'app-member-info',
  templateUrl: './member-info.page.html',
  styleUrls: ['./member-info.page.scss'],
})
export class MemberInfoPage implements OnInit {

  constructor(
      private navController: NavController,
      private mindManager: MindManager,
      private pageInfoService: PageInfoService
  ) { }

  ngOnInit() {
  }

  goToPage(url, title) {
    this.pageInfoService.getToOtherPage('/login', url, title).then(() => {
      console.log(this.pageInfoService.getPageInfo('title'))
      this.navController.navigateRoot([url]);
    });
  }

}
