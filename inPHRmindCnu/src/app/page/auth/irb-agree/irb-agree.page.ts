import { Component, OnInit } from '@angular/core';
import {ValidationService} from '../../../services/validation.service';
import {AlertUtilService} from '../../../util/common/alert-util.service';
import {NavigationExtras} from '@angular/router';
import {ModalController, NavController} from '@ionic/angular';
import {MindManager} from '../../../mind-module/mind.manager';
import {SignatureModalPage} from '../../modal/signature-modal/signature-modal.page';
import {IrbService} from '../../../mind-module/service/irb.service';
import {DateService} from '../../../util/common/date.service';
import {FileService} from '../../../mind-module/service/file.service';
import {IrbAgreeModalPage} from '../../modal/irb-agree-modal/irb-agree-modal.page';
import {IrbPageInfoModel} from '../../../mind-module/model/irbPageInfo.model';
import {PageInfoService} from '../../../services/page-info.service';

@Component({
  selector: 'app-irb-agree',
  templateUrl: './irb-agree.page.html',
  styleUrls: ['./irb-agree.page.scss'],
})
export class IrbAgreePage implements OnInit {

  irbPageInfo: IrbPageInfoModel;

  agreeVo: any = {
    agree1 : false,
    agree2 : false,
    agree3 : false,
    agree4 : false,
    agree5 : false,
    agree6 : false,
    agree7 : false,
  }
  signatureImg: any;
  termOpenedYn = false;
  constructor(
      private validationService: ValidationService,
      private alertUtilService: AlertUtilService,
      public navController: NavController,
      private mindManager: MindManager,
      private modalController: ModalController,
      private irbService: IrbService,
      private fileService: FileService,
      private dateService: DateService,
      private pageInfoService: PageInfoService
  ) { }

  ngOnInit() {
    this.getIrbList();
  }

  getIrbList() {
    this.irbService.getIrbPageInfo().subscribe(res => {
      console.log(res)
      this.irbPageInfo = res;
      console.log(this.irbPageInfo)
      for (let i = 1; i <= this.irbPageInfo.agreeContent.length; i++) {
        this.irbPageInfo.agreeContent[i - 1].agree = false;
      }
    }, err => {
    });
  }

  agreeContents(i) {
    this.irbPageInfo.agreeContent[i].agree = !this.irbPageInfo.agreeContent[i].agree;
  }

  checkAgree() {
    if (this.irbPageInfo) {
      const agreeVoValidation = this.irbService.checkAllAgree(this.irbPageInfo.agreeContent);
      if (!agreeVoValidation) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }

  }

/*  agreeSave() {

  }*/

  // 동의서 설명문 모달 출력
  async openModal() {
    this.mindManager.setModalONOff('ON');
    const modal = await this.modalController.create({
      component: IrbAgreeModalPage,
      cssClass: 'irb-agree-modal-page',
      componentProps: {
        title: this.irbPageInfo.irbTitle,
        detail: this.irbPageInfo.fullDescription
      }
    });
    modal.onDidDismiss()
        .then(() => {
          this.mindManager.setModalONOff('OFF');
        });
    this.termOpenedYn = true;
    return await modal.present();
  }

  // 모달 닫기
  closeTermModal() {
    this.navController.navigateRoot(['/more-info']);
  }

  async openSignatureModal() {
    this.mindManager.setModalONOff('ON');
    if (this.checkAgree()) {
      const modal = await this.modalController.create({
        component: SignatureModalPage,
        cssClass: 'signatureModal'
      });
      modal.onDidDismiss()
          .then((data) => {
            this.mindManager.setModalONOff('OFF');
            if (data.data.data) {
              this.signatureImg = data.data.data.img;
            }
          });
      return await modal.present();
    } else {
      this.alertUtilService.showAlert(null, '모두 동의해주세요.');
    }
  }

  agreeSave() {
    if (!this.termOpenedYn) {
      this.alertUtilService.showAlert(null, '연구 설명문을 읽어주세요.');
      return false;
    }
    const formdata = this.dataURItoBlob();
    this.fileService.uploadFile(formdata).subscribe(res => {
      this.irbService.addOnlineAgreement(res).subscribe(result => {
        const paramVo = {
          queryParams: {
            onlineRes:  true
          }
        };
        const navigationExtras: NavigationExtras = paramVo;
        this.navController.navigateRoot([this.pageInfoService.getToBack()], navigationExtras);
      }, error => {
        this.alertUtilService.showAlert(null, error);
      });
    }, err => {
      this.alertUtilService.showAlert(null, err);
    });
  }

  dataURItoBlob() {
    const blobBin = atob(this.signatureImg.split(',')[1]);	// base64 데이터 디코딩
    const array = [];
    for (let i = 0; i < blobBin.length; i++) {
      array.push(blobBin.charCodeAt(i));
    }
    const file = new Blob([new Uint8Array(array)], {type: 'image/png'});	// Blob 생성
    const formdata = new FormData();	// formData 생성
    const today = this.dateService.getToday('x').dateFormat + '.png';
    formdata.append('file', file, today);
    formdata.append('secureType', 'PRI');
    return formdata;
  }

}
