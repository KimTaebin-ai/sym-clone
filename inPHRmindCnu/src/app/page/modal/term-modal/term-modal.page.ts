import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ModalController, Platform} from '@ionic/angular';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {EventBusService} from '../../../services/event-bus.service';

@Component({
  selector: 'app-term-modal',
  templateUrl: './term-modal.page.html',
  styleUrls: ['./term-modal.page.scss'],
})
export class TermModalPage implements OnInit, OnDestroy {
  @Input() termTitle: string;
  @Input() termDetail: string;

  // 이벤트 버스
  eventSubscription: Subscription;

  constructor(
      public modalCtrl: ModalController,
      private platform: Platform,
      private eventBusService: EventBusService
  ) {
    this.eventSubscription = this.eventBusService.modal$.subscribe(event => {
      if (event === 'OFF') {
        this.modalCtrl.dismiss({
          dismissed: true
        });
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

}
