import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-symptom-info-modal',
  templateUrl: './symptom-info-modal.page.html',
  styleUrls: ['./symptom-info-modal.page.scss'],
})
export class SymptomInfoModalPage implements OnInit {

  constructor(
      private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

}
