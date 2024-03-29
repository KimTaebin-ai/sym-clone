import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertController, ModalController, NavController, Platform} from '@ionic/angular';
import {Device} from '@ionic-native/device/ngx';
import {NavigationExtras} from '@angular/router';
import {AlertUtilService} from '../../../util/common/alert-util.service';
import {MindManager} from '../../../mind-module/mind.manager';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {AuthService} from '../../../mind-module/service/auth.service';
import {ResponseCode, ResponseData} from '../../../mind-module/data/response.data';
import {AppleSignInResponse} from '@ionic-native/sign-in-with-apple';
import * as moment from 'moment';
import {PageInfoService} from '../../../services/page-info.service';
import {ValidationService} from '../../../services/validation.service';
import {LoadingService} from '../../../util/loading.service';
import {TermModalPage} from '../../modal/term-modal/term-modal.page';
import {AutoLoginModalPage} from '../../modal/auto-login-modal/auto-login-modal.page';
import {Keyboard} from '@ionic-native/keyboard/ngx';
import {AppVersion} from '@ionic-native/app-version/ngx';
import {StorageUtil} from '../../../mind-module/util/storage.util';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

    form: FormGroup;
    public systemInfo: any = {
        autoLogin: false
    };

    deviceInfo: any = {
        platform: ''
    };

    memberVo: any = {
        loginId: ''
        , password: ''
        , appType: '011'
        , usrPhnVo: {
            deviceId: '',
            uuid: '',
            manufacturer: '',
            model: '',
            platform: '',
            version: '',
            gcmRegId: '',
            appType: 'APP011'
        }
    };


    // sns login 연동 정보
    /*  private snsInfo: any = {
        accessToken : ''
        , tokenType : ''
        , refreshToken : ''
        , expiresIn : 0
        , scope : ''
        , snsType : ''
        , appType : '009'
        , id : ''
        , email : ''
      };*/

    private snsInfo: any = {
        accessToken: ''
        , email: ''
        , expiresAt: ''
        , id: ''
        , name: ''
        , refreshToken: ''
        , tokenType: ''
    };

    // localStorage sns 연동 정보
    private storageSnsInfo: any = {
        kakao: {}
        , naver: {}
        , facebook: {}
    };

    constructor(
        private platform: Platform,
        private device: Device,
        private fb: FormBuilder,
        private navController: NavController,
        private alertUtilService: AlertUtilService,
        private mindManager: MindManager,
        private inAppBrowser: InAppBrowser,
        private authService: AuthService,
        private pageInfoService: PageInfoService,
        private validationService: ValidationService,
        private loadingService: LoadingService,
        private modalController: ModalController,
        private appVersion: AppVersion,
        private alertCtrl: AlertController,
        private keyboard: Keyboard
    ) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            userId: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]),
            password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)])
        });
        // 디바이스 정보 설정
        if (this.platform.is('cordova')) {
            this.deviceInfo.platform = this.device.platform;
        } else {
            this.deviceInfo.platform = 'WEB';
        }
        window.addEventListener('keyboardWillShow', (event) => {
            // Describe your logic which will be run each time when keyboard is about to be shown.
            console.log(event);
        });
    }

    ngOnDestroy(): void {
    }

    ionViewDidEnter() {
        this.getVersionInfo();
    }

    async showAutoLoginPopup() {
        this.mindManager.setModalONOff('ON');
        const modal = await this.modalController.create({
            component: AutoLoginModalPage,
            cssClass: 'autoLoginPopup'
        });
        modal.onDidDismiss()
            .then(() => {
                this.mindManager.setModalONOff('OFF');
            });
        return await modal.present();
    }

    login(loginType) {
        let reqVo;
        if (loginType === 'D') {
            reqVo = {
                loginId: this.form.get('userId').value,
                password: this.form.get('password').value,
                snsType: 'D',
                fcmTocken: ''
            };
        } else {
            reqVo = {
                snsType: loginType,
                id: this.snsInfo.id,
                fcmToken: this.snsInfo.accessToken
            };
        }
        this.loadingService.showLoading(true, '로그인 중입니다.');
        this.authService.login(reqVo).subscribe(res => {
            console.log(res)
            this.authService.setMemberInfo(res, this.systemInfo.autoLogin);
            this.mindManager.setLockState(this.systemInfo.autoLogin);
            this.loadingService.showLoading(false, '');
            if (this.systemInfo.autoLogin) {
                this.mindManager.setLockPw('');
                this.getNewTermList('autoLoginY');
                /*const data: any = {
                    url: '/lock',
                    title: '잠금화면'
                };
                this.pageInfoService.resetPageInfo(data).then(() => {
                    const paramVo = {
                        queryParams: {
                            code: 1,
                            pwYn: false
                        }
                    };
                    const navigationExtras: NavigationExtras = paramVo;
                    this.navController.navigateRoot(['/lock'], navigationExtras);
                });*/
            } else {
                this.getNewTermList('autoLoginN');
/*                const data: any = {
                    url: '/main/main/home',
                    title: '메인페이지/홈'
                };
                this.pageInfoService.resetPageInfo(data).then(() => {

                    this.navController.navigateRoot(['/main/main/home']);
                });*/
            }
        }, err => {
            console.log(err, '로그인');
            this.loadingService.showLoading(false, '');
            if (err.code === ResponseCode.INPHR_NOT_FOUND_SYM) {
                // 통합 가입
                const loginInfo: any = {
                    loginId: this.form.get('userId').value,
                    password: this.form.get('password').value
                };
                this.totalSignUp(err.data, loginInfo);
            } else if (err.code === ResponseCode.NO_MATCHING) {
                if (loginType !== 'D') {
                    console.log('param = ', this.snsInfo.email);
                    this.pageInfoService.getToOtherPage('/login', '/sns-sign-up', 'SNS 회원가입').then(() => {
                        const navigationExtras: NavigationExtras = {
                            queryParams: {
                                email: this.snsInfo.email,
                                id: this.snsInfo.id,
                                accessToken: this.snsInfo.accessToken,
                                refreshToken: this.snsInfo.refreshToken,
                                expiresIn: this.snsInfo.expiresAt,
                                loginType
                            }
                        };
                        this.navController.navigateRoot(['/sns-sign-up'], navigationExtras);
                    });
                } else {
                    this.alertUtilService.showAlert(null, err.message);
                }
            } else {
                this.alertUtilService.showAlert(null, err.message);
            }
        });
    }

    // 추가 약관 동의 확인
    getNewTermList(type) {
        this.authService.getTermInfoList().subscribe(res => {
            let resultVal = true;
            for (const item of res) {
                if (item.agreeDt === null) {
                    resultVal = false;
                }
            }
            if (!resultVal) {
                this.newTermAgree(type);
            } else {
                console.log ('추가 동의 약관 여부 없음');
                this.movePageAfterAgreeTerms(type);
            }
        }, err => {
            this.movePageAfterAgreeTerms(type);
        });
    }

    // 잠금 화면 확인 후 페이지 이동
    movePageAfterAgreeTerms(type) {
        if (type === 'autoLoginY') {
            const data: any = {
                url: '/lock',
                title: '잠금화면'
            };
            this.pageInfoService.resetPageInfo(data).then(() => {
                const paramVo = {
                    queryParams: {
                        code: 1,
                        pwYn: false
                    }
                };
                const lockPassword = this.mindManager.getLockPw();
                paramVo.queryParams.pwYn = lockPassword ? true : false;
                const navigationExtras: NavigationExtras = paramVo;
                this.navController.navigateRoot(['/lock'], navigationExtras);
            });
        } else {
            const data: any = {
                url: '/main/main/home',
                title: '메인페이지/홈'
            };
            this.pageInfoService.resetPageInfo(data).then(() => {
                this.navController.navigateRoot(['/main/main/home']);
            });
        }
    }

    selectAutoLoginType() {
        if (this.systemInfo.autoLogin) {
            this.systemInfo.autoLogin = false;
        } else {
            this.systemInfo.autoLogin = true;
        }
    }

    autoLogin() {
        const token: string = this.mindManager.getMemberToken();
        this.systemInfo = this.mindManager.getSystemInfo();
        if (this.systemInfo) {
            if (this.systemInfo.autoLogin) {
                // 토큰 확인 -> 자동 로그인
                if (token) {
                    // 토큰 유효성 검사
                    this.authService.checkToken(token).subscribe(res => {
                        // 자동로그인
                        setTimeout(() => {
                            const lockPassword = this.mindManager.getLockPw();
                            if (lockPassword) {
                                this.getNewTermList('autoLoginY');
                            } else {
                                this.getNewTermList('autoLoginN');
                            }
                        }, 0);
                        return false;
                    });
                } else {
                    this.systemInfo = {
                        autoLogin: false
                    };
                    if (this.mindManager.getAutoLoginPopupInfo() !== false) {
                        this.showAutoLoginPopup();
                    }
                }
            } else {
                if (this.mindManager.getAutoLoginPopupInfo() !== false) {
                    this.showAutoLoginPopup();
                }
            }
        } else {
            this.systemInfo = {
                autoLogin: false
            };
            if (this.mindManager.getAutoLoginPopupInfo() !== false) {
                this.showAutoLoginPopup();
            }
        }
    }

    // -------SNS 로그인----------------------------------------------------
    snsLogin(type) {
        if (type === 'FACEBOOK') {
            this.facebookLogin();
            /*      this.mindManager.facebookLogin().then(res => {
                    console.log(res);
                  }, err => {
                    console.log(err);
                  });*/
        } else if (type === 'KAKAO') {
            this.kakaoLogin();
        } else if (type === 'NAVER') {
            this.naverLogin();
        } else if (type === 'APPLE') {
            this.appleLogin();
        } else {
            this.alertUtilService.showAlert(null, '준비중입니다.');
        }
    }

    naverLogin() {
        this.mindManager.naverLogin().then(res => {
            if (res.code === ResponseCode.OK) {
                this.snsInfo = res.data;
                console.log(this.snsInfo, 'snsnINFO');
                this.login('N');
            } else {
                this.alertUtilService.showAlert(null, 'SNS 로그인을 실행하는 도중 오류가 발생하였습니다.');
            }
        }, err => {
            this.alertUtilService.showAlert(null, 'SNS 로그인을 실행하는 도중 오류가 발생하였습니다.');
        });
    }

    // 카카오 로그인
    kakaoLogin() {
        console.log('카카오 로그인');


        // 카카오톡 연동 정보
        let reqToken = '';
        const accToken = '';
        const clientId = '97e5b44bd5da4ecbcc2bbe5937b4e4b2'; // 카카오톡 REST API KEY
        const redirectUrl = 'http://localhost:8100';

        String.prototype.startsWith = function(str) {
            return this.indexOf(str) === 0;
        };

        const ref = this.inAppBrowser.create('https://kauth.kakao.com/oauth/authorize?client_id=' + clientId + '&redirect_uri=' + redirectUrl + '&response_type=code', '_blank', 'clearcache=yes, location=no');
        console.log(ref);
        ref.on('loadstart').subscribe(event => {
            console.log(event);
            if ((event.url).startsWith(redirectUrl)) {
                console.log(event.url);
                reqToken = (event.url).split('code=')[1];
                console.log('================================');
                console.log('카카오 로그인 코드: ', reqToken);
                console.log('================================');
            }
            this.authService.getUserInfoFromKakao(reqToken).subscribe(res => {
                console.log(res);
                console.log(1);
                this.snsInfo.accessToken = res.accessToken;
                this.snsInfo.refreshToken = res.refreshToken;
                this.snsInfo.tokenType = 'K';
                this.snsInfo.expiresAt = Number(res.expiresIn);
                this.snsInfo.id = res.snsId;
                this.snsInfo.email = res.email;
                console.log(this.snsInfo, 'snsnINFO');
                ref.close();
                this.login('K');
            });
        });
    }

    // 페이스북
    facebookLogin() {
        this.mindManager.facebookLogin().then((res: ResponseData) => {
            console.log(res);
            if (res.code === ResponseCode.OK) {
                console.log('페이스북 데이터', res.data);
                this.snsInfo = res.data;
                this.login('F');

                //this.getSnsInfoById(this.snsInfo.id);
            }
        }, error => {
            this.alertUtilService.showAlert(null, '페이스북 로그인을 실패하였습니다.');
        });

    }

    // 애플 로그인
    appleLogin() {
        this.mindManager.appleLogin().then(res => {
            if (res.code === ResponseCode.OK) {
                const loginResult: AppleSignInResponse = res.data;
                this.snsInfo.accessToken = loginResult.authorizationCode;
                this.snsInfo.expiresIn = moment.duration(1, 'year').asSeconds();
                this.snsInfo.snsType = 'A';
                this.snsInfo.id = this.mindManager.getHashedAppleUser(res.data.user);
                this.storageSnsInfo.apple = loginResult;

                if (res.data.email) {
                    this.snsInfo.email = res.data.email;
                    this.snsInfo.firstName = res.data.fullName.givenName;
                    this.snsInfo.lastName = res.data.fullName.familyName;
                    this.mindManager.saveAppleUserInfo(this.snsInfo.id, res.data).then(() => {
                        //this.getSnsInfoById(this.snsInfo.id);
                        //this.authLogin(this.snsInfo);
                    }, error => {
                        console.error(error);
                        //.this.showAlert(AppleLoginErrorText);
                    });
                } else {
                    /*
                              this.ibdManager.getCachedAppleUserInfo(this.snsInfo.id).then(cachedUser => {
                                this.snsInfo.email = cachedUser.email;
                                this.snsInfo.firstName = cachedUser.name.givenName;
                                this.snsInfo.lastName = cachedUser.name.familyName;
                                //this.getSnsInfoById(this.snsInfo.id);
                                this.authLogin(this.snsInfo);
                              }, err => {
                                console.error(err);
                                this.showAlert(AppleLoginErrorText);
                              });
                              */

                    if (res.data && res.data.user) {
                        this.snsInfo.email = this.mindManager.getHashedAppleUser(res.data.user) + '@private.appleid.com';

                    } else {
                        this.snsInfo.email = this.mindManager.getHashedAppleUser(moment().format()) + '@private.appleid.com';
                    }
                    if (res.data && res.data.fullName) {
                        this.snsInfo.firstName = res.data.fullName.givenName;
                        this.snsInfo.lastName = res.data.fullName.familyName;
                    } else {
                        this.snsInfo.firstName = 'user';
                        this.snsInfo.lastName = 'apple';
                    }
                }
                //this.authLogin(this.snsInfo);
            }
        }, err => {
            this.alertUtilService.showAlert(null, 'Apple 로그인을 실패하였습니다.');
        });
    }

    totalSignUp(usrVo, loginInfo) {
        this.authService.setParamInfo(usrVo).then(res => {
            this.pageInfoService.getToOtherPage('/login', '/platform-sign-up', '플랫폼 통합 회원가입').then(() => {
                const navigationExtras: NavigationExtras = {queryParams: {usrInfoData: res, loginInfo}};
                /*        console.log(res)
                        const paramVo = {
                          queryParams: {
                            usrInfodata: res
                          }
                        };*/
                // const navigationExtras: NavigationExtras = paramVo;
                this.navController.navigateRoot(['/platform-sign-up'], navigationExtras);
            });
        });
    }


    getTermList() {
        this.authService.getTermInfoList().subscribe(res => {
            console.log(res);

        }, err => {

        });
    }

    // -------------------------------------------------------------------

    // 버전 확인
    // 버전 정보 조회
    getVersionInfo() {
        if (this.platform.is('cordova')) {
            let version = '';
            this.appVersion.getVersionNumber().then(response => {
                localStorage.setItem('versionNumber', response);
                version = response;
                console.log('버전 정보 조회:', response);
                const reqVo: any = {
                    osType: '',
                    userType: 'P',
                    nowVersion: version
                };
                reqVo.osType = this.deviceInfo.platform === 'Android' ? 'A' : 'I';
                this.authService.getVersionInfo(reqVo).subscribe(res => {
                    this.mindManager.setLastVersionInfo(res);
                    console.log(res)
                    alert(this.deviceInfo.platform)
                    // 업그레이드 여부 확인
                    if (this.deviceInfo.platform === 'Android' && res.osType === 'A') {
                        if (res.forceYn === 'Y') {
                            this.updateVersionAlert('COMPULSORY', res.url);
                        } else {
                            this.updateVersionAlert('NON-COMPULSORY', res.url);
                        }
                    }
                }, err => {
                    this.autoLogin();
                });
            });
            this.appVersion.getVersionCode().then(response => {
                localStorage.setItem('versionCode', response.toString());
            });
        } else {
            localStorage.setItem('versionNumber', '1.0.0');
            localStorage.setItem('versionCode', '100000');
            const versionInfo = {
                version: '1.1.1',
                downloadUrl: 'https://www.inphrcare.com'
            };
            this.mindManager.setLastVersionInfo(versionInfo);

            this.autoLogin();
        }
    }

    // 신규 약관 확인
    async newTermAgree(type) {
        const alert = await this.alertCtrl.create({
            header: 'SYM 서비스 이용약관이 변경되었습니다.',
            message: '계속하시려면 새로운 이용 약관을 읽고 동의해 주세요.',
            buttons: [
                {
                    text: '확인',
                    handler: data => {
                        const navigationExtras: NavigationExtras = {queryParams: {type}};
                        this.navController.navigateRoot(['/new-term'], navigationExtras);
                    }
                },
                {
                    text: '취소',
                    role: 'cancel',
                    handler: data => {
                        this.logout();
                    }
                }
            ],
            backdropDismiss: false
        });
        await alert.present();
    }

    // 버전확인
    async updateVersionAlert(type, downUrl) {
        if (type === 'COMPULSORY') {
            const alert = await this.alertCtrl.create({
                header: '최신버전 업데이트',
                message: '현재 앱 버전이<br>최신버전이 아닙니다.<br>업데이트 후 이용 바랍니다.',
                buttons: [
                    {
                        text: '확인',
                        handler: data => {
                            window.open(downUrl, '_system');
                            navigator['app'].exitApp();
                        }
                    }
                ],
                backdropDismiss: false
            });
            await alert.present();
        } else {
            const alert = await this.alertCtrl.create({
                header: '최신버전 업데이트',
                message: '현재 앱 버전이 최신버전이 아닙니다.<br>업데이트 하시겠습니까?',
                buttons: [
                    {
                        text: '확인',
                        handler: data => {
                            window.open(downUrl, '_system');
                            /*this.iab.create(downUrl, "_system");*/
                        }
                    },
                    {
                        text: '취소',
                        role: 'cancel',
                        handler: data => {
                            this.autoLogin();
                        }
                    }
                ],
                backdropDismiss: false
            });
            await alert.present();
        }
    }


    logout() {
        const versionNumber = localStorage.getItem('versionNumber');
        const versionCode = localStorage.getItem('versionCode');
        const osType = localStorage.getItem('osType');
        const systemSetting = this.mindManager.getSystemInfo();
        const versionInfo = this.mindManager.getLastVersionInfo();
        systemSetting.autoLogin = false;
        const popupInfo = this.mindManager.getAutoLoginPopupInfo();
        this.mindManager.removeMemberToken();
        StorageUtil.clear();
        localStorage.setItem('versionNumber', versionNumber);
        localStorage.setItem('versionCode', versionCode);
        localStorage.setItem('osType', osType);
        this.mindManager.setAutoLoginPopupInfo(popupInfo);
        this.mindManager.setLastVersionInfo(versionInfo);
        this.mindManager.setSystemInfo(systemSetting);
        this.mindManager.setLockState(false);
        this.pageInfoService.resetPageInfo([]).then(() => {
            this.navController.navigateRoot(['/login']);
        });
    }


    goToPage(url, title) {
        this.pageInfoService.getToOtherPage('/login', url, title).then(() => {
            console.log(this.pageInfoService.getPageInfo('title'));
            this.navController.navigateRoot([url]);
        });
    }


}
