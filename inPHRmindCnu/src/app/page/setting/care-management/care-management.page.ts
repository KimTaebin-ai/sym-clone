import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {MindManager} from '../../../mind-module/mind.manager';
import {PageInfoService} from '../../../services/page-info.service';

@Component({
  selector: 'app-care-management',
  templateUrl: './care-management.page.html',
  styleUrls: ['./care-management.page.scss'],
})
export class CareManagementPage implements OnInit {

  constructor(
      private navController: NavController,
      private mindManager: MindManager,
      private pageInfoService: PageInfoService
  ) { }

  ngOnInit() {
  }

  goToPage(url, title) {
    this.pageInfoService.getToOtherPage('/care-management', url, title).then(() => {
      console.log(this.pageInfoService.getPageInfo('title'))
      this.navController.navigateRoot([url]);
    });
  }

}
