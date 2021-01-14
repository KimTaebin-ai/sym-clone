import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {MindManager} from '../../../mind-module/mind.manager';

@Component({
  selector: 'app-care-management',
  templateUrl: './care-management.page.html',
  styleUrls: ['./care-management.page.scss'],
})
export class CareManagementPage implements OnInit {

  constructor(
      private navController: NavController,
      private mindManager: MindManager
  ) { }

  ngOnInit() {
  }

  goToPage(url) {
    const pageInfo: any = {
      url: '/care-management',
      title: ''
    };
    if (url === '/irb') {
      pageInfo.title = 'IRB';
      this.mindManager.setPageInfo(pageInfo);
    }
    this.navController.navigateRoot([url]);
  }

}
