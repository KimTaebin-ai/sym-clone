import { Injectable } from '@angular/core';
import {Platform} from '@ionic/angular';
import {Device} from '@ionic-native/device/ngx';
import {RestApiService} from './rest-api.service';
import {UrlService} from './url.service';
import {HttpClient} from '@angular/common/http';
import {MindManager} from '../mind.manager';
import {Observable, of, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {switchMap} from 'rxjs/operators';
import {ResponseCode} from '../data/response.data';

@Injectable({
  providedIn: 'root'
})
export class LifelogService {

  constructor(
      public platform: Platform,
      private device: Device,
      private restApiService: RestApiService,
      private urlService: UrlService,
      private http: HttpClient,
      private mindManager: MindManager
  ) { }

  /*-------------계정관리-------------------------*/

  // 수동 로그인
  setDeviceInfo(reqVo): Observable<any> {
    return this.restApiService.postData(environment.simApi + this.urlService.device, reqVo).pipe(
        switchMap(res => {
          if (res) {
            console.log(res)
            return of(res.data);
          } else {
            const err: any = {
              code: ResponseCode.FAIL,
              message: '로그인을 하는 도중<br>오류가 발생하였습니다.'
            };
            return throwError(err);
          }
        })
    );
  }

}
