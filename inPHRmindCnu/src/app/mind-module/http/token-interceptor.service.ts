import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import { AlertController, NavController } from '@ionic/angular';

import { throwError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import {Router} from '@angular/router';
import {MindManager} from '../mind.manager';
import {Toast} from '@ionic-native/toast/ngx';
import {ResponseCode} from '../data/response.data';
import {StorageUtil} from '../util/storage.util';
import {PageInfoService} from '../../services/page-info.service';
@Injectable({
  providedIn: 'root'
})

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  lastAlert: HTMLIonAlertElement;

  constructor(
      private nav: NavController,
      private alertController: AlertController,
      private mindManager: MindManager,
      private router: Router,
      private toast: Toast,
      private pageInfoService: PageInfoService
  ) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.startsWith('http') || !request.url.startsWith(environment.simApi)) {
      return next.handle(request);
    }

    /*const locale = this.mindManager.getSystemInfo() ? this.mindManager.getSystemInfo().language : null;*/
    const lang = 'KO';
    const token = this.mindManager.getMemberToken() || '';
    request = request.clone({
      setHeaders: {
        //'Content-type': 'application/json; charset=utf-8',
        Accept: 'application/json; charset=utf-8',
        //Accept: 'application/json; charset=utf-8',
        token,
        lang
      }
    });
    console.log(request, 'request')

    // 두 가지 api response 시나리오에 모두 대응.
    return next.handle(request).pipe(
        tap(async response => {
          if (response instanceof HttpResponse && response.ok) {
            if (response.body.code === 3007) {
              await this.redirect('TOKEN');
            }
          }
        }),
        catchError(response => {
          if (response instanceof HttpErrorResponse) {
            if (response.status === ResponseCode.AuthorizationErrors) {
              this.redirect('ERROR');
            }
          }
          return throwError(response);
        })
    );
  }

  async redirect(type) {
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
    const from = this.router.url
    if (!from.startsWith('/login') || !from.startsWith('/term') || !from.startsWith('/sign-up') || !from.startsWith('/find-pw')) {
      this.pageInfoService.resetPageInfo([]).then(() => {
        if (type === 'TOKEN') {
          this.toast.show('로그인 정보가 만료되었습니다. 재로그인을 해주세요.', '5000', 'bottom').subscribe(
              toast => {
                console.log(toast, 'toast');
              }
          );
        } else {
          this.toast.show('통신 상태를 확인 후 재로그인해주세요.', '5000', 'bottom').subscribe(
              toast => {
                console.log(toast, 'toast');
              }
          );
        }
        this.nav.navigateRoot(['/login']);
      });
    }
  }

  async showAlert(message: string) {

    if (this.lastAlert) {
      return;
    }

    this.lastAlert = await this.alertController.create({
      message,
      buttons: [
        {
          text: '닫기',
          role: 'cancel',
        }
      ]
    });

    await this.lastAlert.present();
    await this.lastAlert.onDidDismiss();
    this.lastAlert = null;
  }
}
