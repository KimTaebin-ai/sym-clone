import { Injectable } from '@angular/core';
import {RestApiService} from '../mind-module/service/rest-api.service';
import {UrlService} from '../mind-module/service/url.service';
import {HttpClient} from '@angular/common/http';
import {MindManager} from '../mind-module/mind.manager';
import {Observable, of, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {switchMap} from 'rxjs/operators';
import {ResponseCode} from '../mind-module/data/response.data';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  constructor(
      private restApiService: RestApiService,
      private urlService: UrlService,
      private http: HttpClient,
      private mindManager: MindManager
  ) { }

  // 전체 코드리스트
  getTotalCodeList(): Observable<any> {
    return this.restApiService.getData(environment.simApi + this.urlService.codeList).pipe(
        switchMap(res => {
          if (res) {
            if (res.code === ResponseCode.OK) {
              return of(res.data);
            } else if (res.code === ResponseCode.NO_MATCHING) {
              return throwError('데이터가 없습니다.');
            }
          } else {
            return throwError('코드 리스트를 조회하는 도중 오류가 발생하였습니다.');
          }
        })
    );
  }
  // 그룹 코드리스트
  getGroupCodeList(type): Observable<any> {
      return this.restApiService.getData(environment.simApi + this.urlService.codeList + '/feeling').pipe(
        switchMap(res => {
          if (res) {
            if (res.code === ResponseCode.OK) {
              return of(res.data);
            } else if (res.code === ResponseCode.NO_MATCHING) {
              return throwError('데이터가 없습니다.');
            }
          } else {
            return throwError('그룹 코드 리스트를 조회하는 도중 오류가 발생하였습니다.');
          }
        })
    );
  }

  // 코드리스트
  getCodeList(): Observable<any> {
    return this.restApiService.getData(environment.simApi + this.urlService.groupCodeList).pipe(
        switchMap(res => {
          if (res) {
            if (res.code === ResponseCode.OK) {
              return of(res.data);
            } else if (res.code === ResponseCode.NO_MATCHING) {
              return throwError('데이터가 없습니다.');
            }
          } else {
            return throwError('그룹 코드 리스트를 조회하는 도중 오류가 발생하였습니다.');
          }
        })
    );
  }
  
  // 추가 정보 입력 코드리스트 조회
  getMoreInfoCodeInfo(res) {


  }
}
