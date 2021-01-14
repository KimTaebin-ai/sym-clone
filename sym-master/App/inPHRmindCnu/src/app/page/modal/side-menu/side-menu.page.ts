import { Component, OnInit } from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {MindManager} from '../../../mind-module/mind.manager';
import {PageInfoService} from '../../../services/page-info.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.page.html',
  styleUrls: ['./side-menu.page.scss'],
})
export class SideMenuPage implements OnInit {

  constructor(
      private navController: NavController,
      private modalCtrl: ModalController,
      private mindManager: MindManager,
      private pageInfoService: PageInfoService
  ) { }

  ngOnInit() {
  }

  goToPage(url, title) {
    const pagesInfo: any = this.mindManager.getPageInfo();
    if (pagesInfo) {
      if (pagesInfo.length > 0) {
        this.pageInfoService.getToOtherPage(pagesInfo.url, url, title).then(() => {
          this.dismiss();
          this.navController.navigateRoot([url]);
        });
      } else {
        this.pageInfoService.getToOtherPage('/main/main/home', url, title).then(() => {
          this.dismiss();
          this.navController.navigateRoot([url]);
        });
      }
    } else {
      this.pageInfoService.getToOtherPage('/main/main/home', url, title).then(() => {
        this.dismiss();
        this.navController.navigateRoot([url]);
     });
    }
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

}
