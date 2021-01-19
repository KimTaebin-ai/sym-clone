import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {Subscription} from "rxjs";
import {EventBusService} from "../../../services/event-bus.service";

@Component({
  selector: 'app-emotion-info-modal',
  templateUrl: './emotion-info-modal.page.html',
  styleUrls: ['./emotion-info-modal.page.scss'],
})
export class EmotionInfoModalPage implements OnInit {

  @Input() type: string;

  eventSubscription: Subscription;

  constructor(
      private modalController: ModalController,
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

  // 뒤로 가기
  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

}
