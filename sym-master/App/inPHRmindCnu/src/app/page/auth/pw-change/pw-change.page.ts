import { Component, OnInit } from '@angular/core';
import {MindManager} from "../../../mind-module/mind.manager";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-pw-change',
  templateUrl: './pw-change.page.html',
  styleUrls: ['./pw-change.page.scss'],
})
export class PwChangePage implements OnInit {

  form: FormGroup;
  fromType = '';

  currPwType = 'password';
  passwordType = 'password';

  showMeCurrPw = 'N';
  showMePw = 'N';

  constructor(
      private mindManager: MindManager,
      private fb: FormBuilder,

  ) { }

  ngOnInit() {
    const pageInfo: any = {
      url: '/',
      title: '비밀번호 변경'
    };
    this.mindManager.setPageInfo(pageInfo);

    this.form = this.fb.group({
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)])
      // password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(this.validatorService.passwordValidator)]),
      // passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20), this.validatorService.equalTo('password')])
    });
  }

  isInvalid(name: string) {
    this.form.controls['newPwConfirm'].updateValueAndValidity();
    const control = this.form.get(name);
    return control.dirty && control.invalid;
  }

  changeCurrPwType(){
    if (this.currPwType === 'password'){
      this.currPwType = 'text';
      this.showMeCurrPw = 'Y';
    } else {
      this.currPwType = 'password';
      this.showMeCurrPw = 'N';
    }
  }

  changePwType(){
    if (this.passwordType === 'password'){
      this.passwordType = 'text';
      this.showMePw = 'Y';
    } else {
      this.passwordType = 'password';
      this.showMePw = 'N';
    }
  }

  checkVal(model){
    if (this.form.get(model).value.search(/\s/) !== -1) {
      this.form.controls[model].patchValue(this.form.get(model).value.toString().slice(0, this.form.get(model).value.toString().length - 1));
    }
  }



}
