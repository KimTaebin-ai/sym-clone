import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../services/validation.service';
import {AuthService} from '../mind-module/service/auth.service';

@Component({
  selector: 'app-find-pw',
  templateUrl: './find-pw.page.html',
  styleUrls: ['./find-pw.page.scss'],
})
export class FindPwPage implements OnInit {

  form: FormGroup;
  confirmInfo: any = {
    userId: false
  };
  pwInfo: any = {
    pwType: 'password',
    errMessage: ''
  };

  constructor(
      private fb: FormBuilder,
      private validatorService: ValidationService,
      private authService: AuthService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      id: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(200), Validators.pattern(this.validatorService.emailVlidator)]),
      currPw: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]),
      newPw: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(this.validatorService.passwordValidator)]),
      newPwChk: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20), this.validatorService.equalTo('newPw')])
    });
  }

  isInvalid() {
    const control1 = this.form.get('currPw');
    const control2 = this.form.get('newPw');
    const control3 = this.form.get('newPwChk');
    if (control1.dirty && control1.invalid) {
      this.pwInfo.errMessage = '잘못된 방식의 임시 비밀번호 입니다.';
      return false;
    } else if (control2.dirty && control2.invalid) {
      this.pwInfo.errMessage = '8자리 이상 20자리 이하의 영어와 숫자와 특수문자가 혼합인 형태로 입력주세요.';
      return false;
    } else if (control3.dirty && control3.invalid) {
      this.pwInfo.errMessage = '입력하신 비밀번호가 동일하지 않습니다.';
      return false;
    }
  }


  sendNewPw() {
    this.confirmInfo.userId = true;
    /*this.authService.sendPw(this.form.get('id').value).subscribe()*/
  }

  // 페스워드 미리보기
  viewPassword() {
    if (this.pwInfo.pwType === 'password') {
      this.pwInfo.pwType = 'text';
    } else {
      this.pwInfo.pwType = 'password'
    }
  }
  // 비밀 번호 작성 여부 확인
  pwCheck() {
    const control1 = this.form.get('currPw');
    const control2 = this.form.get('newPw');
    const control3 = this.form.get('newPwChk');
    if (control1.dirty && control1.invalid) {
      this.pwInfo.errMessage = '잘못된 방식의 임시 비밀번호 입니다.';
      return false;
    }
    if (control2.dirty && control2.invalid) {
      this.pwInfo.errMessage = '8자리 이상 20자리 이하의 영어와 숫자와 특수문자가 혼합인 형태로 입력주세요.';
      return false;
    }
/*    if (control3.dirty && control3.invalid) {
      this.pwInfo.errMessage = '입력하신 비밀번호가 동일하지 않습니다.';
      return false;
    }*/
    if (this.form.get('newPw').value !== this.form.get('newPwChk').value) {
        this.pwInfo.errMessage = '입력하신 비밀번호가 동일하지 않습니다.';
        return false;
    }
    if (this.form.get('newPw').value === this.form.get('currPw').value) {
      this.pwInfo.errMessage = '임시 비밀번호와 다른 비밀번호를 입력해주세요.';
      return false;
    }
    return true;
  }

}
