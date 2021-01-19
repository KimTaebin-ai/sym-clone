import { Component, OnInit } from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {MindManager} from '../../../mind-module/mind.manager';
import {PageInfoService} from '../../../services/page-info.service';
import {EventBusService} from '../../../services/event-bus.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.page.html',
  styleUrls: ['./side-menu.page.scss'],
})
export class SideMenuPage implements OnInit {
  userInfo: any = this.mindManager.getMemberModel();
  // 이벤트 버스
  eventSubscription: Subscription;
  constructor(
      private navController: NavController,
      private modalCtrl: ModalController,
      private mindManager: MindManager,
      private pageInfoService: PageInfoService,
      private eventBusService: EventBusService
  ) { }

  ngOnInit() {
    this.eventSubscription = this.eventBusService.modal$.subscribe(event => {
      if (event === 'OFF') {
        this.modalCtrl.dismiss({
          dismissed: true
        });
      }
    });
  }

  goToPage(url, title, type) {
    if (type === 'PAGE') {
      this.pageInfoService.getToOtherPage('/main/main/home', url, title).then(() => {
        this.dismiss();
        this.navController.navigateRoot([url]);
      });
    } else {
      this.pageInfoService.moveToTab(url, title).then(data => {
        this.dismiss();
        this.eventBusService.tabInfo$.next(type);
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
