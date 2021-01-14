import { Injectable } from '@angular/core';
import {RestApiService} from './rest-api.service';
import {UrlService} from './url.service';
import {Observable, of, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {switchMap} from 'rxjs/operators';
import {ResponseCode} from '../data/response.data';
import * as moment from 'moment';
import {AlertUtilService} from '../../util/common/alert-util.service';
@Injectable({
  providedIn: 'root'
})
export class PatientSurveyService {

  constructor(
      private restApiService: RestApiService,
      private urlService: UrlService,
      private alertUtilService: AlertUtilService
  ) {}

    // 조도 입력
    setLux(lux): Observable<any> {
    const reqVo: any = {
      lux: lux.toString(),
      measureDt: moment().format('YYYY-MM-DD HH:mm:ss')
    };
    return this.restApiService.postData(environment.simApi + this.urlService.lux, reqVo).pipe(
        switchMap(res => {
          if (res) {
            if (res.code === ResponseCode.OK) {
              return of('조도값을 축정 완료하였습니다.');
            } else {
              return throwError('조도값을 측정하는 도중 오류가 발생하였습니다.');
            }
          } else {
              return throwError('조도값을 측정하는 도중 오류가 발생하였습니다.');
          }
        })
    );
    }



    // 심리척도 리스트 조회
    getSurveyList(): Observable<any> {
      return this.restApiService.getData(environment.simApi + this.urlService.surveyList).pipe(
            switchMap(res => {
                console.log(res);
                if (res) {
                    if (res.code === ResponseCode.OK) {
                        return of(res.data);
                    } else {
                        return throwError(res);
                    }
                } else {
                    return throwError(res);
                }
            })
        );
    }

    // 심리척도 상세 리스트 조회
    getSurveySubList(code): Observable<any> {
        return this.restApiService.getData(environment.simApi + this.urlService.surveySubList + '/' + code).pipe(
            switchMap(res => {
                console.log(res);
                if (res) {
                    if (res.code === ResponseCode.OK) {
                        const data: any = {
                            surveyInfo: res.data.countNowPatientSurvey,
                            subSurveyInfo: res.data.patientSurveys,
                        };
                        return of(data);
                    } else {
                        return throwError(res);
                    }
                } else {
                    return throwError(res);
                }
            })
        );
    }

    // 심리척도 스킵/스킵해제
    chageSkipInfo(reqVo) {
        return this.restApiService.putData(environment.simApi + this.urlService.surveySkip, reqVo).pipe(
            switchMap(res => {
                console.log(res);
                if (res) {
                    if (res.code === ResponseCode.OK) {
                        return of('심리척도 상태 변경이 완료되었습니다.');
                    } else {
                        return throwError('심리척도 상태 변경을 하는 도중 오류가 발생하였습니다.');
                    }
                } else {
                    return throwError('심리척도 상태 변경을 하는 도중 오류가 발생하였습니다.');
                }
            })
        );
    }

    // 심리척도 조회
    getSurveyInfo(params): Observable<any> {
      const err: any = {
          code: null,
          message: '',
          data: null
      };
      console.log(params);
      return this.restApiService.postData(environment.simApi + this.urlService.answerGetQuestion, params).pipe(
          switchMap(res => {
              console.log(res, 'ddd');
              if (res) {
                  if (res.code === ResponseCode.OK) {
                      const resData: any = {
                          title: [],
                          questionType: '',
                          questionsNo: 0,
                          targetQuestionsNo: 0,
                          targetResultOrder: 0,
                          nullable: '',
                          hints: [],
                          nowAnswers: {}
                      };
                      // 하위 질문 조회
                      const resultYn = true;
                      let data = res.data;
                      let noOfContent = null;
                      resData.nullable = data.nullable;
                      for (;;) {
                          console.log('subQuestion' in data);
                          let content = '';
                          if (data.subQuestion){
                              // 질문 타이틀 설정
                              content = data.displayNo ? content + data.displayNo + '. '  + data.questionContentKo : data.questionContentKo;
                              if (noOfContent){
                                  noOfContent = data.displayNo ? noOfContent + '-' + data.displayNo : noOfContent;
                              }else{
                                  noOfContent = data.displayNo ? data.displayNo : noOfContent;
                              }
                              resData.title.push(content);
                              data = data.subQuestion;
                              continue;
                          }
                          // 질문 타이틀 설정
                          if (noOfContent){
                              content = data.displayNo ? noOfContent + '-' + data.displayNo + '. '  + data.questionContentKo : data.questionContentKo;
                          }else{
                              content = data.displayNo ? data.displayNo + '. '  + data.questionContentKo : data.questionContentKo;
                          }
                          resData.targetQuestionsNo = data.targetResult ? data.targetResult.questionsNo : null;
                          resData.targetResultOrder = data.targetResult ? data.targetResult.inputOrder : null;
                          resData.title.push(content);
                          resData.questionType = data.questionType.codeId;
                          resData.questionsNo = data.questionsNo;

                          // 답변 유형별 데이터 형식 설정

                          // 리스트 선택 형식의 단일 선택
                          if (
                              resData.questionType === 'radio' ||
                              resData.questionType === 'drop' ||
                              resData.questionType === 'radioGrid' ||
                              resData.questionType === 'checkGrid' ||
                              resData.questionType === 'stepGrid'
                          ) {
                              // 보기 등록
                              resData.hints = data.hints;
                              // 이전 데이터 조회
                              if (data.nowAnswers) {
                                  const answers: any = {
                                      displayOrder: data.nowAnswers[0].displayOrder,
                                      inputOrder: null
                                  };
                                  resData.nowAnswers.answers = answers;
                              }
                              // 리스트 선택 형식의 복수 선택
                          } else if (resData.questionType === 'check') {
                              resData.hints = data.hints;
                              // 이전 데이터 조회
                              if (data.nowAnswers) {
                                  resData.nowAnswers.answers = [];
                                  for (const item of data.nowAnswers) {
                                      const reqVo: any = {
                                          displayOrder: item.displayOrder,
                                          inputOrder: 0
                                      };
                                      resData.nowAnswers.answers.push(reqVo);
                                  }
                              }
                          } else if (resData.questionType === 'radioGridByList') {
                              resData.hints = data.hints;
                              // 이전 데이터 조회
                              if (data.nowAnswers) {
                                  const answers: any = {
                                      displayOrder: data.nowAnswers[0].displayOrder,
                                      inputOrder: null
                                  };
                                  resData.nowAnswers.answers = answers;
                              }
                              let selectedTitle = '';
                              if (data.targetResult.displayOrder) {
                                  selectedTitle = '입력하신 "' + data.targetResult.hint.exampleContentKo.toString() + '"';
                              } else if (data.targetResult.numberValue) {
                                  selectedTitle = '입력하신 "' + data.targetResult.numberValue.toString() + '"';
                              } else if (data.targetResult.shortText) {
                                  selectedTitle = '입력하신 "' + data.targetResult.shortText.toString() + '"';
                              }
                              resData.selectedTitle = selectedTitle;
                          } else if (resData.questionType === 'listText') {
                              // 이전 데이터 조회
                              resData.nowAnswers.answers = [];
                              for (const item of data.nowAnswers) {
                                  resData.nowAnswers.answers.push(item.shortText);
                              }
                          } else if (resData.questionType === 'number') {
                              // 이전 데이터 조회
                              if (data.nowAnswers) {
                                  const answers: any = {
                                      numberValue: data.nowAnswers[0].numberValue,
                                      inputOrder: null
                                  };
                                  resData.nowAnswers.answers = answers;
                              }
                          }
                          break;
                      }

                      return of(resData);
                  } else if (res.code === ResponseCode.SURVEY_COMPLETE) {
                      err.code = ResponseCode.SURVEY_COMPLETE;
                      err.message = ResponseCode.SURVEY_COMPLETE_MESSAGE;
                      err.data = res.data;
                      return throwError(err);
                  } else if (res.code === ResponseCode.EMPTY_ANSWER) {
                      err.code = ResponseCode.EMPTY_ANSWER;
                      err.message = ResponseCode.EMPTY_ANSWER_MESSAGE;
                      err.data = res.data;
                      return throwError(err);
                  } else {
                      err.code = ResponseCode.FAIL;
                      err.message = '심리척도 상태 변경을 하는 도중 오류가 발생하였습니다.';
                      return throwError(err);
                  }
              } else {
                  err.code = ResponseCode.FAIL;
                  err.message = '심리척도 상태 변경을 하는 도중 오류가 발생하였습니다.';
                  return throwError(err);
              }
          })
      );
    }

    // 심리척도 데이트 데이터 정제
    async setParamsForGSI(direction, data) {
      const reqVo = {
            direction,
            questionsNo: data.surveyInfo.questionsNo,
            roundNo: data.roundInfo.roundNo,
            surveySeq: data.roundInfo.surveySeq,
            targetQuestionsNo: 0,
            targetResultOrder: 0,
            values: []
        };
      reqVo.targetQuestionsNo = data.surveyInfo.targetQuestionsNo;
      reqVo.targetResultOrder = data.surveyInfo.targetResultOrder;

      if (data.questionType === 'listText') {
        for (const item of data.multipleAnswers.answers) {
            const listText: any = {
                shortText: item
            };
            data.surveyAnswer[data.questionType].values.push(listText);
        }
      }

      const checkArray = Array.isArray(data.surveyAnswer[data.questionType].values);
      let arrayData = [];
        // 다중 선택
      if (checkArray) {
        arrayData = data.surveyAnswer[data.questionType].values;

      // 단일 선택
      } else {
            if (data.questionType === 'number') {
                arrayData = data.surveyAnswer[data.questionType].values.numberValue !== null &&
                data.surveyAnswer[data.questionType].values.numberValue !== '' ?
                    [{numberValue: data.surveyAnswer[data.questionType].values.numberValue}] : null;
            } else {
                arrayData =
                    data.surveyAnswer[data.questionType].values.displayOrder === null ||
                    data.surveyAnswer[data.questionType].values.displayOrder === undefined ||
                    !data.surveyAnswer[data.questionType].values.displayOrder ?
                        null : [data.surveyAnswer[data.questionType].values];
            }

            if (direction === 'forward') {
                // 데이터가 없고 필수 입력값인 경우
                if (data.surveyInfo.nullable === 'N' && arrayData === null) {
                    this.alertUtilService.showAlert(null, '설문을 진행해주세요.');
                    return false;
                }
            }
        }

      if (arrayData) {
            for (const i in arrayData) {
                arrayData[Number(i)].inputOrder = Number(i) + 1;
            }
        }
      reqVo.values = arrayData;
      return reqVo;
    }

}

