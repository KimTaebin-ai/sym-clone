import { Component, OnInit } from '@angular/core';
import {EventBusService} from '../../../services/event-bus.service';
import {ModalController} from '@ionic/angular';
import {Subscription} from 'rxjs';
import {MindManager} from '../../../mind-module/mind.manager';

@Component({
  selector: 'app-auto-login-modal',
  templateUrl: './auto-login-modal.page.html',
  styleUrls: ['./auto-login-modal.page.scss'],
})
export class AutoLoginModalPage implements OnInit {

  // 이벤트 버스
  eventSubscription: Subscription;

  constructor(
      private eventBusService: EventBusService,
      private modalCtrl: ModalController,
      private mindManager: MindManager
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

  popupAnymore() {
    this.mindManager.setAutoLoginPopupInfo(false);
    this.dismiss();
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
