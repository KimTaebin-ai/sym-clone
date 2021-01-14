import { Injectable } from '@angular/core';
import {RestApiService} from "./mind-module/service/rest-api.service";
import {UrlService} from "./mind-module/service/url.service";
import {environment} from "../environments/environment";
import {switchMap} from "rxjs/operators";
import {ResponseCode} from "./mind-module/data/response.data";
import {of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

    constructor(
      private restApiService: RestApiService,
      private urlService: UrlService,
    ) { }


    // 코드 리스트 조회
    getCodeList(groupId){
      return this.restApiService.getData(environment.simApi + this.urlService.getCodeList + '/' + groupId).pipe(
        switchMap(res => {
            if(res) {
                if (res.code === ResponseCode.OK) {
                    return of(res);
                } else {
                    return throwError(res);
                }
            } else {
                return throwError(res);
            }
        })
      )
    }

    // 정서불안 1주 데이터 조회
    getEmotionWeekList(){
      return this.restApiService.getData(environment.simApi + this.urlService.getEmotionWeekList).pipe(
        switchMap(res => {
            if(res) {
                if (res.code === ResponseCode.OK) {
                    return of(res);
                } else if (res.code === ResponseCode.NO_MATCHING) {
                    return of(res);
                } else {
                    return throwError(res);
                }
            } else {
                return throwError(res);
            }
        })
      )
    }

    // 정서불안 1개월 데이터 조회
    getEmotionMonthList(){
      return this.restApiService.getData(environment.simApi + this.urlService.getEmotionMonthList).pipe(
        switchMap(res => {
            if(res) {
                if (res.code === ResponseCode.OK) {
                    return of(res);
                } else if (res.code === ResponseCode.NO_MATCHING) {
                    return of(res);
                } else {
                    return throwError(res);
                }
            } else {
                return throwError(res);
            }
        })
      )
    }

    // 정서불안 데이터 리스트 조회
    getEmotionPageList(page){
      return this.restApiService.getData(environment.simApi + this.urlService.getEmotionPageList + '/' + page).pipe(
        switchMap(res => {
            if(res) {
                if (res.code === ResponseCode.OK) {
                    return of(res);
                } else {
                    return throwError(res);
                }
            } else {
                return throwError(res);
            }
        })
      )
    }

    // 공황 1주 데이터 조회
    getPanicWeekList(){
      return this.restApiService.getData(environment.simApi + this.urlService.getPanicWeekList).pipe(
        switchMap(res => {
            if(res) {
                if (res.code === ResponseCode.OK) {
                    return of(res);
                } else if (res.code === ResponseCode.NO_MATCHING) {
                    return of(res);
                } else {
                    return throwError(res);
                }
            } else {
                return throwError(res);
            }
        })
      )
    }

    // 공황 1개월 데이터 조회
    getPanicMonthList(){
      return this.restApiService.getData(environment.simApi + this.urlService.getPanicMonthList).pipe(
        switchMap(res => {
            if(res) {
                if (res.code === ResponseCode.OK) {
                    return of(res);
                } else if (res.code === ResponseCode.NO_MATCHING) {
                    return of(res);
                } else {
                    return throwError(res);
                }
            } else {
                return throwError(res);
            }
        })
      )
    }

    // 공황 데이터 리스트 조회
    getPanicPageList(page){
        return this.restApiService.getData(environment.simApi + this.urlService.getPanicPageList + '/' + page).pipe(
            switchMap(res => {
                if(res) {
                    if (res.code === ResponseCode.OK) {
                        return of(res);
                    } else {
                        return throwError(res);
                    }
                } else {
                    return throwError(res);
                }
            })
        )
    }

    // 생활패턴 조회
    getPatternList(startDt){
      return this.restApiService.getData(environment.simApi + this.urlService.getPatternList + '/' + startDt).pipe(
        switchMap(res => {
            if(res) {
                if (res.code === ResponseCode.OK) {
                    return of(res);
                } else {
                    return throwError(res);
                }
            } else {
                return throwError(res);
            }
        })
      )
    }

    // 생활패턴 상세 조회
    getPatternDataList(reqVo){
      return this.restApiService.getData(environment.simApi + this.urlService.getPatternList + '/' + reqVo.startDt + '/' + reqVo.type).pipe(
        switchMap(res => {
            if(res) {
                if (res.code === ResponseCode.OK) {
                    return of(res);
                } else if(res.code === ResponseCode.NO_MATCHING) {
                    return of(res.code);
                } else {
                    return throwError(res);
                }
            } else {
                return throwError(res);
            }
        })
      )
    }

    // 심리척도 설문 카테고리 리스트 조회
    getSurveyCategoryList(surveyCategoryCode){
      return this.restApiService.getData(environment.simApi + this.urlService.getSurveyCategoryList + '/' + surveyCategoryCode).pipe(
        switchMap(res => {
            if(res) {
                if (res.code === ResponseCode.OK) {
                    return of(res);
                } else {
                    return throwError(res);
                }
            } else {
                return throwError(res);
            }
        })
      )
    }

    // 심리척도 설문 데이터 조회
    getSurveyChartData(surveySeq){
      return this.restApiService.getData(environment.simApi + this.urlService.getSurveyChartData + '/' + surveySeq).pipe(
        switchMap(res => {
            if(res) {
                if (res.code === ResponseCode.OK) {
                    return of(res);
                } else {
                    return throwError(res);
                }
            } else {
                return throwError(res);
            }
        })
      )
    }

}
