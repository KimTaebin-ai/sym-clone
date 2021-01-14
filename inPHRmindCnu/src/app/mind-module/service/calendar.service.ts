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
export class CalendarService {

  constructor(
      private restApiService: RestApiService,
      private urlService: UrlService,
      private http: HttpClient,
  ) { }


// 일기 리스트 조회
  getCalenderList(calenderDate): Observable<any> {
    return this.restApiService.getData(environment.simApi + this.urlService.calendarList + '/' + calenderDate).pipe(
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

// 월간일기 리스트 조회
  getCalenderMonthList(calenderDate): Observable<any> {
    return this.restApiService.getData(environment.simApi + this.urlService.calendarMonthList + '/' + calenderDate).pipe(
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

    // 일기 등록
    insertCalendar(reqVo): Observable<any> {
          console.log(reqVo)
        return this.restApiService.postData(environment.simApi + this.urlService.calendar, reqVo).pipe(
            switchMap( res => {
              if (res) {
                if (res.code === ResponseCode.OK) {
                  return of ('일기 등록을 완료하였습니다.');
                } else {
                  return throwError('일기를 등록하는 도중 오류가 발생하였습니다.');
                }
              } else {
                return throwError('일기를 등록하는 도중 오류가 발생하였습니다.');
              }
            })
        );
      }

    // 일기 수정
    updateCalendar(reqVo): Observable<any> {
        return this.restApiService.putData(environment.simApi + this.urlService.calendar, reqVo).pipe(
            switchMap( res => {
                if (res) {
                    if (res.code === ResponseCode.OK) {
                        return of ('일기 수정을 완료하였습니다.');
                    } else {
                        return throwError('일기를 수정하는 도중 오류가 발생하였습니다.');
                    }
                } else {
                    return throwError('일기를 수정하는 도중 오류가 발생하였습니다.');
                }
            })
        );
    }

  // 일기 수정 데이터 조회
  getCalendarInfo(seq): Observable<any> {
    console.log(seq,'ddddddddddd')
    return this.restApiService.getData(environment.simApi + this.urlService.calendar + '/' + seq).pipe(
        switchMap( res => {
            console.log('수정전 데이터' , res)
          if (res) {
            if (res.code === ResponseCode.OK) {
              return of (res.data);
            } else {
              return throwError(res.code);
            }
          } else {
            return throwError(res.code);
          }
        })
    );
  }
}
