import { Injectable } from '@angular/core';
import {RestApiService} from './rest-api.service';
import {UrlService} from './url.service';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {switchMap} from 'rxjs/operators';
import {ResponseCode} from '../data/response.data';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  constructor(
      private restApiService: RestApiService,
      private urlService: UrlService,
      private http: HttpClient,
  ) { }

  // 일기 리스트 조회(검색X)
  getDictionaryList(reqVo): Observable<any> {
    return this.restApiService.getData(environment.simApi + this.urlService.dictionaryList + '/' + reqVo.page).pipe(
        switchMap(res => {
          console.log(res)
          if (res) {
            if (res.code === ResponseCode.OK) {
              return of(res.data);
            } else if (res.code === ResponseCode.NO_MATCHING) {
              const error: any = {
                code: ResponseCode.NO_MATCHING,
                message: '데이터가 없습니다.'
              }
              return throwError(error);
            } else {
              const error: any = {
                code: res.code,
                message: '데이터를 불러오는 도중 오류가 발생하였습니다.'
              }
              return throwError(error);
            }
          } else {
            const error: any = {
              code: ResponseCode.FAIL,
              message: '데이터를 불러오는 도중 오류가 발생하였습니다.'
            }
            return throwError(error);
          }
        })
    );
  }

  // 일기 리스트 조회(검색O)
  getDictionaryListWithKey(reqVo): Observable<any> {
    return this.restApiService.getData(environment.simApi + this.urlService.dictionaryList + '/' + reqVo.key + '/' + reqVo.page).pipe(
        switchMap(res => {
          console.log(res)
          if (res) {
            if (res.code === ResponseCode.OK) {
              return of(res.data);
            } else if (res.code === ResponseCode.NO_MATCHING) {
              const error: any = {
                code: ResponseCode.NO_MATCHING,
                message: '데이터가 없습니다.'
              }
              return throwError(error);
            } else {
              const error: any = {
                code: res.code,
                message: '데이터를 불러오는 도중 오류가 발생하였습니다.'
              }
              return throwError(error);
            }
          } else {
            const error: any = {
              code: ResponseCode.FAIL,
              message: '데이터를 불러오는 도중 오류가 발생하였습니다.'
            }
            return throwError(error);
          }
        })
    );
  }

  // 일기 상세 조회
  getDictionaryDetail(seq): Observable<any> {
    return this.restApiService.getData(environment.simApi + this.urlService.dictionary + '/' + seq).pipe(
        switchMap(res => {
          console.log(res)
          if (res) {
            if (res.code === ResponseCode.OK) {
              return of(res.data);
            } else if (res.code === ResponseCode.NO_MATCHING) {
              const error: any = {
                code: ResponseCode.NO_MATCHING,
                message: '데이터가 없습니다.'
              }
              return throwError(error);
            } else {
              const error: any = {
                code: res.code,
                message: '데이터를 불러오는 도중 오류가 발생하였습니다.'
              }
              return throwError(error);
            }
          } else {
            const error: any = {
              code: ResponseCode.FAIL,
              message: '데이터를 불러오는 도중 오류가 발생하였습니다.'
            }
            return throwError(error);
          }
        })
    );
  }


}
