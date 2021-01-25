import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AlertUtilService} from '../../../util/common/alert-util.service';
import {DateService} from '../../../util/common/date.service';
import {EventBusService} from '../../../services/event-bus.service';
import {Subscription} from 'rxjs';
import {LoadingService} from '../../../util/loading.service';

@Component({
  selector: 'app-more-info-modal',
  templateUrl: './more-info-modal.page.html',
  styleUrls: ['./more-info-modal.page.scss'],
})
export class MoreInfoModalPage implements OnInit {
  @Input() moreInfoData: any;
  @Input() type: string;
  @Input() codeList: any;

  // 이벤트 버스
  eventSubscription: Subscription;

  /*===========10-1 질문==========================*/
  modalDate: any = {
    year: '',
    month: ''
  };

  symptomList: any = [];
  /*=============================================*/

  constructor(
      public modalCtrl: ModalController,
      private alertUtilService: AlertUtilService,
      private dateService: DateService,
      private eventBusService: EventBusService,
      private loadingUtilService: LoadingService
  ){}

  ngOnInit() {
    this.eventSubscription = this.eventBusService.modal$.subscribe(event => {
      if (event === 'OFF') {
        this.modalCtrl.dismiss({
          dismissed: true
        });
      }
    });
  }



  /*===========10-1 질문==========================*/
  selectList(i, type) {
    if (type === 'symptom') {
      if (this.symptomList.indexOf(i) === -1) {
        this.symptomList.push(i);
      } else {
        const index = this.symptomList.indexOf(i);
        this.symptomList.splice(index, 1);
      }
    }
  }

  checkSelectIndex(i, type) {
    if (type === 'symptom') {
      if (this.symptomList.indexOf(i) >= 0) {
        return true;
      } else {
        return false;
      }
    }
  }
  /*=============================================*/

  /*===========12-2 질문==========================*/
  /*=============================================*/


  /*===========3-1 질문==========================*/
  selectState(state) {
    this.moreInfoData.insertData.state = state;
  }
  /*=============================================*/



  /*===========공통==========================*/
  insertInfo() {
    if (this.type === '3-1') {
      if (!this.moreInfoData.insertData.year) {
        this.alertUtilService.showAlert(null, '첫 발병 년도를 선택해 주세요.');
        return false;
      }

      if (!this.moreInfoData.insertData.content && this.moreInfoData.userInput === 'Y') {
        this.alertUtilService.showAlert(null, '증상을 입력해주세요.');
        return false;
      } else if (this.moreInfoData.insertData.content && this.moreInfoData.userInput === 'Y') {
        const replaceVal = this.moreInfoData.insertData.content.replace(/(\s*)/g, '');
        if (replaceVal.length === 0) {
          this.alertUtilService.showAlert(null, '증상을 입력해주세요.');
          return false;
        }
      }

      if (!this.moreInfoData.insertData.state) {
        this.alertUtilService.showAlert(null, '치료경과를 선택해주세요.');
        return false;
      }


      this.moreInfoData.insertData.year = this.dateService.getDateFormat(this.moreInfoData.insertData.year, 'YYYY').dateFormat
      console.log(this.moreInfoData)
      this.moreInfoData.insertData.statusCode = this.moreInfoData.codeSeq;
      this.modalCtrl.dismiss({
        dismissed: true,
        data: this.moreInfoData.insertData,
        modalResultYn: 'Y'
      });
    } else if (this.type === '10-1') {
      if (!this.modalDate.year) {
        this.alertUtilService.showAlert(null, '첫 발병 년도를 선택해 주세요.');
        return false;
      }

      if (!this.modalDate.month) {
        this.alertUtilService.showAlert(null, '첫 발병 월을 선택해 주세요.');
        return false;
      }

      if (this.symptomList.length <= 0) {
        this.alertUtilService.showAlert(null, '증상을 선택해주세요.');
        return false;
      }
      console.log(this.moreInfoData)
      this.moreInfoData.insertData.onset = this.moreInfoData.insertData.year = this.dateService.getDateFormat(this.modalDate.year, 'YYYY').dateFormat + '-' + this.dateService.getDateFormat(this.modalDate.month, 'MM').dateFormat;
      this.moreInfoData.insertData.diseaseCode = this.moreInfoData.codeSeq;

      const infoDiseaseSymptoms = [];
      for (let i = 0; i < this.symptomList.length; i++) {
        infoDiseaseSymptoms.push({symptomCode: this.codeList[i].codeSeq});
      }
      this.moreInfoData.insertData.infoDiseaseSymptoms = infoDiseaseSymptoms;
      this.modalCtrl.dismiss({
        dismissed: true,
        data: this.moreInfoData.insertData,
        modalResultYn: 'Y'
      });
    } else if (this.type === '12-2') {
      if (!this.moreInfoData.insertData.drinkAmount) {
        this.alertUtilService.showAlert(null, '1회 음주량을 입력해주세요.');
        return false;
      }

      if (!this.moreInfoData.insertData.numOfYears) {
        this.alertUtilService.showAlert(null, '음주 기간을 선택해 주세요.');
        return false;
      }

      if (!this.moreInfoData.insertData.perWeek) {
        this.alertUtilService.showAlert(null, '주간 음주 횟수를 선택해 주세요.');
        return false;
      }
      console.log(this.moreInfoData)
      this.moreInfoData.insertData.drinkCode = this.moreInfoData.codeSeq;

      this.modalCtrl.dismiss({
        dismissed: true,
        data: this.moreInfoData.insertData,
        modalResultYn: 'Y'
      });
    }
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
      data: null
    });
  }

  /*=============================================*/

  // 공백 제어
  keyPressForVal(event: any) {
    const inputChar = String.fromCharCode(event.charCode);
    const pattern = /^\s*/;
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
