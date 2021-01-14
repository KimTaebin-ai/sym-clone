import {Component, OnInit} from '@angular/core';
import {TermModalPage} from '../../modal/term-modal/term-modal.page';
import {AlertController, ModalController, NavController} from '@ionic/angular';
import {AuthService} from '../../../mind-module/service/auth.service';
import {AlertUtilService} from '../../../util/common/alert-util.service';
import {PageInfoService} from '../../../services/page-info.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../../../services/validation.service';
import {ActivatedRoute, NavigationExtras} from '@angular/router';
import {MindManager} from '../../../mind-module/mind.manager';

@Component({
    selector: 'app-sns-sign-up',
    templateUrl: './sns-sign-up.page.html',
    styleUrls: ['./sns-sign-up.page.scss'],
})
export class SnsSignUpPage implements OnInit {
    // 약관
    termList: any = [];
    selectedTerm: any = [];

    // 회원가입
    form: FormGroup;

    sns: any = {
        type: '',
        info: {}
    };

    conditionValue: any = {
        emailYn: false,
        emailReadOnly: false,
        timer: false,
        showEmailAuthNum: false,
        certificationYn: false,
        certificationEmailAdd: ''
    };

    // 타이머
    timer: any = {
        num: 0
    };

    // 인증번호
    authNumber = '';

    // 유효성 알림 메세지
    checkInputValMessage: any = {
        birthday: '',
        password: '',
        passwordChk: '',
        loginId: ''
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
        private alertCtrl: AlertController,
        private mindManager: MindManager
    ) {
    }

    ngOnInit() {
        this.getTermList();
        this.form = this.fb.group({
            loginId: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(200), Validators.pattern(this.validatorService.emailVlidator)]),
            firstName: new FormControl('', [Validators.required, Validators.maxLength(10)]),
            lastName: new FormControl('', [Validators.required, Validators.maxLength(10)]),
            birthday: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
            sex: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
        });

        this.route.queryParams.subscribe(params => {
            if (params) {
                this.sns.type = params.loginType;
                if (params.email) {
                    this.sns.email = params.email;
                    this.conditionValue.emailYn = true;
                    this.conditionValue.emailReadOnly = true;
                    this.conditionValue.certificationYn = true;
                } else {
                    this.conditionValue.emailYn = false;
                    this.conditionValue.emailReadOnly = false;
                    this.conditionValue.certificationYn = false;
                }
                this.sns.id = params.id;
                this.sns.accessToken = params.accessToken;
                this.sns.refreshToken = params.refreshToken;
                this.sns.expiresIn = params.expiresIn;
                this.form.controls.loginId.patchValue(this.sns.email);
            }
        });
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
        console.log(this.selectedTerm.length + '/' + this.termList.length);
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


    // 회원 가입-----------------------------------

    // 성별 선택
    selectSex(sexType) {
        this.form.controls.sex.patchValue(sexType);
    }

    // 성별 유형 확인
    checkSexType(sexType) {
        return this.form.get('sex').value === sexType ? true : false;
    }

    // SNS 회원가입
    signUpSns() {
        const reqVo: any = {
            birthday: this.form.get('birthday').value,
            firstName: this.form.get('firstName').value,
            lastName: this.form.get('lastName').value,
            loginId: this.form.get('loginId').value,
            sex: this.form.get('sex').value,
            snsType: this.sns.type,
            id: this.sns.id,
            accessToken: this.sns.accessToken,
            refreshToken: this.sns.refreshToken,
            expiresIn: this.sns.expiresIn,
        };

        console.log('로그인 아이디 = ' + reqVo.loginId);
        console.log('파람', reqVo);
        this.authService.signUpSim(reqVo, 'S').subscribe(res => {
            this.authService.login(reqVo).subscribe(result => {
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
                this.alertUtilService.showAlert(null, '회원가입은 완료하였으나 로그인을 하는 도중 오류가 발생하였습니다.');
            });
        }, err => {
            this.alertUtilService.showAlert(null, err);
        });
    }

    // 이메일 중복확인
    emailCertification() {
        this.authService.joinCertKeySend(this.form.get('loginId').value).subscribe(res => {
            console.log(res);
            this.alertUtilService.showAlert(null, res);
            this.conditionValue.showEmailAuthNum = true;
            this.conditionValue.certificationEmailAdd = this.form.get('loginId').value;
            this.createTimer();
        }, err => {
            console.log(err);
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
        };
        this.authService.certKeyCheck(reqVo).subscribe(res => {
            this.alertUtilService.showAlert(null, res);
            this.conditionValue.certificationYn = true;
            this.conditionValue.emailReadOnly = true;
            this.stopTimer();
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


    numberOnly(event, model): boolean {
        console.log(event.target.value);
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
                case 'loginId': this.checkInputValMessage.loginId = !res.value ? res.message : ''; break;
                default: break;
            }
        });
    }


}
