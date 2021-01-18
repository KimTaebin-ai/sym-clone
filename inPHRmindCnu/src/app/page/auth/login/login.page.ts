<<<<<<< Updated upstream
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
import {LoginService} from '../../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  constructor(public loginService: LoginService) {}

}
=======
>>>>>>> Stashed changes
