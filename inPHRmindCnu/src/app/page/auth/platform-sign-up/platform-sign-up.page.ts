import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertController, ModalController, NavController} from '@ionic/angular';
import {AuthService} from '../../../mind-module/service/auth.service';
import {AlertUtilService} from '../../../util/common/alert-util.service';
import {PageInfoService} from '../../../services/page-info.service';
import {ValidationService} from '../../../services/validation.service';
import {TermModalPage} from '../../modal/term-modal/term-modal.page';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {MindManager} from '../../../mind-module/mind.manager';

@Component({
  selector: 'app-platform-sign-up',
  templateUrl: './platform-sign-up.page.html',
  styleUrls: ['./platform-sign-up.page.scss'],
})
export class PlatformSignUpPage implements OnInit {
  // 약관
  termList: any = [];
  selectedTerm: any = [];

  // 회원가입
  form: FormGroup;

  // 토큰
  token = '';
  loginInfo: any = {
    loginId: '',
    password: '',
    snsType: 'D',
    fcmToken: ''
  }

  // 회원 정보
  memberInfoYn = false;

  // 유효성 알림 메세지
  checkInputValMessage: any = {
    birthday: '',
  }

  constructor(
      private modalController: ModalController,
      private authService: AuthService,
      private alertUtilService: AlertUtilService,
      private pageInfoService: PageInfoService,
      private navController: NavController,
      private fb: FormBuilder,
      private validatorService: ValidationService,
      private route: ActivatedRoute,
      private router: Router,
      private alertCtrl: AlertController,
      private mindManager: MindManager
  ) {
  }

  ngOnInit() {
    this.getTermList();
    this.form = this.fb.group({
      loginId: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(200), Validators.pattern(this.validatorService.emailVlidator)]),
      firstName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
      birthday: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
      sex: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
    });
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.queryParams) {
        console.log(this.router.getCurrentNavigation().extras.queryParams, '파람')
        if (this.router.getCurrentNavigation().extras.queryParams) {
          const paramData: any = this.router.getCurrentNavigation().extras.queryParams;
          if (!paramData.usrInfoData.email || !paramData.usrInfoData.firstName || !paramData.usrInfoData.lastName || !paramData.usrInfoData.birthday ||
              !paramData.usrInfoData.sex ) {
            this.memberInfoYn = true;
          } else {
            this.memberInfoYn = false;
          }

          this.form.controls.loginId.patchValue(paramData.usrInfoData.email);
          this.form.controls.firstName.patchValue(paramData.usrInfoData.firstName);
          this.form.controls.lastName.patchValue(paramData.usrInfoData.lastName);
          this.form.controls.birthday.patchValue(paramData.usrInfoData.birthday);
          this.form.controls.sex.patchValue(paramData.usrInfoData.sex);

          this.loginInfo.loginId = paramData.loginInfo.loginId;
          this.loginInfo.password = paramData.loginInfo.password;
          this.token = paramData.usrInfoData.token;
        }
      }
    });

/*    this.route.queryParams.subscribe(params => {
      if (params){
        console.log(params.usrInfodata);
      }
    });*/
    /*this.route.queryParams.subscribe(params => {
      if (params) {
        console.log(JSON.stringify(params.usrInfodata)

        this.form.controls.loginId.patchValue(params.usrInfodata.loginId));
        this.form.controls.firstName.patchValue(params.usrInfodata.firstName);
        this.form.controls.lastName.patchValue(params.usrInfodata.lastName);
        this.form.controls.birthday.patchValue(params.usrInfodata.birthday);
        this.form.controls.sex.patchValue(params.usrInfodata.sex);
        this.token = params.usrInfodata.token;
      }
    });*/
  }


  // 약관---------------------------------
  // 약관 리스트 조회
  getTermList() {
    this.authService.getTermList().subscribe(res => {
      this.termList = res;
    }, err => {
      console.log(err);
      this.termList = [];
      this.alertUtilService.showAlert(null, '약관 정보를 불러오는 도중<br>오류가 발생하였습니다.');
      const lastUrl = this.pageInfoService.getToBack();
      if (lastUrl) {
        this.navController.navigateRoot([lastUrl]);
      } else {
        this.alertUtilService.showAlert(null, '이전 위치를 조회하는 도중 오류가 발생하였습니다.APP를 종료 후 다시 실행 시켜주세요.');
      }
    });
  }

  // 약관 모두 동의
  selectAll() {
    if (this.selectedTerm.length === this.termList.length) {
      this.selectedTerm = [];
    } else {
      for (let i = 0; i < this.termList.length; i++) {
        if (this.selectedTerm.indexOf(i) === -1) {
          this.selectedTerm.push(i);
        }
      }
    }
  }

  // 선택된 약관 확인
  checkTermYn(type, index) {
    if (type === 'ALL') {
      if (this.selectedTerm.length === this.termList.length) {
        return true;
      } else {
        return false;
      }
    } else if ('LIST') {
      const indexOf = this.selectedTerm.indexOf(index);
      if (indexOf === -1) {
        return false;
      } else {
        return true;
      }
    } else if ('BUTTON') {
      if (this.selectedTerm.length === this.termList.length) {
        return true;
      } else {
        return false;
      }
    }
  }

  // 약관 선택
  selectTerm(index) {
    const indexOf = this.selectedTerm.indexOf(index);
    if (indexOf === -1) {
      this.selectedTerm.push(index);
    } else {
      this.selectedTerm.splice(indexOf, 1);
    }
  }

  async openModal(term, detail) {
    const modal = await this.modalController.create({
      component: TermModalPage,
      cssClass: 'modal60per',
      componentProps: {
        termTitle: term,
        termDetail: detail
      }
    });
    return await modal.present();
  }


  // 회원 가입
  signUp() {
    const reqVo: any = {
      firstName: this.form.controls.firstName.value,
      lastName: this.form.controls.lastName.value,
      birthday: this.form.controls.birthday.value,
      sex: this.form.controls.sex.value,
      token: this.token
    };
    this.authService.joinSym(reqVo).subscribe(res => {
      this.authService.login(this.loginInfo).subscribe(result => {
        this.authService.setMemberInfo(result, false);
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
        //this.showConfirmAlert();
      }, error => {
        this.alertUtilService.showAlert(null, '회원가입은 완료하였으나<br>로그인을 하는 도중<br>오류가 발생하였습니다.');
      });
    }, err => {

    });
  }
  selectSex(sexType) {
    this.form.controls.sex.patchValue(sexType);
  }

  checkSexType(sexType) {
    return this.form.get('sex').value === sexType ? true : false;
  }

  // 통합아이디 확인창
  async showConfirmAlert() {
    const alert = await this.alertCtrl.create({
      header: '알림',
      message: '자동로그인을 사용하시겠습니까?<br>자동로그인을 사용하시면<br>잠금화면을 사용할 수 있습니다.',
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
              const paramVo = {
                queryParams: {
                  code: 0,
                  pwYn: false
                }
              };
              const systemInfo = this.mindManager.getSystemInfo();
              systemInfo.autoLogin = false;
              this.mindManager.setSystemInfo(systemInfo);
              this.mindManager.setLockState(false);
              const navigationExtras: NavigationExtras = paramVo;
              this.navController.navigateRoot(['/lock'], navigationExtras);
            });
          }
        }
      ]
    });
    await alert.present();
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
        default: break;
      }
    });
  }
}
