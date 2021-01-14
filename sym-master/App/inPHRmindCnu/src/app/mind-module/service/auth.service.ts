import { Injectable } from '@angular/core';
import {Platform} from '@ionic/angular';
import {Device} from '@ionic-native/device/ngx';
import {Observable, of, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {switchMap} from 'rxjs/operators';
import {RestApiService} from './rest-api.service';
import {UrlService} from './url.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  memberVo: any = {
    loginId: ''
    , password: ''
    , appType: '008'
    , usrPhnVo : {
      deviceId : '',
      uuid : '',
      manufacturer : '',
      model : '',
      platform : '',
      version : '',
      gcmRegId : '',
      appType : 'APP008'
    }
  };

  constructor(
      public platform: Platform,
      private device: Device,
      private restApiService: RestApiService,
      private urlService: UrlService,
      private http: HttpClient,
  ) { }

  /*-------------계정관리-------------------------*/

  // 수동 로그인
  login(reqVo): Observable<any> {
    return this.restApiService.postData(environment.simApi + this.urlService.loginUrl, reqVo).pipe(
        switchMap(res => {
          if (res) {
            return of(res);
          } else {
            throwError(res);
          }
        })
    );
  }

  // 약관 조회
  getTermList(): Observable<any> {
    const reqVo = {};
    return this.restApiService.postData(environment.simApi + this.urlService.getTermListUrl, reqVo);
    /*return this.http.post<any>(environment.simApi + this.urlService.getTermListUrl, reqVo).pipe(
      switchMap(res => {
        console.log(res)
        if (res.code === 200) {
            const data = res.data;
          return(data);
        } else {
          throwError('dd');
        }
    }));*/
  }

  // 임시 비밀번호 발급
  sendPw(reqVo: any): number/*Observable<any>*/ {
    return 200;
/*    return this.restApiService.postData('environment.obesApi' + 'this.urlService.sendPw', reqVo).pipe(
        switchMap(res => {
          if (res.code === 200) {
            return of(res);
          } else {
            throwError(res);
          }
        })
    );*/
  }


  // 카카오 로그인
  public kakaoLogin(reqToken) {
    return this.restApiService.postData(environment.simApi + this.urlService.kakaoLogin, reqToken);
  }
  /*---------------------------------------------*/
  /*// 방문일정 삭제
  deleteVisit(seqNo): Observable<GenericResponse> {
    return this.http.delete<GenericResponse>(this.url + this.urlService.visitDetail + '/' + seqNo).pipe(
        switchMap(res => {
          if (res.code === 200) {
            return of(res);
          }else{
            // return throwError(res);
            return throwError(res.message);
          }
        })
    );
  }*/
}
