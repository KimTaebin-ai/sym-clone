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
import {ValidationService} from '../../../services/validation.service';
import {LoadingService} from '../../../util/loading.service';

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

  ngOnDestroy(): void {}

  ionViewDidEnter(){

  }

  login() {

  }

  selectAutoLoginType() {

  }

  // -------SNS 로그인----------------------------------------------------

  // -------------------------------------------------------------------
  goToPage(url, title) {
    this.pageInfoService.getToOtherPage('/login', url, title).then(() => {
      console.log(this.pageInfoService.getPageInfo('title'))
      this.navController.navigateRoot([url]);
    });
  }


}
