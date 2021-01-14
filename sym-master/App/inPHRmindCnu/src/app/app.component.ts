import { Component } from '@angular/core';

import {Events, NavController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Device} from '@ionic-native/device/ngx';
import {AppVersion} from '@ionic-native/app-version/ngx';
import {MindManager} from './mind-module/mind.manager';
import {SystemModel} from './mind-module/model/system.model';
import {FCM} from '@ionic-native/fcm/ngx';
import {PageInfoService} from './services/page-info.service';
import {AlertUtilService} from './util/common/alert-util.service';
const TimePeriodToExit = 2000;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  rootPage: any;

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
      private alertUtilService: AlertUtilService
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

      // 공통 DATA 초기화-----------------
      this.mindManager.setPageInfo({});
      // --------------------------------
      this.statusBar.styleDefault();
      this.splashScreen.hide();

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

      this.systemSetting();
      this.getVersionInfo();
      this.generateFcmToken();
    });

    // 로그인 이벤트 호출
    this.events.subscribe('user:login', (data) => {

    });
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
      this.appVersion.getVersionNumber().then(response => {
        localStorage.setItem('versionNumber', response);

        console.log('버전 정보 조회:', response);
      });
      this.appVersion.getVersionCode().then(response => {
        localStorage.setItem('versionCode', response.toString());
      });
      /*this.commonService.getVersionNumber().subscribe(response => {
        if (response.code === 200){
          if (this.platform.is('ios')) {
            for (let i = 0; i < response.data.length; i++){
              if (response.data[i].osType === 'IOS'){
                this.ibdManager.setLastVersionInfo(response.data[i]);
                console.log('APP TYPE: IOS');
                break;
              }
            }
          } else if (this.platform.is('android')) {
            for(let i = 0; i < response.data.length; i++){
              if(response.data[i].osType === 'ANDROID'){
                this.ibdManager.setLastVersionInfo(response.data[i]);
                console.log('APP TYPE: ANDROID');
                break;
              }
            }
          } else {
            for(let i = 0; i < response.data.length; i++){
              if(response.data[i].osType === 'IOS'){
                this.ibdManager.setLastVersionInfo(response.data[i]);
                console.log('APP TYPE: IOS');
                break;
              }
            }
          }

          if (this.ibdManager.getLastVersionInfo()!=null && this.ibdManager.getLastVersionInfo()!=''){
            let version = this.ibdManager.getLastVersionInfo();
            let serverVersion = version.version.toString().replace(/\./g,'0');
            let deviceVersion = localStorage.getItem('versionNumber').replace(/\./g,'0');

            if(Number(serverVersion) > Number(deviceVersion)){
              if(version.forceYn ==='Y'){
                /!*this.forceAlert();*!/
                this.updateVersionAlert('COMPULSORY',version.downloadUrl);
              }
              else{
                this.updateVersionAlert('NON-COMPULSORY',version.downloadUrl);
              }

            }

          }
        }
      });*/
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
      this.navController.navigateRoot([lastUrl]);
    } else {
      this.alertUtilService.showAlert(null, '이전 위치를 조회하는 도중 오류가 발생하였습니다.APP를 종료 후 다시 실행 시켜주세요.');
    }
  }

  reactExit() {
    console.log('종료버튼')
    // Double check to exit app
    if (new Date().getTime() - this.lastTimeBackPress < TimePeriodToExit) {
      navigator['app'].exitApp();
    } else {
      this.toast.show('뒤로가기 버튼을 한번 더 누르시면 앱이 종료됩니다.', '5000', 'bottom').subscribe(
          toast => {
            console.log(toast, 'toast');
          }
      );
      this.lastTimeBackPress = new Date().getTime();
    }
  }


}
