import {Component, NgZone} from '@angular/core';

import {AlertController, Events, NavController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Device} from '@ionic-native/device/ngx';
import {AppVersion} from '@ionic-native/app-version/ngx';
import {MindManager} from './mind-module/mind.manager';
import {SystemModel} from './mind-module/model/system.model';
import {FCM} from '@ionic-native/fcm/ngx';
import {PageInfoService} from './services/page-info.service';
import {AlertUtilService} from './util/common/alert-util.service';
import {Toast} from '@ionic-native/toast/ngx';
import {CodeService} from './services/code.service';
import {NavigationExtras, Router} from '@angular/router';
import {StorageUtil} from './mind-module/util/storage.util';
import {EventBusService} from './services/event-bus.service';
import {AuthService} from './mind-module/service/auth.service';
const TimePeriodToExit = 2000;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  rootPage: any;
  lastTimeBackPress = 0;
  // rootPage: any = InformPage;

  private systemInfo: SystemModel;

  private deviceInfo: any = {  // 디바이스 정보
    deviceid: ''
    , uuid: ''
    , manufacturer: ''
    , model: ''
    , platform: ''
    , version: ''
  };

  public versionInfo: any = {       // 버전 정보
    serverVersion : ''
    , appVersion : ''
    , downUrl : ''
  };

  constructor(
      private platform: Platform,
      private splashScreen: SplashScreen,
      private device: Device,
      private appVersion: AppVersion,
      private statusBar: StatusBar,
      private mindManager: MindManager,
      private fcm: FCM,
      private events: Events,
      private pageInfoService: PageInfoService,
      private navController: NavController,
      private alertUtilService: AlertUtilService,
      private toast: Toast,
      private codeService: CodeService,
      private ngZone: NgZone,
      private router: Router,
      private eventBusService: EventBusService,
      private authService: AuthService,
      private alertCtrl: AlertController
  ) {
    this.initializeApp();
    this.platform.backButton.subscribeWithPriority(0, () => {
      this.backButtonController();
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('================================================');
      console.log('=============== Init App Setting ===============');
      console.log('================================================');

      // --------------------------------
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.pageInfoService.resetPageInfo([]);
      //this.mindManager.setPageInfo(undefined);
      this.platform.resume.subscribe(() => this.ngZone.run(() => {
        this.getLiveSession ();
      }));


      // 디바이스 정보 설정
      if (this.platform.is('cordova')) {
        this.deviceInfo.deviceId = this.device.uuid;
        this.deviceInfo.uuid = this.device.uuid;
        this.deviceInfo.manufacturer = this.device.manufacturer;
        this.deviceInfo.model = this.device.model;
        this.deviceInfo.platform = this.device.platform;
        this.deviceInfo.version = this.device.version;
      } else {
        this.deviceInfo.deviceId = 'web';
        this.deviceInfo.uuid = 'web';
        this.deviceInfo.manufacturer = 'web';
        this.deviceInfo.model = 'web';
        this.deviceInfo.platform = 'web';
        this.deviceInfo.version = 'web';
      }

      this.mindManager.setDeviceInfo(this.deviceInfo);
      console.log(this.deviceInfo, '디바이스 정보')

      this.getCodeList()
      this.systemSetting();
      this.getVersionInfo();
      this.generateFcmToken();
    });



    // 로그인 이벤트 호출
    this.events.subscribe('user:login', (data) => {

    });
  }

  getLiveSession() {
    let from = this.router.url;
    if (from !== '/' && !from.startsWith('/term') && !from.startsWith('/login') && !from.startsWith('/sign-up') && !from.startsWith('/find-pw')) {
      if (!from){
        from = '/main/main/home';
      }
      console.log(from)
      const autoLogin = this.mindManager.getSystemInfo();
      const lockState = this.mindManager.getLockState();
      // 오토로그인 체크 && 잠금화면 ON(true) 인 경우
      // 모바일 인증 번호 확인을 위해 lockState 추가
      if (autoLogin && lockState && !from.startsWith('/lock')) {
        console.log(this.mindManager.getLockPw())
        if (this.mindManager.getLockPw()) {
          if (this.mindManager.getModalONOff() === 'ON') {
            this.eventBusService.modal$.next('OFF');
          }
          // code : 0 = 회원가입 완료 후 잠금화면, 1 = 로그인 후 잠금화면
          // pwYN : true = 비밀번호 미설정, false = 비밀번호 설정 완료
          const navigationExtras: NavigationExtras = {
            queryParams: {
              code: 1,
              pwYn: true,
              from: ''
            }
          };
          let startUrl = this.pageInfoService.getPageInfo('url');
          console.log('시작 URL = ' + startUrl);
          if (!startUrl) {
            startUrl = '/main/main/home';
          }
          this.pageInfoService.getToOtherPage(startUrl, '/lock', '잠금화면').then(() => {
            this.navController.navigateRoot(['/lock'], navigationExtras);
          });
/*          this.pageInfoService.getToOtherPage(startUrl, '/lock', '잠금화면').then(() => {
            this.navController.navigateRoot(['/lock'], navigationExtras);
          });*/
        } else {
          // code : 0 = 회원가입 완료 후 잠금화면, 1 = 로그인 후 잠금화면
          // pwYN : true = 비밀번호 미설정, false = 비밀번호 설정 완료
          const navigationExtras: NavigationExtras = {
            queryParams: {
              code: 1,
              pwYn: false
            }
          };
          let startUrl = this.pageInfoService.getPageInfo('url');
          console.log('시작 URL = ' + startUrl);
          if (!startUrl) {
            startUrl = '/main/main/home';
          }
          this.pageInfoService.getToOtherPage(startUrl, '/lock', '잠금화면').then(() => {
            this.navController.navigateRoot(['/lock'], navigationExtras);
          });
        }
      }



      if (this.mindManager.getLockPw() && this.mindManager.getSystemInfo().autoLogin === true){

      } else if (this.mindManager.getSystemInfo().autoLogin === false) {
        // 로그아웃
        console.log(from, '회원가입2');
        const versionNumber = localStorage.getItem('versionNumber');
        const versionCode = localStorage.getItem('versionCode');
        const osType = localStorage.getItem('osType');
        const systemSetting = this.mindManager.getSystemInfo();
        const versionInfo = this.mindManager.getLastVersionInfo();
        systemSetting.autoLogin = false;
        const popupInfo = this.mindManager.getAutoLoginPopupInfo();
        this.mindManager.removeMemberToken();
        StorageUtil.clear();
        this.mindManager.setAutoLoginPopupInfo(popupInfo);
        this.mindManager.setLastVersionInfo(versionInfo);
        this.mindManager.setSystemInfo(systemSetting);
        this.toast.show('자동로그인을 설정하여야 잠금 화면을 이용할 수 있습니다.', '5000', 'bottom').subscribe(
            toast => {
              console.log(toast, 'toast');
            }
        );
        setTimeout(() => {
          this.navController.navigateRoot(['/login']);
        }, 500);
      }
    }
  }


  generateFcmToken() {

    this.fcm.getToken()
        .then(token => {
          this.deviceInfo.fcmToken = token;
          console.log('초기 세팅(fcm) : ' + this.deviceInfo.fcmToken);
        }).catch(e => {
      console.log('fcm plugin isn\'t work web browser : ', e);
    });
  }

  // 코드 리스트 조회
  getCodeList() {
    this.codeService.getTotalCodeList().subscribe(res => {
      this.mindManager.setCodeList(res.data);
    });
  }
  systemSetting(){
    this.systemInfo = this.mindManager.getSystemInfo();
    if (this.systemInfo === null || this.systemInfo === undefined){
      this.systemInfo = new SystemModel();
      this.systemInfo.autoLogin = false;
      this.systemInfo.useInform = false;
      this.mindManager.setSystemInfo(this.systemInfo);
    }
    console.log('=== Check system info : ', this.systemInfo);
  }

  /*  // 버전 정보 조회
    getVersionInfo() {
      if (this.platform.is('cordova')) {
        this.appVersion.getVersionNumber().then(response => {
          localStorage.setItem('versionNumber', response);
        });
        this.appVersion.getVersionCode().then(response => {
          localStorage.setItem('versionCode', response.toString());
        });
      } else {
        localStorage.setItem('versionNumber', '1.0.1');
        localStorage.setItem('versionCode', '10001');
      }
    }*/

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
        }
        reqVo.osType = this.deviceInfo.platform === 'Android' ? 'A' : 'I';
        this.authService.getVersionInfo(reqVo).subscribe(res => {
          this.mindManager.setLastVersionInfo(res);
          // 업그레이드 여부 확인
          if (this.deviceInfo.platform === 'Android' && res.osType === 'A') {
            if (res.forceYn === 'Y') {
              this.updateVersionAlert('COMPULSORY', res.url);
            }else{
              this.updateVersionAlert('NON-COMPULSORY', res.url);
            }
          }
        }, err => {

        });
      });
      this.appVersion.getVersionCode().then(response => {
        localStorage.setItem('versionCode', response.toString());
      });
    } else {
      localStorage.setItem('versionNumber', '1.0.0');
      localStorage.setItem('versionCode', '100000');
      const versionInfo = {
        version : '1.1.1',
        downloadUrl : 'https://www.inphrcare.com'
      };
      this.mindManager.setLastVersionInfo(versionInfo);
    }
  }

  backButtonController() {
    const lastUrl = this.pageInfoService.getToBack();
    if (lastUrl) {
      if (lastUrl === 'TOAST') {
        this.reactExit('뒤로가기 버튼을 한번 더 누르시면 앱이 종료됩니다.' , 'TOAST');
      } else if (lastUrl === 'LOGOUT') {
        this.reactExit('뒤로가기 버튼을 한번 더 누르시면 로그아웃 후 앱이 종료됩니다.', 'LOGOUT');
      } else {
        const modalOnOffInfo = this.mindManager.getModalONOff();
        if (modalOnOffInfo === 'ON') {
          this.eventBusService.modal$.next('OFF');
          this.mindManager.setModalONOff('OFF');
        } else {
          const from = this.router.url;
          if (from.startsWith('/insert-psychological-scale')) {
            const surveyCategoryCode = JSON.parse(this.mindManager.getSurveyData()).surveyCategoryCode;
            console.log(this.mindManager.getSurveyData())
            const navigationExtras: NavigationExtras = {
              queryParams: {
                surveyCategoryCode
              }
            };
            this.navController.navigateRoot(['/scale-sub-list'], navigationExtras);
          } else {
            this.navController.navigateRoot([lastUrl]);
          }
        }
      }
    } else {
      this.alertUtilService.showAlert(null, '이전 위치를 조회하는 도중 오류가 발생하였습니다.APP를 종료 후 다시 실행 시켜주세요.');
    }
  }

  reactExit(text, type) {
    // Double check to exit app
    if (new Date().getTime() - this.lastTimeBackPress < TimePeriodToExit) {
      if (type === 'LOGOUT') {
        this.logout();
        navigator['app'].exitApp();
      } else {
        navigator['app'].exitApp();
      }
    } else {
      this.toast.show(text, '5000', 'bottom').subscribe(
          toast => {
            console.log(toast, 'toast');
          }
      );
      this.lastTimeBackPress = new Date().getTime();
    }
  }

  logout() {
    const versionNumber = localStorage.getItem('versionNumber');
    const versionCode = localStorage.getItem('versionCode');
    const osType = localStorage.getItem('osType');
    const systemSetting = this.mindManager.getSystemInfo();
    const versionInfo = this.mindManager.getLastVersionInfo();
    systemSetting.autoLogin = false;
    this.mindManager.removeMemberToken();
    StorageUtil.clear();
    localStorage.setItem('versionNumber', versionNumber);
    localStorage.setItem('versionCode', versionCode);
    localStorage.setItem('osType', osType);
    this.mindManager.setLastVersionInfo(versionInfo);
    this.mindManager.setSystemInfo(systemSetting);
    this.mindManager.setLockState(false);
    this.pageInfoService.resetPageInfo([]).then(() => {
      this.navController.navigateRoot(['/login']);
    });
  }

  // 버전확인
  async updateVersionAlert(type, downUrl) {
    if (type === 'COMPULSORY'){
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
            }
          }
        ],
        backdropDismiss: false
      });
      await alert.present();
    }
  }

}
