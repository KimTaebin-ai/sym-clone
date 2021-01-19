import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MindManager} from '../../../mind-module/mind.manager';
import * as moment from 'moment';
import {DateService} from '../../../util/common/date.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../../../services/validation.service';
import {AlertUtilService} from '../../../util/common/alert-util.service';
import {AuthService} from '../../../mind-module/service/auth.service';
import {AlertController, IonContent, NavController} from '@ionic/angular';
import {PageInfoService} from '../../../services/page-info.service';
import {NavigationExtras} from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit, OnDestroy {
  // keyboard 높이
  keyboardHight = '100vh';
  @ViewChild(IonContent) content: IonContent;

  form: FormGroup;

  // 타이머
  timer: any = {
    num: 0
  };

  // 인증번호
  authNumber = '';

  conditionValue: any = {
    // 이메일 인증 확인
    certificationEmail: false,
    // 이메일 인증창
    showEmailAuthNum: false,
    // 타이머
    timer: false,
    emailReadOnly: false,
    showPw: 'password',
    // 인증 받은 이메일
    certificationEmailAdd: ''
  };

  // 유효성 알림 메세지
  checkInputValMessage: any = {
    birthday: '',
    loginId: ''
  }

  constructor(
      private mindManager: MindManager,
      private dateService: DateService,
      private fb: FormBuilder,
      private validatorService: ValidationService,
      private alertUtilService: AlertUtilService,
      private authService: AuthService,
      private alertCtrl: AlertController,
      private pageInfoService: PageInfoService,
      private navController: NavController
  ) {
  }


  ngOnInit() {
    this.form = this.fb.group({
      loginId: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(200), Validators.pattern(this.validatorService.emailVlidator)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(this.validatorService.passwordValidator)]),
      passwordChk: new FormControl('', [Validators.required, this.validatorService.equalTo('password')]),
      firstName: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      birthday: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      sex: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      certificationYn: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
    });
