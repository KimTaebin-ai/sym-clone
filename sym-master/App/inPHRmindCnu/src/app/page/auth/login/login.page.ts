import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NavController, Platform} from '@ionic/angular';
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
  }

  memberVo: any = {
    loginId: ''
    , password: ''
    , appType: '009'
    , usrPhnVo : {
      deviceId : '',
      uuid : '',
      manufacturer : '',
      model : '',
      platform : '',
      version : '',
      gcmRegId : '',
      appType : 'APP009'
    }
  };


  // sns login 연동 정보
  private snsInfo: any = {
    accessToken : ''
    , tokenType : ''
    , refreshToken : ''
    , expiresIn : 0
    , scope : ''
    , snsType : ''
    , appType : '009'
    , id : ''
    , email : ''
  };

  // localStorage sns 연동 정보
  private storageSnsInfo: any = {
    kakao : {}
    , naver : {}
    , facebook : {}
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
      private pageInfoService: PageInfoService
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      userId: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(5)])
    });
    // 디바이스 정보 설정
    if (this.platform.is('cordova')) {
      this.deviceInfo.platform = this.device.platform;
    } else {
      this.deviceInfo.platform = 'WEB';
    }
  }

  ngOnDestroy(): void {
  }

  login() {
    console.log('userId = ', this.form.get('userId').value)
    console.log('password = ', this.form.get('password').value)
    if (this.platform.is('cordova')) {
      this.memberVo.usrPhnVo.deviceId = this.device.uuid;
      this.memberVo.usrPhnVo.uuid = this.device.uuid;
      this.memberVo.usrPhnVo.manufacturer = this.device.manufacturer;
      this.memberVo.usrPhnVo.model = this.device.model;
      this.memberVo.usrPhnVo.platform = this.device.platform;
      this.memberVo.usrPhnVo.version = this.device.version;
      /*this.memberVo.usrPhnVo.gcmRegId = this.deviceInfo.fcmToken;*/
    } else {
      this.memberVo.usrPhnVo = {};
    }

/*    const paramVo = {
      queryParams: {
        login : 'LOGIN'
      }
    }
    const navigationExtras: NavigationExtras = paramVo;
    this.navController.navigateRoot(['/main'], navigationExtras);*/


  // 일단 자동로그인 체크시 비밀번호 등록으로, 안하면 비밀번호 체크로 가게 해둠
    const paramVo = {
      queryParams: {
        type : ''
      }
    }
    if (this.systemInfo.autoLogin) {
      paramVo.queryParams.type = 'REG';
    } else {
      paramVo.queryParams.type = 'AUTH';
    }
    const navigationExtras: NavigationExtras = paramVo;
    this.navController.navigateRoot(['/lock'], navigationExtras);
  }

  selectAutoLoginType() {
    if (this.systemInfo.autoLogin) {
      this.systemInfo.autoLogin = false;
    } else {
      this.systemInfo.autoLogin = true;
    }
  }

  // -------SNS 로그인----------------------------------------------------
  snsLogin(type) {
      alert('aa');
    if (type === 'FACEBOOK') {
      this.facebookLogin();
/*      this.mindManager.facebookLogin().then(res => {
        console.log(res);
      }, err => {
        console.log(err);
      });*/
    } else if (type === 'NAVER') {
      this.naverLogin();
    } else if (type === 'APPLE') {
      this.appleLogin();
    } else {
      this.alertUtilService.showAlert(null, '준비중입니다.');
    }
  }

  naverLogin(){
    this.mindManager.naverLogin().then(res => {
      console.log(res);
    }, err => {
      console.log(err);
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

  // String.prototype.startsWith = function (str) {
  //   return this.indexOf(str) == 0;
  // };

    const ref = this.inAppBrowser.create('https://kauth.kakao.com/oauth/authorize?client_id=' + clientId +  '&redirect_uri=' + redirectUrl + '&response_type=code', '_blank', 'clearcache=yes, location=no');

    ref.on('loadstart').subscribe(event => {
      if ((event.url).startsWith(redirectUrl)) {
       reqToken =  (event.url).split('code=')[1];
       console.log('================================');
       console.log('카카오 로그인 코드: ', reqToken);
       console.log('================================');
      }
      this.authService.kakaoLogin(reqToken).subscribe(res => {
        console.log(res);

      });
    });
  }

  // 페이스북
  facebookLogin(){
    this.mindManager.facebookLogin().then((res: ResponseData) => {
      console.log(res)
      if (res.code === ResponseCode.OK){
        const loginResult: any = res.data.authResponse;
        this.snsInfo.accessToken = loginResult.accessToken;
        this.snsInfo.expiresIn = loginResult.expiresIn;
        this.snsInfo.snsType = 'F';
        this.snsInfo.id = loginResult.userID;
        this.storageSnsInfo.facebook = loginResult;
        this.snsInfo.email = res.data.email;

        console.log(this.snsInfo);

        //this.authLogin(this.snsInfo);
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

           if (res.data && res.data.user){
             this.snsInfo.email = this.mindManager.getHashedAppleUser(res.data.user) + '@private.appleid.com';

           }else {
             this.snsInfo.email = this.mindManager.getHashedAppleUser(moment().format()) + '@private.appleid.com';
           }
           if (res.data && res.data.fullName){
             this.snsInfo.firstName = res.data.fullName.givenName;
             this.snsInfo.lastName = res.data.fullName.familyName;
           }else{
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
  // -------------------------------------------------------------------
  goToPage(url, title) {
    this.pageInfoService.getToOtherPage('/login', url, title).then(() => {
      this.navController.navigateRoot([url]);
    });

  }


}
