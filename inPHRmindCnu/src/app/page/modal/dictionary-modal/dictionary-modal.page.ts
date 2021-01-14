import {Component, Input, OnInit} from '@angular/core';
import {AlertUtilService} from '../../../util/common/alert-util.service';
import {DictionaryService} from '../../../mind-module/service/dictionary.service';
import {environment} from '../../../../environments/environment';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-dictionary-modal',
  templateUrl: './dictionary-modal.page.html',
  styleUrls: ['./dictionary-modal.page.scss'],
})
export class DictionaryModalPage implements OnInit {
  @Input() seq: string;
  dictionaryDetail: any = {};
  symUrlForImg = environment.simApi + '/api/file/';
  constructor(
      private alertUtilService: AlertUtilService,
      private dictionaryService: DictionaryService,
      private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.getDictionaryDetail();
  }

  // 상세 정보 조회
  getDictionaryDetail() {
    this.dictionaryService.getDictionaryDetail(this.seq).subscribe(res => {
      this.dictionaryDetail = res;
    }, err => {
      this.alertUtilService.showAlert(null, err);
    });
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

}
