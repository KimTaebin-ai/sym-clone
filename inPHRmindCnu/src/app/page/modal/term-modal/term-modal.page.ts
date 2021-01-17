import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ModalController, Platform} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-term-modal',
  templateUrl: './term-modal.page.html',
  styleUrls: ['./term-modal.page.scss'],
})
export class TermModalPage implements OnInit, OnDestroy {
  @Input() termTitle: string;
  @Input() termDetail: string;
  constructor(
      public modalCtrl: ModalController,
      private platform: Platform
  ) {
    this.platform.backButton.subscribeWithPriority(0, () => {
      this.dismiss();
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