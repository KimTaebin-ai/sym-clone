import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-irb-agree-modal',
  templateUrl: './irb-agree-modal.page.html',
  styleUrls: ['./irb-agree-modal.page.scss'],
})
export class IrbAgreeModalPage implements OnInit {
  @Input() title: string;
  @Input() detail: string;
  constructor(
      private modalController: ModalController
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
