import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Platform } from '@ionic/angular';
import { MindManager } from '../mind-module/mind.manager';
import { AuthService } from '../mind-module/service/auth.service';
import { LoadingService } from '../util/loading.service';
import { PageInfoService } from './page-info.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private form: FormGroup;

  private autoLogin: boolean;

  private snsInfo: SnsInfo;

  public platform: Platform;

  public devicePlatform: string;

  public memeber: Memeber;
  
  constructor(
    private loadingService: LoadingService,
    private authService: AuthService,
    private mindManager: MindManager,
    private pageInfoService: PageInfoService
  ) {
  }

  public login(type) {
    let loginReq: any;
    if (type) {
      loginReq = {
        loginId: this.form.get('userId').value,
        password: this.form.get('password').value,
        snsType: type,
        fcmToken: ''
      }
    } else {
      loginReq = {
        snsType: type,
        id: this.snsInfo.id,
        fcmToken: this.snsInfo.accessToken
      }
    }

    this.loadingService.showLoading(true, '로그인 중입니다.');

    this.authService.login(loginReq).subscribe(res => {
      this.authService.setMemberInfo(res, this.autoLogin);
      this.mindManager.setLockState(this.autoLogin);
      this.loadingService.showLoading(false, '');

      if (this.autoLogin) {
        const pageReq: any = {
          url: '/lock',
          title: '잠금화면'
        }
        this.pageInfoService.resetPageInfo(pageReq)
          .then(() => {
            const param = {
              queryParams: {
                code: 1,
                pwYnL: false
              }
            }
          })
      }
    })
  }
}

interface Memeber {
  loginId: string, 
  password: string,
  appType: '009',
  userDevice : {
    deviceId : string,
    uuid : string,
    manufacturer : string,
    model : string,
    platform : string,
    version : string,
    gcmRegId : string,
    appType : 'APP009'
  }
}

interface SnsInfo {
  accessToken: string,
  email: string,
  axpireAt: string,
  id: string,
  name: string,
  refreshToken: string,
  tokenType: string
}