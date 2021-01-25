import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../../../services/validation.service';
import {AuthService} from '../../../mind-module/service/auth.service';
import {AlertController, NavController} from "@ionic/angular";
import {AlertUtilService} from "../../../util/common/alert-util.service";

@Component({
  selector: 'app-find-pw',
  templateUrl: './find-pw.page.html',
  styleUrls: ['./find-pw.page.scss'],
})
export class FindPwPage implements OnInit {

  form: FormGroup;
  confirmInfo: any = {
    userId: false,
    errMessage: ''
  };
  tempPwInfo: any = {
    pwType: 'password',
    errMessage: ''
  };
  newPwInfo: any = {
    pwType: 'password',
    errMessage1: '',
    errMessage2: ''
  };

  constructor(
      private fb: FormBuilder,
      private validatorService: ValidationService,
      private authService: AuthService,
      private navController: NavController,
      private alertCtrl: AlertController,
      private alertUtilService: AlertUtilService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      loginId: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]),
      currPw: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]),
      newPw: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(this.validatorService.passwordValidator)]),
      newPwChk: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20), this.validatorService.equalTo('newPw')])
    });
  }

  // 임시비밀번호 발급
  sendTempPw() {
    const reqVo = {
      loginId: this.form.get('loginId').value
    };
    this.authService.sendTempPw(reqVo).subscribe(res =>{
      console.log('resTS', res);
      this.alertUtilService.showAlert('임시 비밀번호 발급', res.message);
      this.confirmInfo.userId = true;
    }, err => {
      console.log('err : ', err);
      this.alertUtilService.showAlert('오류', err.message);
    })
  }

  // 임시 비밀번호 미리보기
  viewTempPassword() {
    if (this.tempPwInfo.pwType === 'password') {
      this.tempPwInfo.pwType = 'text';
    } else {
      this.tempPwInfo.pwType = 'password'
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

  //아이디 유효성 확인
  loginIdCheck(){
    if(this.form.get('loginId').value !== '') {
      if (this.form.get('loginId').value == '') {
        this.confirmInfo.errMessage = '';
        return false;
      }
      return true;
    }
  }

  // 비밀번호 유효성 확인
  tempPwCheck() {
    if(this.form.get('currPw').value !== '') {
      if (this.form.get('currPw').dirty && this.form.get('currPw').invalid) {
        this.tempPwInfo.errMessage = '임시 비밀번호는 8자리 영어와 숫자의 조합입니다.';
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

  // 비밀번호 찾기_비밀번호 변경
  updatePwAfterChk(){
    const reqVo = {
      loginId : this.form.get('loginId').value,
      currPassword: this.form.get('currPw').value,
      newPassword: this.form.get('newPw').value
    }
    this.authService.updatePwAfterChk(reqVo).subscribe(res =>{
      console.log('resTS', res);
      this.alertPwChange('비밀번호 변경', res.message);
    }, err => {
      console.log('resTS', err);
      this.alertUtilService.showAlert('오류', err.message);
    })
  }

  async alertPwChange(alertHeader, alertMsg) {
  // 비밀번호 변경 알림
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
  getToBackPage() {
    this.navController.navigateRoot(['/login']);
  }

  resetData(){

  }
}
