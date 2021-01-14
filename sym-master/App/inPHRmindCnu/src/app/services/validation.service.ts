import { Injectable } from '@angular/core';
import {AbstractControl, ValidatorFn} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  public emailVlidator: RegExp;
  public passwordValidator: RegExp;
  constructor() {
    // 이메일 정규식
    this.emailVlidator = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    // 8자리 이상 20자리 이하의 영어와 숫자와 특수문자가 혼합인 비밀번호 정규식
    this.passwordValidator = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).[^/<>:\\]{7,19}$/;
  }

  irbAgree(type, data) {
    // 동의 체크 확인
    if (type === 'CHECKBOX') {
      let resultValidation = true;
      for (const [key, value] of Object.entries(data)) {
        if (!value) {
          resultValidation = !resultValidation;
          break;
        }
      }
      return resultValidation;
    } else {
      if (!data.userNm || !data.agreeYn || !data.agreeDate) {
        return false;
      } else {
        return true;
      }
    }
  }

  public equalTo(field_name: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const isValid = control.root.value[field_name] === control.value;
      if (!isValid) {
        return { equalTo: { isValid } };
      }
      return null;
    };
  }

}
