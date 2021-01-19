import { Component, OnInit } from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {SideMenuPage} from '../../modal/side-menu/side-menu.page';
import {sideMenuEnterAnimation} from '../../../mind-module/animations/sideMenuEnter';
import {sideMenuLeaveAnimation} from '../../../mind-module/animations/sideMenuLeave';
import {Router} from '@angular/router';
import {PageInfoService} from '../../../services/page-info.service';
import {SignatureModalPage} from '../../modal/signature-modal/signature-modal.page';
import {MindManager} from '../../../mind-module/mind.manager';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {

  constructor(
      public modalController: ModalController,
      private navController: NavController,
      private router: Router,
      private pageInfoService: PageInfoService,
      private mindManager: MindManager
  ) { }

  ngOnInit() {
  }

  async openModal() {
/*
    const modal = await this.modalController.create({
      component: SideMenuPage,
      cssClass: 'sideMenu',
      enterAnimation: sideMenuEnterAnimation,
      leaveAnimation: sideMenuLeaveAnimation
    });
    return await modal.present();
*/
/*
    this.modalController.create({
      component: SideMenuPage,
      cssClass: 'sideMenu',
      enterAnimation: sideMenuEnterAnimation,
      leaveAnimation: sideMenuLeaveAnimation
    }).then((modals) => {
      modals.present();
    });*/

    this.mindManager.setModalONOff('ON');
    const modal = await this.modalController.create({
      component: SideMenuPage,
      cssClass: 'sideMenu',
      enterAnimation: sideMenuEnterAnimation,
      leaveAnimation: sideMenuLeaveAnimation
    });
    modal.onDidDismiss()
        .then(() => {
          this.mindManager.setModalONOff('OFF');
        });
    return await modal.present();
  }

  goToPage(url, title) {
    const from = this.router.url;
    const fromArray = from.split('?');
    console.log(fromArray[0])
    this.pageInfoService.getToOtherPage(fromArray[0], url, title).then(() => {
      this.navController.navigateRoot([url]);
    });
  }

  test() {
    this.navController.navigateRoot(['/main/main/tab1']);
  }
}
