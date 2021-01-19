import {Component, Input, OnInit} from '@angular/core';
import {AlertUtilService} from '../../../util/common/alert-util.service';
import {DictionaryService} from '../../../mind-module/service/dictionary.service';
import {environment} from '../../../../environments/environment';
import {ModalController} from '@ionic/angular';
import {Subscription} from 'rxjs';
import {DateService} from '../../../util/common/date.service';
import {EventBusService} from '../../../services/event-bus.service';

@Component({
  selector: 'app-dictionary-modal',
  templateUrl: './dictionary-modal.page.html',
  styleUrls: ['./dictionary-modal.page.scss'],
})
export class DictionaryModalPage implements OnInit {
  @Input() seq: string;
  dictionaryDetail: any = {};
  symUrlForImg = environment.simApi + '/api/file/';

  // 이벤트 버스
  eventSubscription: Subscription;

  constructor(
      private alertUtilService: AlertUtilService,
      private dictionaryService: DictionaryService,
      private modalCtrl: ModalController,
      private eventBusService: EventBusService
  ) { }

  ngOnInit() {
    this.eventSubscription = this.eventBusService.modal$.subscribe(event => {
      if (event === 'OFF') {
        this.modalCtrl.dismiss({
          dismissed: true
        });
      }
    });
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
