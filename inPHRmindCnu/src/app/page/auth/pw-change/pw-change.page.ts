import { Component, OnInit } from '@angular/core';
import {MindManager} from "../../../mind-module/mind.manager";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, NavigationExtras} from "@angular/router";
import {AlertUtilService} from "../../../util/common/alert-util.service";
import {ValidationService} from "../../../services/validation.service";
import {AuthService} from "../../../mind-module/service/auth.service";
import {AlertController, NavController} from "@ionic/angular";
import {LoadingService} from "../../../util/loading.service";

@Component({
  selector: 'app-pw-change',
  templateUrl: './pw-change.page.html',
  styleUrls: ['./pw-change.page.scss'],
})
export class PwChangePage implements OnInit {

  form: FormGroup;
  fromType = '';

  currPwInfo : any = {
    pwType: 'password',
    errMessage: ''
  }

  newPwInfo: any = {
    pwType: 'password',
    errMessage1: '',
    errMessage2: ''
  };

  constructor(
      private mindManager: MindManager,
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private validatorService: ValidationService,
      private navController: NavController,
      private alertCtrl: AlertController,
      private alertUtilService: AlertUtilService,
      private authService: AuthService,
      private loadingService: LoadingService

  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      currPw: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(200)]),
      newPw: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(this.validatorService.passwordValidator)]),
      newPwChk: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20), this.validatorService.equalTo('newPw')])
    });
  }

  ionViewWillEnter(){
    this.fromType = '';
    this.route.queryParams.subscribe(params => {
      if (params){
        this.fromType = params.from;
      }
    });
  }

  // 현재 비밀번호 미리보기
  viewCurrPassword() {
    if (this.currPwInfo.pwType === 'password') {
      this.currPwInfo.pwType = 'text';
    } else {
      this.currPwInfo.pwType = 'password'
    }
  }

  // 새 비밀번호 미리보기
  viewPassword() {
    if (this.newPwInfo.pwType === 'password') {
      this.newPwInfo.pwType = 'text';
    } else {
      this.newPwInfo.pwType = 'password'
    }
  }

  // 비밀번호 유효성 확인
  currPwCheck() {
    if(this.form.get('currPw').value !== '') {
      if (this.form.get('currPw').dirty && this.form.get('currPw').invalid) {
        this.currPwInfo.errMessage = '현재 비밀번호를 확인해주세요.';
        return false;
      }
      return true;
    }
  }
  newPwCheck(){
    if(this.form.get('newPw').value !== '') {
      if (this.form.get('newPw').dirty && this.form.get('newPw').invalid) {
        this.newPwInfo.errMessage1 = '8자리 이상 20자리 이하의 영어와 숫자와 특수문자가 혼합인 형태로 입력주세요.';
        return false;
      }
      return true;
    }
    if(this.form.get('newPwChk').value !== '') {
      this.pwEqualCheck();
    }
  }
  pwEqualCheck(){
    if(this.form.get('newPwChk').value !== '') {
      if (this.form.get('newPw').value !== this.form.get('newPwChk').value) {
        this.newPwInfo.errMessage2 = '입력하신 비밀번호가 동일하지 않습니다.';
        return false;
      }
      return true;
    }
  }

  // 비밀번호 변경
  updatePw(){
    const reqVo: any = {
      currPassword: this.form.get('currPw').value,
      newPassword: this.form.get('newPw').value
    };
    this.loadingService.showLoading(true, '비밀번호를 변경중입니다.');
    this.authService.updatePw(reqVo).subscribe(res =>{
      console.log('resTS', res);
      this.loadingService.showLoading(false, '');
      this.alertPwChange('비밀번호 변경', res.message);
    }, err => {
      this.loadingService.showLoading(false, '');
      console.log('err', err);
      this.alertUtilService.showAlert('오류', err.message);
    })
  }

  // 변경 알림
  async alertPwChange(alertHeader, alertMsg) {
    const alert = await this.alertCtrl.create({
      header: alertHeader,
      message: alertMsg,
      buttons: [
        {
          text: '확인',
          handler: data => {
            this.resetData();
            this.getToBackPage();
          }
        }
      ]
    });
    await alert.present();
  }

  /*checkVal(model){
    if (this.form.get(model).value.search(/\s/) !== -1) {
      this.form.controls[model].patchValue(this.form.get(model).value.toString().slice(0, this.form.get(model).value.toString().length - 1));
    }
  }*/


  resetData(){

  }

  getToBackPage() {
    this.navController.navigateRoot(['/member-info']);
  }


}
