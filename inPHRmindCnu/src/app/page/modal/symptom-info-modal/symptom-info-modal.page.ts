import {Component, Input, OnInit} from '@angular/core';
import {ModalController, Platform} from '@ionic/angular';
import {Subscription} from 'rxjs';
import {EventBusService} from '../../../services/event-bus.service';

@Component({
  selector: 'app-symptom-info-modal',
  templateUrl: './symptom-info-modal.page.html',
  styleUrls: ['./symptom-info-modal.page.scss'],
})
export class SymptomInfoModalPage implements OnInit {
  // 이벤트 버스
  eventSubscription: Subscription;
  @Input() type: string;
  constructor(
      private modalController: ModalController,
      private platform: Platform,
      private eventBusService: EventBusService
  ) { }

  ngOnInit() {
    this.eventSubscription = this.eventBusService.modal$.subscribe(event => {
      if (event === 'OFF') {
        this.modalController.dismiss({
          dismissed: true
        });
      }
    });
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

}
