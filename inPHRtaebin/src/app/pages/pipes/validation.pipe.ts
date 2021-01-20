import { stringify } from '@angular/compiler/src/util';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validation'
})
export class ValidationPipe implements PipeTransform {
  public passwordValidator: RegExp;
  public idValidator: RegExp;
  public emailVlidator: RegExp;
  public onlyNumber: RegExp;
  public phoneNumber: RegExp;
  public emailId: RegExp;
  public emailAddr: RegExp;
  public bodyVal: RegExp;
  public birthDay: RegExp;

  transform(value: string, type: string): any {
    switch(type) {
      case 'id' : 
        return this.idChk(value);
      case 'pw' : 
        return this.pwChk(value);
    }
  }


  public idChk(data: string): any {
    // 5자리 이상 20자리 이하의 첫글자가 영어로 시작하고 영어와 숫자가 혼합인 아이디 정규식
    this.idValidator = /^[a-zA-Z](?=.{0,18}[0-9])[0-9a-zA-Z]{4,19}$/;
    let reg: Reg;

    reg.code = true;
    reg.msg = '사용가능한 아이디입니다.';

    if (data.length <= 5 || data.length >= 20) {
      reg.code = false;
      reg.msg = '아이디는 5글자 이상 20글자 이하로 입력해주세요.';
    }
    if (data.search(/\s/) !== -1) {
      reg.code = false;
      reg.msg = '아이디에 공백을 넣을 수 없습니다.';
    }
    if (!this.idValidator.test(data)) {
      reg.code = false;
      reg.msg = '영어로 시작하는 5자리 이상 20자리 이하의 영어와 숫자로 입력해주세요';
    }

    return reg;
  }

  public emailChk(data: string): any {
    // 이메일 정규식
    this.emailVlidator = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    let reg: Reg;

    reg.code = true;
    reg.msg = '사용가능한 이메일입니다.';

    if (!this.emailVlidator.test(data)) {
      reg.code = false;
      reg.msg = '이메일 형식이 올바르지 않습니다.';
    }
    if (data.search(/\s/) !== -1) {
      reg.code = false;
      reg.msg = '이메일에 공백을 넣을 수 없습니다.';
    }
    
    return reg;
  }

  public pwChk(data: string): any {
    // 8자리 이상 20자리 이하의 영어와 숫자와 특수문자가 혼합인 비밀번호 정규식
    this.passwordValidator = /^.*(?=.{8,10})(?=.*[a-zA-Z])(?=.*?[A-Z])(?=.*\d)(?=.+?[\W|_])[a-zA-Z0-9!@#$%^&*()-_+={}\|\\\/]+$/g;

    let reg: Reg;

    reg.code = true;
    reg.msg = '사용가능한 이메일입니다.';

    if (!this.passwordValidator.test(data)) {
      reg.code = false;
      reg.msg = '8자리 이상 20자리 이하의 영어와 숫자와 특수문자가 혼합된 비밀번호를 입력해주세요';
    }

    return reg;
  }
}

interface Reg {
  code: boolean,
  msg: string
}