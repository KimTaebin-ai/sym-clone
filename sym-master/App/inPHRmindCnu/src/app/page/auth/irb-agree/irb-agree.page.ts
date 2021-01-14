import { Component, OnInit } from '@angular/core';
import {ValidationService} from '../../../services/validation.service';
import {AlertUtilService} from '../../../util/common/alert-util.service';
import {NavigationExtras} from '@angular/router';
import {NavController} from '@ionic/angular';
import {MindManager} from '../../../mind-module/mind.manager';

@Component({
  selector: 'app-irb-agree',
  templateUrl: './irb-agree.page.html',
  styleUrls: ['./irb-agree.page.scss'],
})
export class IrbAgreePage implements OnInit {

  agreeVo: any = {
    agree1 : false,
    agree2 : false,
    agree3 : false,
    agree4 : false,
    agree5 : false,
    agree6 : false,
    agree7 : false,
  }

  agreeInfo: any = {
    userNm : '',
    agreeYn : '',
    agreeDate : ''
  }
  constructor(
      private validationService: ValidationService,
      private alertUtilService: AlertUtilService,
      public navController: NavController,
      private mindManager: MindManager
  ) { }

  ngOnInit() {
  }

  agreeContents(type) {
    if (type === 'agree1') {this.agreeVo.agree1 = !this.agreeVo.agree1; }
    else if (type === 'agree2') {this.agreeVo.agree2 = !this.agreeVo.agree2; }
    else if (type === 'agree3') {this.agreeVo.agree3 = !this.agreeVo.agree3; }
    else if (type === 'agree4') {this.agreeVo.agree4 = !this.agreeVo.agree4; }
    else if (type === 'agree5') {this.agreeVo.agree5 = !this.agreeVo.agree5; }
    else if (type === 'agree6') {this.agreeVo.agree6 = !this.agreeVo.agree6; }
    else if (type === 'agree7') {this.agreeVo.agree7 = !this.agreeVo.agree7; }
  }

  checkAgree() {
    const agreeVoValidation = this.validationService.irbAgree('CHECKBOX', this.agreeVo);
    const agreeInfoValidation = this.validationService.irbAgree('CHECKINFO', this.agreeInfo);
    if (!agreeVoValidation || !agreeInfoValidation) {
      return false;
    } else {
      return true;
    }
  }

  agreeSave() {

  }

  // 모달 닫기
  closeTermModal() {
    console.log(this.mindManager.getPageInfo())
    this.navController.navigateRoot(['/more-info']);
  }

}
