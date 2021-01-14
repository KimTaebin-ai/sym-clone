import { Component, OnInit } from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {SideMenuPage} from '../../modal/side-menu/side-menu.page';
import {sideMenuEnterAnimation} from '../../../mind-module/animations/sideMenuEnter';
import {sideMenuLeaveAnimation} from '../../../mind-module/animations/sideMenuLeave';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {

  constructor(
      public modalController: ModalController,
      private navController: NavController
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

    this.modalController.create({
      component: SideMenuPage,
      cssClass: 'sideMenu',
      enterAnimation: sideMenuEnterAnimation,
      leaveAnimation: sideMenuLeaveAnimation
    }).then((modals) => {
      modals.present();
    });
  }

  goToPage(url) {
    this.navController.navigateRoot([url]);
  }
}
