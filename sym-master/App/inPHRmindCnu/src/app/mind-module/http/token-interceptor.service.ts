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
      private toast: Toast
  ) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.startsWith('http') || !request.url.startsWith(environment.simApi)) {
      return next.handle(request);
    }

    /*const locale = this.mindManager.getSystemInfo() ? this.mindManager.getSystemInfo().language : null;*/
    const locale = 'KO';
    const token = this.mindManager.getMemberToken() || '';

    request = request.clone({
      setHeaders: {
        'Content-type': 'application/json; charset=utf-8',
        Accept: 'application/json; charset=utf-8',
        token,
        locale
      }
    });
    console.log(request, 'request')

    // 두 가지 api response 시나리오에 모두 대응.
    return next.handle(request).pipe(
        tap(async response => {
          if (response instanceof HttpResponse && response.ok) {
            if (response.body.code === 3007) {
              await this.redirect();
            }
          }
        }),
        catchError(response => {
          if (response instanceof HttpErrorResponse) {
            if (response.status === ResponseCode.AuthorizationErrors) {
              this.redirect();
            }
          }
          return throwError(response);
        })
    );
  }

  async redirect() {
    const versionNumber = localStorage.getItem('versionNumber');
    const versionCode = localStorage.getItem('versionCode');
    const systemSetting = this.mindManager.getSystemInfo();
    const versionInfo = this.mindManager.getLastVersionInfo();
    systemSetting.autoLogin = false;
    this.mindManager.removeMemberToken();
    StorageUtil.clear();
    localStorage.setItem('versionNumber', versionNumber);
    localStorage.setItem('versionCode', versionCode);
    this.mindManager.setLastVersionInfo(versionInfo);
    this.mindManager.setSystemInfo(systemSetting);
    if (this.router.url !== '/login') {
      setTimeout(() => {
        this.nav.navigateRoot(['/login']);
      }, 500);
      this.toast.show('로그인 정보가 만료되었습니다. 재로그인을 해주세요.', '5000', 'bottom').subscribe(
          toast => {
            console.log(toast, 'toast');
          }
        );
      /*await this.showAlert('로그인 정보가 만료되었습니다<br>재로그인을 해주세요.');*/
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
