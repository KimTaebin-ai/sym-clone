import { Injectable } from '@angular/core';
import {RestApiService} from "./rest-api.service";
import {UrlService} from "./url.service";
import {Observable, of, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {switchMap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {ResponseCode} from "../data/response.data";

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  constructor(
      private restApiService: RestApiService,
      private urlService: UrlService,
      private http: HttpClient,
  ) { }

    // 다이어리 전체 데이터 조회
    getDiaryList(date){
      return this.restApiService.getData(environment.simApi + this.urlService.getDiaryList + '/' + date).pipe(
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

/*공황----------------------------------------------------------------------------------------------*/
  // 공황 리스트 조회
  getPanicList(date){
      return this.restApiService.getData(environment.simApi + this.urlService.panicDiary + '/' + date).pipe(
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

  // 공황 다이어리 추가
  addPanicDiary(reqVo): Observable<any>{
      return this.restApiService.postData(environment.simApi + this.urlService.panicDiary, reqVo).pipe(
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

  // 공황 삭제
    deletePanicDiary(panicSeq): Observable<any>{
        return this.restApiService.deleteData(environment.simApi + this.urlService.panicDiary + '/' + panicSeq).pipe(
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

/*정서------------------------------------------------------------------------------------------------*/
    // 정서 입력
    saveEmotionDiary(emotionInsertVo):Observable<any>{
        return this.restApiService.postData(environment.simApi + this.urlService.emotionDiary, emotionInsertVo).pipe(
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

/*생활패턴---------------------------------------------------------------------------------------------*/
    // 음주 리스트 조회
    getDrinkList(date){
        return this.restApiService.getData(environment.simApi + this.urlService.drinkDiary + '/' + date).pipe(
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
    // 음주 입력
    addDrinkDiary(insertVo):Observable<any>{
        return this.restApiService.postData(environment.simApi + this.urlService.drinkDiary, insertVo).pipe(
            switchMap(res => {
                if(res) {
                    if (res.code === ResponseCode.OK) {
                        return of(res);
                    } else {
                        return throwError(res);
                    }
                } else {
                    return throwError(res);``
                }
            })
        )
    }
    // 음주 삭제
    deleteDrinkDiary(deleteVo): Observable<any>{
        return this.restApiService.deleteData(environment.simApi + this.urlService.drinkDiary + '/' + deleteVo.date + '/' + deleteVo.when + '/' + deleteVo.code).pipe(
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
    // 음주 삭제(기타)
    deleteDrinkDiaryEtc(deleteVo): Observable<any>{
        return this.restApiService.deleteData(environment.simApi + this.urlService.drinkDiary + '/' + deleteVo.date + '/' + deleteVo.when + '/' + deleteVo.code + '/' + deleteVo.etc).pipe(
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

    // 카페인 리스트 조회
    getCaffeineList(date){
        return this.restApiService.getData(environment.simApi + this.urlService.caffeineDiary + '/' + date).pipe(
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
    // 카페인 입력
    addCaffeineDiary(insertVo):Observable<any>{
        console.log('insertVo', insertVo);
        return this.restApiService.postData(environment.simApi + this.urlService.caffeineDiary, insertVo).pipe(
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
    // 카페인 삭제
    deleteCaffeineDiary(deleteVo): Observable<any>{
        console.log('deleteVo', deleteVo);
        return this.restApiService.deleteData(environment.simApi + this.urlService.caffeineDiary + '/' + deleteVo.date + '/' + deleteVo.when + '/' + deleteVo.code).pipe(
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
    // 카페인 삭제(기타)
    deleteCaffeineDiaryEtc(deleteVo): Observable<any>{
        console.log('deleteVo', deleteVo);
        return this.restApiService.deleteData(environment.simApi + this.urlService.caffeineDiary + '/' + deleteVo.date + '/' + deleteVo.when + '/' + deleteVo.code + '/' + deleteVo.etc).pipe(
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

    // 운동 리스트 조회
    getExList(date){
        return this.restApiService.getData(environment.simApi + this.urlService.exerciseDiary + '/' + date).pipe(
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
    // 운동 입력
    addExDiary(insertVo):Observable<any>{
        console.log('insertVo', insertVo);
        return this.restApiService.postData(environment.simApi + this.urlService.exerciseDiary, insertVo).pipe(
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
    // 운동 삭제
    deleteExDiary(deleteVo): Observable<any>{
        return this.restApiService.deleteData(environment.simApi + this.urlService.exerciseDiary + '/' + deleteVo.date + '/' + deleteVo.when + '/' + deleteVo.code).pipe(
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
    // 운동 삭제(기타)
    deleteExDiaryEtc(deleteVo): Observable<any>{
        return this.restApiService.deleteData(environment.simApi + this.urlService.exerciseDiary + '/' + deleteVo.date + '/' + deleteVo.when + '/' + deleteVo.code + '/' + deleteVo.etc).pipe(
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

    // 흡연 리스트 조회
    getSmokeList(date){
        return this.restApiService.getData(environment.simApi + this.urlService.smokeDiary + '/' + date).pipe(
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
    // 흡연 입력
    addSmokeDiary(insertVo):Observable<any>{
        return this.restApiService.postData(environment.simApi + this.urlService.smokeDiary, insertVo).pipe(
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
    // 흡연 삭제
    deleteSmokeDiary(date){
        return this.restApiService.deleteData(environment.simApi + this.urlService.smokeDiary + '/' + date).pipe(
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

    // 식사 리스트 조회
    getMealList(date){
        return this.restApiService.getData(environment.simApi + this.urlService.mealDiary + '/' + date).pipe(
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
    // 식사 입력
    addMealDiary(insertVo):Observable<any>{
        return this.restApiService.postData(environment.simApi + this.urlService.mealDiary, insertVo).pipe(
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

    // 생리 리스트 조회
    getPeriodList(date){
        return this.restApiService.getData(environment.simApi + this.urlService.periodDiary + '/' + date).pipe(
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
    // 생리 입력
    addPeriodDiary(insertVo):Observable<any>{
        return this.restApiService.postData(environment.simApi + this.urlService.periodDiary, insertVo).pipe(
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


