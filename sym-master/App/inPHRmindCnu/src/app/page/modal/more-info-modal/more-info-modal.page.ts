import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AlertUtilService} from '../../../util/common/alert-util.service';

@Component({
  selector: 'app-more-info-modal',
  templateUrl: './more-info-modal.page.html',
  styleUrls: ['./more-info-modal.page.scss'],
})
export class MoreInfoModalPage implements OnInit {
  @Input() diseaseNm: string;
  @Input() type: string;

  modalInfo: any = {
    year: '',
    month: '',
    diseases: [],
  }

  diseaseInfo: any = {
    selectedList: [],
    diseaseList: [
      {
        codeId: 'a',
        codeName: '우울장애'
      },
      {
        codeId: 'b',
        codeName: '우울장애'
      },
      {
        codeId: 'c',
        codeName: '우울장애'
      },
      {
        codeId: 'd',
        codeName: '우울장애'
      },
      {
        codeId: 'etc',
        codeName: '알코올 의존 혹은 기타 물질 관련 장애'
      },
    ]
  };

  // 3-1 질문
  modalInfo31: any = {
    year: '',
    state: ''
  };


  constructor(
      public modalCtrl: ModalController,
      private alertUtilService: AlertUtilService
  ){}

  ngOnInit() {
  }


  selectList(i, type) {
    if (type === 'DISEASE') {
      if (this.diseaseInfo.selectedList.indexOf(i) === -1) {
        this.diseaseInfo.selectedList.push(i);
        console.log(this.diseaseInfo.selectedList);
      } else {
        const index = this.diseaseInfo.selectedList.indexOf(i);
        this.diseaseInfo.selectedList.splice(index, 1);
        console.log(this.diseaseInfo.selectedList);
      }
    }
  }

  checkSelectIndex(i, type) {
    if (type === 'DISEASE') {
      if (this.diseaseInfo.selectedList.indexOf(i) >= 0) {
        return true;
      } else {
        return false;
      }
    }
  }

  insertInfo() {
    if (!this.modalInfo.year) {
      this.alertUtilService.showAlert(null, '첫 발병 년도를 선택해 주세요.');
      return false;
    }

    if (!this.modalInfo.month) {
      this.alertUtilService.showAlert(null, '첫 발병 월을 선택해 주세요.');
      return false;
    }

    if (this.diseaseInfo.selectedList.length === 0) {
      this.alertUtilService.showAlert(null, '증상을 입력해주세요.');
      return false;
    }

    for (let i = 0; i < this.diseaseInfo.selectedList; i++) {
      const num = this.diseaseInfo.selectedList[i];
      this.modalInfo.diseases.push(this.diseaseInfo.diseaseList[num]);
    }

    this.modalInfo.modalResultYn = 'Y';

    this.modalCtrl.dismiss({
      dismissed: true,
      data: this.modalInfo,
      modalResultYn: 'Y'
    });
  }


  /*===========3-1 질문==========================*/
  selectState(state) {
    this.modalInfo31.state = state;
  }
  /*=============================================*/

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
      data: null,
      modalResultYn: 'N'
    });
  }

}
