import { Injectable } from '@angular/core';
import {AbstractControl, ValidatorFn} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  public passwordValidator: RegExp;
  public idValidator: RegExp;
  public emailVlidator: RegExp;
  public onlyNumber: RegExp;
  public phoneNumber: RegExp;
  public emailId: RegExp;
  public emailAddr: RegExp;
  public bodyVal: RegExp;
  public birthDay: RegExp;

  constructor() {
    // 8자리 이상 20자리 이하의 영어와 숫자와 특수문자가 혼합인 비밀번호 정규식
    this.passwordValidator = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[#$^+=!*()@%&`~,./?-_=+]).[^/<>:\\]{7,19}$/;
    
    // 5자리 이상 20자리 이하의 첫글자가 영어로 시작하고 영어와 숫자가 혼합인 아이디 정규식
    this.idValidator = /^[a-zA-Z](?=.{0,18}[0-9])[0-9a-zA-Z]{4,19}$/;

    // 이메일 정규식
    this.emailVlidator =  /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    // 이메일 아이디 정규식
    this.emailId = /^([0-9a-zA-Z_\.-]+)$/

    // 이메일 주소 정규식
    this.emailAddr = /^[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

    // 오직 숫자만
    this.onlyNumber = /^[0-9]*$/;

    // 소수점 2자리, 정수 3자리 정규식
    this.bodyVal = /^-?(\d{1,3}([.]\d{0,2})?)?$/;

    // 휴대폰 번호
    this.phoneNumber = /(^01([0|1|6|7|8|9]{1}?))-([0-9]{3,4})-([0-9]{4})$/;

    // 생년월일
    this.birthDay = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;

  }

  // 0 : 성공
  // 1 : 실패

  // 아이디 유효성 검사
  public idCheckVal(str) {
    const result: any = {
      code: '',
      message: ''
    };
    if (str.length <= 5 || str.length >= 20){
      result.code = '1';
      result.message = '5자리 이상 20자리 이하로 입력해주세요.';
      return result;
    }
    if (str.search(/\s/) !== -1){
      result.code = '1';
      result.message = '아이디에 공백을 넣을 수 없습니다.';
      return result;
    }
    const val = this.idValidator.test(str);
    if (!val) {
      result.code = '1';
      result.message = '영어로 시작하는 5자리 이상 20자리 이하의 영어와 숫자로 입력해주세요.';
      return result;
    }
    result.code = '0';
    result.message = '사용가능한 아이디입니다.';
    return result;
  }

  // 이메일 아이디 유효성 검사
  public emailIdChkVal(str) {
    const result: any = {
      code: '',
      message: ''
    };
    const val = this.emailId.test(str);
    if (!val) {
      result.code = '1';
      result.message = '이메일 아이디가 잘못되었습니다.';
      return result;
    }
    result.code = '0';
    result.message = '사용가능한 이메일 아이디입니다.';
    return result;
  }

  // 패스워드 유효성 검사
  public passwordCheckVal(str){
    const result: any = {
      code: '',
      message: ''
    };
    const val = this.passwordValidator.test(str);
    if (!val) {
      result.code = '1';
      result.message = '8자리 이상 20자리 이하의 영어와 숫자와 특수문자가 혼합인 비밀번호를 입력해주세요.';
      return result;
    }
    result.code = '0';
    result.message = '사용 가능한 비밀번호입니다.';
    return result;
  }

  // 휴대폰 유효성 검사
  public mobileCheckVal(str){
    const result: any = {
      code: '',
      message: ''
    };
    if (!str){
      result.code = 1;
      result.message = '';
      return result;
    }
    if (str.search(/\s/) !== -1){
      result.code = 1;
      result.message = '휴대폰 번호에 공백을 넣을 수 없습니다.';
      return result;
    }
    const val = this.phoneNumber.test(str);
    if (!val) {
      result.code = '1';
      result.message = '000-0000-0000 형식으로 입력해주세요.';
      return result;
    }
    result.code = 0;
    result.message = '사용 가능한 휴대폰 번호입니다.';
    return result;
  }

  // 이메일 유효성 검사
  public emailCheckVal(str){
    const result: any = {
      code: '',
      message: ''
    };
    if (str.search(/\s/) !== -1){
      result.code = '1';
      result.message = '이메일에 공백을 넣을 수 없습니다.';
      return result;
    }
    const val = this.emailVlidator.test(str);
    if (!val) {
      result.code = '1';
      result.message = '이 메일형식이 올바르지 않습니다.';
      return result;
    }
    result.code = '0';
    result.message = '사용 가능한 이메일입니다.';
    return result;
  }

  // 공백 체크
  public blankCheckVal(str){
    const result: any = {
      code: '',
      message: ''
    };
    if (str.search(/\s/) !== -1){
      result.code = '1';
      result.message = '공백을 넣을 수 없습니다.';
      return result;
    }
    result.code = '0';
    result.message = '공백이 존재하지 않습니다.';
    return result;
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

  // 입력창 유효성 검사
  async checkInputVal(type, text){
    const result: any = {
      value: true,
      message: ''
    };
    // 성공 : true, 실패: false
    // 빈값 검사
    if (text.length >= 1){
      // 공백 검사
      if (text.search(/\s/) !== -1){
        result.value = false;
        result.message = '공백을 넣을 수 없습니다.';
        return result;
      }
      // 생년월일 유효성 검사
      if (type === 'birthday') {
        if (text.length !== 8 || !this.birthDay.test(text)) {
          result.value = false;
          result.message = '년(4자) 월(2자) 일(2자) 형식으로 입력해주세요.';
        }
        if (text.length === 8) {
          const year = text.substring(0, 4);
          const month = text.substring(4, 6);
          const day = text.substring(6);
          console.log(year, month, day);
          if (month === '02' && Number(day) > 29) {
            result.value = false;
            result.message = '2월은 29까지 존재 합니다';
          } else if (month === '04' && Number(day) > 30) {
            result.value = false;
            result.message = '4월은 30까지 존재 합니다';
          } else if (month === '06' && Number(day) > 30) {
            result.value = false;
            result.message = '6월은 30까지 존재 합니다';
          } else if (month === '09' && Number(day) > 30) {
            result.value = false;
            result.message = '9월은 30까지 존재 합니다';
          } else if (month === '11' && Number(day) > 30) {
            result.value = false;
            result.message = '11월은 30까지 존재 합니다';
          }

        }
      } else if (type === 'password' || type === 'passwordChk') {
        const val = this.passwordValidator.test(text);
        if (!val) {
          result.value = false;
          result.message = '8자리 이상 20자리 이하의 영어와 숫자와 특수문자가 혼합인 비밀번호를 입력해주세요.';
        }
      } else if (type === 'loginId') {
        const val = this.emailVlidator.test(text);
        if (!val) {
          result.value = false;
          result.message = '이메일 아이디가 잘못되었습니다.';
        }
      }
    }
    return result;
  }
}


