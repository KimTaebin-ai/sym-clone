import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-emotion-info-modal',
  templateUrl: './emotion-info-modal.page.html',
  styleUrls: ['./emotion-info-modal.page.scss'],
})
export class EmotionInfoModalPage implements OnInit {

  @Input() type: string;

  constructor(
      private modalController: ModalController,
  ) { }

  ngOnInit() {
  }

  // 뒤로 가기
  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

}