/*    window.addEventListener('keyboardWillShow', (event) => {
      // Describe your logic which will be run each time when keyboard is about to be shown.
      console.log(event);
      // this.keyboardHight = 'calc(100vh + ' + (event.keyboardHeight * 4) + 'px)';
      // this.content.scrollToPoint(0, 350);
    });

    window.addEventListener('keyboardWillHide', () => {
      console.log('키보드 닫기')
      this.keyboardHight = '100vh';
    });*/
  }

  ngOnDestroy(): void {
  }


  createTimer() {
    const isExist = Object.keys(this.timer).includes('timerFunction');
    if (isExist) {
      clearInterval(this.timer.timerFunction);
      this.timer = {
        num: 0,
        time: ''
      };
    }
    this.conditionValue.timer = true;
    this.timer.num = 600;
    this.timer.timerFunction = setInterval(() => {
      this.timer.num--;
      this.timer.time = (Math.floor(this.timer.num / 60) + '분' + (this.timer.num % 60) + '초').toString(); // 남은 시간 계산
      if (this.timer.num === 0) {
        clearInterval(this.timer.timerFunction);
        this.alertUtilService.showAlert(null, '<p class="popup_boldText">인증번호가 만료되었습니다.<br>재인증해주세요.</p>');
        this.conditionValue.timer = false;
        this.conditionValue.showEmailAuthNum = false;
        this.form.controls.certificationYn.patchValue('N');
      }
    }, 1000);
  }

  stopTimer() {
    const isExist = Object.keys(this.timer).includes('timerFunction');
    if (isExist) {
      clearInterval(this.timer.timerFunction);
      this.timer = {
        num: 0,
        time: ''
      };
    }
    this.conditionValue.timer = false;
  }


  // 인증---------------------------------------------
  // 이메일 인증
  emailCertification() {
    this.authService.joinCertKeySend(this.form.get('loginId').value).subscribe(res => {
      this.alertUtilService.showAlert(null, res);
      this.conditionValue.showEmailAuthNum = true;
      this.conditionValue.certificationEmailAdd = this.form.get('loginId').value;
      this.createTimer();
    }, err => {
      console.log(err)
      this.alertUtilService.showAlert(null, err);
      this.conditionValue.certificationEmailAdd = '';
      this.conditionValue.showEmailAuthNum = false;
    });
  }

  // 인증 번호 확인
  certificationAuthNum() {
    if (!this.conditionValue.certificationEmailAdd ||
        this.conditionValue.certificationEmailAdd !== this.form.get('loginId').value) {
      this.alertUtilService.showAlert(null, '인증번호를 받은 이메일 아닙니다.<br>다시 인증해주세요.');
      this.conditionValue.certificationEmailAdd = '';
      this.conditionValue.showEmailAuthNum = false;
      this.stopTimer();
      return false;
    }
    const reqVo: any = {
      loginId: this.form.get('loginId').value,
      authKey: this.authNumber
    }
    this.authService.certKeyCheck(reqVo).subscribe(res => {
      this.alertUtilService.showAlert(null, res);
      this.form.controls.certificationYn.patchValue('Y');
      this.conditionValue.emailReadOnly = true;
      this.stopTimer();
    }, err => {
      this.alertUtilService.showAlert(null, err);
    });
  }

  // 회원가입
  signUp() {
    const reqVo: any = {
      birthday: this.form.get('birthday').value,
      firstName: this.form.get('firstName').value,
      lastName: this.form.get('lastName').value,
      loginId: this.form.get('loginId').value,
      password: this.form.get('password').value,
      sex: this.form.get('sex').value,
      snsType: 'D'
    };
    this.authService.signUpSim(reqVo, 'D').subscribe(res => {
      this.authService.login(reqVo).subscribe(result => {
        this.authService.setMemberInfo(result, false);
        //this.showConfirmAlert();
        this.pageInfoService.getToOtherPage('/login', '/more-info', '추가 정보 입력').then(() => {
          const systemInfo = this.mindManager.getSystemInfo();
          systemInfo.autoLogin = false;
          this.mindManager.setSystemInfo(systemInfo);
          this.mindManager.setLockState(false);
          const paramVo = {
            queryParams: {
              code: 0,
              pwYn: false
            }
          };
          const navigationExtras: NavigationExtras = paramVo;
          this.navController.navigateRoot(['/more-info'], navigationExtras);
        });
      }, error => {
        this.alertUtilService.showAlert(null, '회원가입은 완료하였으나 로그인을 하는 도중 오류가 발생하였습니다.');
      });
    }, err => {
      this.alertUtilService.showAlert(null, err);
    });
  }

  // 통합아이디 확인창
  async showConfirmAlert() {
    const alert = await this.alertCtrl.create({
      header: '알림',
      message: '자동로그인을 사용하시겠습니까?<br>자동로그인을 사용하시면 잠금화면을 사용할 수 있습니다.',
      buttons: [
        {
          text: '예',
          handler: data => {
            const systemInfo = this.mindManager.getSystemInfo();
            systemInfo.autoLogin = true;
            this.mindManager.setSystemInfo(systemInfo);
            this.mindManager.setLockState(true);
            this.pageInfoService.getToOtherPage('/login', '/lock', '가입완료').then(() => {
              const paramVo = {
                queryParams: {
                  code: 0,
                  pwYn: false
                }
              };
              const navigationExtras: NavigationExtras = paramVo;
              this.navController.navigateRoot(['/lock'], navigationExtras);
            });
          }
        },
        {
          text: '아니요',
          role: 'cancel',
          handler: data => {
            this.pageInfoService.getToOtherPage('/login', '/lock', '가입완료').then(() => {
              const systemInfo = this.mindManager.getSystemInfo();
              systemInfo.autoLogin = false;
              this.mindManager.setSystemInfo(systemInfo);
              this.mindManager.setLockState(false);
              const paramVo = {
                queryParams: {
                  code: 0,
                  pwYn: false
                }
              };
              const navigationExtras: NavigationExtras = paramVo;
              this.navController.navigateRoot(['/lock'], navigationExtras);
            });
          }
        }
      ]
    });
    await alert.present();
  }


  selectSex(sexType) {
    this.form.controls.sex.patchValue(sexType);
  }

  checkSexType(sexType) {
    return this.form.get('sex').value === sexType ? true : false;
  }

  showPw(){
    if (this.conditionValue.showPw === 'password') {
      this.conditionValue.showPw = 'text';
    } else {
      this.conditionValue.showPw = 'password';
    }
  }


  numberOnly(event, model): boolean {
    if (model === 'authNumber' && event.target.value.length > 5) {
      return false;
    }
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  inputData(event, model) {
    if (model === 'authNumber') {
      this.authNumber = event.target.value;
    } else {
      this.form.controls.birth.patchValue(event.target.value);
    }
  }


  // 입력창 유효성 검사
  isInvalid(name: string) {
    this.form.controls.passwordChk.updateValueAndValidity();
    const control = this.form.get(name);
    return control.dirty && control.invalid;
  }

  keyPressForVal(event: any, type: string) {
    const inputChar = String.fromCharCode(event.charCode);
    let pattern;
    if (type === 'password' || type === 'passwordChk' || type === 'loginId') {
      pattern = /^\s*/;
      if (!pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
    this.form.controls[type].updateValueAndValidity();
  }

  keyupForVal(type){
    /*checkInputVal(type) {*/
    this.validatorService.checkInputVal(type, this.form.get(type).value).then(res => {
      switch (type) {
        case 'birthday': this.checkInputValMessage.birthday = !res.value ? res.message : ''; break;
        case 'password': this.checkInputValMessage.password = !res.value ? res.message : ''; break;
        case 'passwordChk': this.checkInputValMessage.passwordChk = !res.value ? res.message : ''; break;
        case 'loginId': this.checkInputValMessage.loginId = !res.value ? res.message : ''; break;
        default: break;
      }
    });
  }
}
