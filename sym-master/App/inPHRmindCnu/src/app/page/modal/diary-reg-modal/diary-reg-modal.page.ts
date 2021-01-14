import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-diary-reg-modal',
  templateUrl: './diary-reg-modal.page.html',
  styleUrls: ['./diary-reg-modal.page.scss'],
})
export class DiaryRegModalPage implements OnInit, OnDestroy {

  // 기분-----------------
  // 기쁨: PLEASURE
  // 행복: HAPPINESS
  // 설렘: FLUTTER
  // 우울: DEPRESSED
  // 슬픔: SADNESS
  // 후회: REGRET
  // 짜증: PETULANCE
  // 분노: ANGER
  // 무난: NORMAL
  // ----------------------


  @Input() date: string;
  selectedEm = '';
  myStory = '';

  constructor(
      private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.selectedEm = '';
    this.myStory = '';
  }

  selectEm(em) {
    if (this.selectedEm === em) {
      this.selectedEm = '';
    } else {
      this.selectedEm = em;
    }
  }

  regDiary(){
    alert('준비중ㄴ')
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

}
