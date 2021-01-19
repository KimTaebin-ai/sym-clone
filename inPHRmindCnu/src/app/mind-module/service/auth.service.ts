import { Injectable } from '@angular/core';
import {Platform} from '@ionic/angular';
import {Device} from '@ionic-native/device/ngx';
import {Observable, of, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {switchMap} from 'rxjs/operators';
import {RestApiService} from './rest-api.service';
import {UrlService} from './url.service';
import {HttpClient} from '@angular/common/http';
import {ResponseCode} from '../data/response.data';
import {MindManager} from '../mind.manager';
import {PatientInfoModel} from '../model/patientInfo.model';

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
      private mindManager: MindManager
  ) { }

  /*-------------계정관리-------------------------*/

  // 수동 로그인
  login(reqVo): Observable<any> {
    let requestVo: any = {};
    if (reqVo.snsType === 'D') {
        requestVo = {
            loginId: reqVo.loginId,
            password: reqVo.password,
            snsType: 'D',
            fcmTocken: ''
        };
    } else {
        requestVo = {
            id: reqVo.id,
            snsType: reqVo.snsType
        };
    }
    return this.restApiService.postData(environment.simApi + this.urlService.loginUrl, requestVo).pipe(
        switchMap(res => {
          if (res) {
              if (res.code === ResponseCode.OK) {
                  if (res.data.resultCd === ResponseCode.INPHR_OK) {
                      return of(res.data);
                  } else if (res.data.resultCd === ResponseCode.INPHR_NOT_FOUND_SYM) {
                    const data: any = {
                        usrVo: res.data.usrVo,
                        token: res.data.token
                    };
                    const err: any = {
                        code: ResponseCode.INPHR_NOT_FOUND_SYM,
                        message: 'SYM 미가입자입니다.',
                        data: res.data
                    };
                    return throwError(err);
                  }
              } else if (res.code === ResponseCode.NO_MATCHING){
                  const err: any = {
                      code: ResponseCode.NO_MATCHING,
                      message: '일치하는 가입정보가 없습니다.'
                  };
                  return throwError(err);
              } else {
                  const err: any = {
                      code: ResponseCode.FAIL,
                      message: '로그인을 하는 도중 오류가 발생하였습니다.'
                  };
                  return throwError(err);
              }
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

  // 카카오로부터 회원 정보 조회
  getUserInfoFromKakao(reqToken): Observable<any> {
      return this.restApiService.getData(environment.simApi + this.urlService.getUserInfoFromKakao + '/' + reqToken).pipe(
          switchMap(res => {
              if (res) {
                  return of(res);
              } else {
                  return throwError('SNS 로그인을 실행하는 도중 오류가 발생하였습니다.');
              }
          })
      );
  }

  // 통합 로그인 파라미터 정보 세팅
    async setParamInfo(data) {
        const memberVo = {
            firstName: '',
            lastName: '',
            birthday: '',
            sex: '',
            token: '',
            email: ''
        };
        if (data.usrVo.hasOwnProperty('firstName')){ memberVo.firstName = data.usrVo.firstName; }
        if (data.usrVo.hasOwnProperty('lastName')){ memberVo.lastName = data.usrVo.lastName; }
        if (data.usrVo.hasOwnProperty('birthday')){ memberVo.birthday = data.usrVo.birthday; }
        if (data.usrVo.hasOwnProperty('sex')){ memberVo.sex = data.usrVo.sex; }
        if (data.usrVo.hasOwnProperty('email')){ memberVo.email = data.usrVo.email; }
        if (data.hasOwnProperty('token')){ memberVo.token = data.token; }
        return await memberVo;
    }

  setMemberInfo(data, autoLogin) {
      const loginInfo: any = {
          mobile: data.patient.phone,
          email: data.usrVo.email,
          firstName: data.patient.firstName,
          lastName: data.patient.lastName,
          loginId: data.patient.loginId,
          inphrMemberSeqNo: data.usrVo.memberSeqNo,
          sex: data.patient.sex,
          birthday: data.patient.birthday
      };
      const systemInfo: any = this.mindManager.getSystemInfo();
      systemInfo.autoLogin = autoLogin;
      this.mindManager.setMemberToken(data.token);
      this.mindManager.setMemberModel(loginInfo);
      this.mindManager.setSystemInfo(systemInfo);
  }

  // 약관 조회
  getTermList(): Observable<any> {
    return this.restApiService.getData(environment.simApi + this.urlService.getTermListUrl).pipe(
        switchMap(res => {
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


    // 최근 약관 정보 조회
    getTermInfoList(): Observable<any> {
        return this.restApiService.getData(environment.simApi + this.urlService.getTermInfoList).pipe(
            switchMap(res => {
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



    /*비밀번호 찾기--------------------------------------------------------------------------------------------*/
  // 임시 비밀번호 발급
  sendTempPw(reqVo: any): Observable<any> {
      console.log('eeeeee')
    return this.restApiService.postData(environment.simApi + this.urlService.sendTempPw, reqVo).pipe(
        switchMap(res => {
          console.log('resServ', res);
          if (res){
                if (res.code === ResponseCode.OK) {
                    const result: any = {
                        code: ResponseCode.OK,
                        message: '<p class="alert-message-font"><b>[' + reqVo.loginId + ']</b>으로 임시 비밀번호를 전송했습니다.</p><p class="alert-message-smallfont">임시 비밀번호 확인 후 비밀번호를 변경해주시기 바랍니다.</p>'
                    };
                    return of(result);
                } else if (res.code === ResponseCode.NOT_FOUND) {
                    const err: any = {
                        code: ResponseCode.NOT_FOUND,
                        message: '<p class="alert-message-font">가입된 정보가 없습니다.</p>'
                    };
                    return throwError(err);
                } else if (res.code === 302) {
                    const err: any = {
                        code: 302,
                        message: '<p class="alert-message-font">해당 이메일의 아이디는 <b>[ ' + res.data + ' ]</b> 입니다. 해당 아이디로 비밀번호 찾기를 해주시기 바랍니다.</p>'
                    };
                    return throwError(err);
                } else {
                    const err: any = {
                        code: ResponseCode.FAIL,
                        message: '<p class="alert-message-center-font">임시 비밀번호를 발급받는 도중 오류가 발생하였습니다.</p>'
                    };
                    return throwError(err);
                }
          } else {
                const err: any = {
                    code: ResponseCode.FAIL,
                    message: '<p class="alert-message-center-font">임시 비밀번호를 발급받는 도중 오류가 발생하였습니다.</p>'
                };
                return throwError(err);
          }
        })
    );
  }

  // 비밀번호 찾기_비밀번호 변경
  updatePwAfterChk(reqVo: any): Observable<any> {
    return this.restApiService.postData(environment.simApi + this.urlService.updatePwAfterChk, reqVo).pipe(
        switchMap(res => {
          if (res){
                if (res.code === ResponseCode.OK) {
                    const result: any = {
                        code: ResponseCode.OK,
                        message: '<p class="alert-message-font">비밀번호가 변경되었습니다.</p>'
                    };
                    return of(result);
                } else if (res.code === ResponseCode.NO_MATCHING) {
                    const err: any = {
                        code: ResponseCode.NO_MATCHING,
                        message: '<p class="alert-message-font">임시 비밀번호를 잘못 입력하셨습니다.</p>'
                    };
                    return throwError(err);
                } else if (res.code === ResponseCode.BAD_REQUEST) {
                    const err: any = {
                        code: ResponseCode.BAD_REQUEST,
                        message: '<p class="alert-message-font">임시 비밀번호와 새 비밀번호가 동일합니다.</p>'
                    };
                    return throwError(err);
                } else if (res.code === ResponseCode.FAIL) {
                    const err: any = {
                        code: ResponseCode.FAIL,
                        message: '<p class="alert-message-font">임시 비밀번호를 재확인해주시기 바랍니다.</p>'
                    };
                    return throwError(err);
                } else {
                    const err: any = {
                        code: ResponseCode.FAIL,
                        message: '<p class="alert-message-center-font">비밀번호를 변경하는 도중 오류가 발생하였습니다.</p>'
                    };
                    return throwError(err);
                }
            } else {
                const err: any = {
                    code: ResponseCode.FAIL,
                    message: '<p class="alert-message-center-font">비밀번호를 변경하는 도중 오류가 발생하였습니다.</p>'
                };
                return throwError(err);
            }
        })
    );
  }

  // 설정_비밀번호 변경
  updatePw(reqVo: any): Observable<any> {
      return this.restApiService.postData(environment.simApi + this.urlService.updatePw, reqVo).pipe(
        switchMap(res => {
            console.log('eee', res);
            if (res) {
                if (res.code === ResponseCode.OK) {
                    const result: any = {
                        code: ResponseCode.OK,
                        message: '<p class="alert-message-font">비밀번호가 변경되었습니다.</p>'
                    };
                    return of(result);
                } else if (res.code === ResponseCode.NO_MATCHING) {
                    const err: any = {
                        code: ResponseCode.NO_MATCHING,
                        message: '<p class="alert-message-font">현재 비밀번호를 잘못 입력하셨습니다.</p>'
                    };
                    return throwError(err);
                } else if (res.code === ResponseCode.BAD_REQUEST) {
                    const err: any = {
                        code: ResponseCode.BAD_REQUEST,
                        message: '<p class="alert-message-font">현재 비밀번호와 새 비밀번호가 동일합니다.</p>'
                    };
                    return throwError(err);
                } else if (res.code === ResponseCode.FAIL) {
                    const err: any = {
                        code: ResponseCode.FAIL,
                        message: '<p class="alert-message-font">현재 비밀번호를 재확인해주시기 바랍니다.</p>'
                    };
                    return throwError(err);
                } else {
                    const err: any = {
                        code: ResponseCode.FAIL,
                        message: '<p class="alert-message-font">임시 비밀번호를 발급받는 도중 오류가 발생하였습니다.</p>'
                    };
                    return throwError(err);
                }
            } else {
                const err: any = {
                    code: ResponseCode.FAIL,
                    message: '<p class="alert-message-center-font">임시 비밀번호를 발급받는 도중 오류가 발생하였습니다.</p>'
                };
                return throwError(err);
            }
        })
    );
  }





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

  /*가입-----------------------------------------------*/
  // 가입 인증번호 발송 (이메일)
  joinCertKeySend(loginId): Observable<any> {
    const reqVo = {loginId};
    return this.restApiService.postData(environment.simApi + this.urlService.joinCertKeySend, reqVo).pipe(
        switchMap(res => {
            if (res) {
                if (res.code === ResponseCode.OK) {
                  return of('인증 번호를 발송하였습니다.');
                } else if (res.code === ResponseCode.DUPLICATED) {
                  return throwError('이미 사용중인 아이디입니다.');
                } else if (res.code === ResponseCode.EMAIL_DUPLICATED) {
                  return throwError('이미 사용중인 이메일입니다.');
                } else {
                  return throwError('인증번호를 발송하는 도중 오류가 발생하였습니다.');
                }
          } else {
            return throwError('인증번호를 발송하는 도중 오류가 발생하였습니다.');
          }
        })
    );
  }

    // 가입 인증번호 발송 (모바일)
    mobileCertKeySend(mobile): Observable<any> {
        const reqVo = {mobile};
        return this.restApiService.postData(environment.simApi + this.urlService.mobileCertKeySend, reqVo).pipe(
            switchMap(res => {
                if (res) {
                    if (res.code === ResponseCode.OK) {
                        return of('인증 번호를 발송하였습니다.');
                    } else if (res.code === ResponseCode.DUPLICATED) {
                        return throwError('이미 사용중인 아이디입니다.');
                    } else if (res.code === ResponseCode.EMAIL_DUPLICATED) {
                        return throwError('이미 사용중인 이메일입니다.');
                    } else {
                        return throwError('인증번호를 발송하는 도중 오류가 발생하였습니다.');
                    }
                } else {
                    return throwError('인증번호를 발송하는 도중 오류가 발생하였습니다.');
                }
            })
        );
    }

  // 인증 번호 확인
  certKeyCheck(reqVo) {
      return this.restApiService.postData(environment.simApi + this.urlService.certKeyCheck, reqVo).pipe(
          switchMap(res => {
              if (res) {
                    if (res.code === ResponseCode.OK) {
                        return of('인증되었습니다.');
                    } else if (res.code === ResponseCode.NO_MATCHING) {
                        return throwError('인증번호를 확인해주세요.');
                    }
              } else {
                  return throwError('인증 번호를 확인하는 도중 오류가 발생하였습니다.');
              }
          })
      );
  }

  // 토큰 정보 확인
  checkToken(token): Observable<any> {
    return this.restApiService.postData(environment.simApi + this.urlService.checkTokenInfo, {token}).pipe(
        switchMap(res => {
            if (res) {
                if (res.code === ResponseCode.OK) {
                    return of(res);
                } else {
                    return throwError('토큰 정보 확인 중 오류가 발생하였습니다.');
                }
            } else {
                return throwError('토큰 정보 확인 중 오류가 발생하였습니다.');
            }
        })
    );
  }


    /*---------------------------------------------*/

    // 회원가입
    signUpSim(reqVo, type) {
        // type
        // S = SNS, D = DIRECT
        return this.restApiService.postData(environment.simApi + this.urlService.join, reqVo).pipe(
            switchMap(res => {
                if (res) {
                    if (res.code === ResponseCode.OK) {
                        if (res.data) {
                            if ('resultCd' in res.data) {
                                if (res.data.resultCd === ResponseCode.INPHR_OK) {
                                    return of('회원가입을 완료하였습니다.');
                                } else if (res.data.resultCd === ResponseCode.INPHR_SIGN_UP_EMAIL_DUPLICATED) {
                                    if (type === 'S') {
                                        return throwError('이미 등록된 e-mail 입니다.<br>PW 찾기에서 계정을 확인해 주세요.');
                                    } else {
                                        return throwError('이미 등록된 이메일 계정이 있습니다.<br>계정 정보를 확인해 주세요.');
                                    }
                                } else {
                                    return throwError('회원가입을 하는 도중 오류가 발생하였습니다.');
                                }
                            } else {
                                return of('회원가입을 완료하였습니다.');
                            }
                        } else {
                            return throwError('회원가입을 하는 도중 오류가 발생하였습니다.');
                        }
                    } else if (res.code === ResponseCode.SIGN_UP_EMAIL_DUPLICATED) {
                        if (type === 'S') {
                            return throwError('이미 등록된 e-mail 입니다.<br>PW 찾기에서 계정을 확인해 주세요.');
                        } else {
                            return throwError('이미 등록된 이메일 계정이 있습니다.<br>계정 정보를 확인해 주세요.');
                        }
                    } else {
                        return throwError('회원가입을 하는 도중 오류가 발생하였습니다.');
                    }
                } else {
                    return throwError('회원가입을 하는 도중 오류가 발생하였습니다.');
                }
            })
        );
    }

    // 심 회원가입
    joinSym(reqVo) {
        return this.restApiService.postData(environment.simApi + this.urlService.joinSym, reqVo).pipe(
            switchMap(res => {
                if (res) {
                    if (res.code === ResponseCode.OK) {
                        return of('Sym 서비스 신청을 완료하였습니다.');
                    } else {
                        return throwError('Sym 서비스 신청을 실패하였습니다.');
                    }
                } else {
                    return throwError('Sym 서비스 신청을 실패하였습니다.');
                }
            })
        );
    }

    /*---------------------------------------------*/

    /*--추가정보-------------------------------------*/

    // 추가 정보 조회
    getMoreInfo() {
        return this.restApiService.getData(environment.simApi + this.urlService.getMoreInfo).pipe(
            switchMap(res => {
                if (res) {
                    if (res.code === ResponseCode.OK) {
                        return of(res.data);
                    } else if (res.code === ResponseCode.NO_MATCHING) {
                        const error = {
                            code: ResponseCode.NO_MATCHING,
                            message: '추가 정보 이력 없음'
                        };
                        return throwError(error);
                    } else {
                        const error = {
                            code: res.code,
                            message: '추가 정보를 조회하는 도중 오류가 발생하였습니다.'
                        };
                        return throwError(error);
                    }
                } else {
                    const error = {
                        code: ResponseCode.FAIL,
                        message: '추가 정보를 조회하는 도중 오류가 발생하였습니다.'
                    };
                    return throwError(error);
                }
            })
        );
    }

    // 추가 정보 페이지 설정
    getMoreInfoPage(codeList, infoData) {
        const pageInfo = JSON.parse(JSON.stringify(infoData));
        const infoDisease: any = this.setMoreInfoCodeYN(JSON.parse(JSON.stringify(codeList.infoDisease)), pageInfo, 'disease');
        const infoDiseases: any = this.setMoreInfoCodeYN(JSON.parse(JSON.stringify(codeList.infoDisease)), pageInfo, 'diseases');
        const infoStatus: any = this.setMoreInfoCodeYN(codeList.infoStatus, pageInfo, 'status');
        const infoEducation: any = this.setMoreInfoCodeYN(codeList.infoEducation, pageInfo, 'education');
        const infoJob: any = this.setMoreInfoCodeYN(codeList.infoJob, pageInfo, 'job');
        const infoReligion: any = this.setMoreInfoCodeYN(codeList.infoReligion, pageInfo, 'religion');
        const infoSymptom: any = this.setMoreInfoCodeYN(codeList.infoSymptom, pageInfo, 'symptom');
        const alcohol: any = this.setMoreInfoCodeYN(JSON.parse(JSON.stringify(codeList.alcohol)), pageInfo, 'alcohol');
        const alcoholNow: any = this.setMoreInfoCodeYN(JSON.parse(JSON.stringify(codeList.alcohol)), pageInfo, 'alcoholNow');
        const returnData: any = {
            infoDisease,
            infoDiseases,
            infoStatus,
            infoEducation,
            infoJob,
            infoReligion,
            infoSymptom,
            alcohol,
            alcoholNow
        };
        console.log('return', returnData);
        return returnData;
    }

    setMoreInfoCodeYN(data,  pageInfo, type) {
        console.log( '추가 정보 리스트' , pageInfo );
        for (let i = 0; i < data.length; i++) {
            if (type === 'status') {
                if (Object.keys(pageInfo).length > 0) {
                    for (const item of pageInfo.infoStatuses) {
                        if (item.statusCode === data[i].codeSeq) {
                            data[i].insertData = item;
                            data[i].selected = true;
                        }
                    }
                    if ('insertData' in data[i] === false) {
                        const insertData: any = {
                            content: '',
                            state: '',
                            statusCode: '',
                            year: ''
                        };
                        data[i].insertData = insertData;
                        data[i].selected = false;
                    }
                } else {
                    const insertData: any = {
                        content: '',
                        state: '',
                        statusCode: '',
                        year: ''
                    };
                    data[i].insertData = insertData;
                    data[i].selected = false;
                }
            } else if (type === 'disease') {
                if (Object.keys(pageInfo).length > 0) {
                    for (const item of pageInfo.infoSymptoms) {
                        if (item.diseaseCode === data[i].codeSeq) {
                            data[i].insertData = item;
                            data[i].selected = true;
                        }
                    }
                    if ('insertData' in data[i] === false) {
                        const insertData: any = {
                            content: '',
                            diseaseCode: '',
                        };
                        data[i].insertData = insertData;
                        data[i].selected = false;
                    }
                } else {
                    const insertData: any = {
                        content: '',
                        diseaseCode: '',
                    };
                    data[i].insertData = insertData;
                    data[i].selected = false;
                }
            } else if (type === 'diseases') {
                if (Object.keys(pageInfo).length > 0) {
                    for (const item of pageInfo.infoDiseases) {
                        if (item.diseaseCode === data[i].codeSeq) {
                            data[i].insertData = item;
                            data[i].selected = true;
                        }
                    }
                    if ('insertData' in data[i] === false) {
                        const insertData: any = {
                            content: '',
                            diseaseCode: '',
                            infoDiseaseSymptoms: [],
                            onset: ''
                        };
                        data[i].insertData = insertData;
                        data[i].selected = false;
                    }
                } else {
                    const insertData: any = {
                        content: '',
                        diseaseCode: '',
                        infoDiseaseSymptoms: [],
                        onset: ''
                    };
                    data[i].insertData = insertData;
                    data[i].selected = false;
                }
            } else if (type === 'alcohol') {
                if (Object.keys(pageInfo).length > 0) {
                    for (const item of pageInfo.infoDrinks) {
                        if (item.drinkCode === data[i].codeSeq) {
                            data[i].insertData = item;
                            data[i].selected = true;
                        }
                    }
                    if ('insertData' in data[i] === false) {
                        const insertData: any = {
                            drinkAmount: '',
                            drinkCode: '',
                            drinkEtc: '',
                            numOfYears: '',
                            perWeek: ''
                        };
                        data[i].insertData = insertData;
                        data[i].selected = false;
                    }
                } else {
                    const insertData: any = {
                        drinkAmount: '',
                        drinkCode: '',
                        drinkEtc: '',
                        numOfYears: '',
                        perWeek: ''
                    };
                    data[i].insertData = insertData;
                    data[i].selected = false;
                }
            } else if (type === 'alcoholNow') {
                if (Object.keys(pageInfo).length > 0) {
                    for (const item of pageInfo.infoDrinkNows) {
                        if (item.drinkCode === data[i].codeSeq) {
                            data[i].insertData = item;
                            data[i].selected = true;
                        }
                    }
                    if ('insertData' in data[i] === false) {
                        const insertData: any = {
                            drinkAmount: '',
                            drinkCode: '',
                            drinkEtc: '',
                            numOfYears: '',
                            perWeek: ''
                        };
                        data[i].insertData = insertData;
                        data[i].selected = false;
                    }
                } else {
                    const insertData: any = {
                        drinkAmount: '',
                        drinkCode: '',
                        drinkEtc: '',
                        numOfYears: '',
                        perWeek: ''
                    };
                    data[i].insertData = insertData;
                    data[i].selected = false;
                }
            } else if (type === 'education') {
                if (Object.keys(pageInfo).length > 0) {
                    for (const item of pageInfo.infoDrinkNows) {
                        if (item.drinkCode === data[i].codeSeq) {
                            data[i].insertData = item;
                            data[i].selected = true;
                        }
                    }
                    if ('insertData' in data[i] === false) {
                        const insertData: any = {
                            drinkAmount: '',
                            drinkCode: '',
                            drinkEtc: '',
                            numOfYears: '',
                            perWeek: ''
                        };
                        data[i].insertData = insertData;
                        data[i].selected = false;
                    }
                } else {
                    const insertData: any = {
                        drinkAmount: '',
                        drinkCode: '',
                        drinkEtc: '',
                        numOfYears: '',
                        perWeek: ''
                    };
                    data[i].insertData = insertData;
                    data[i].selected = false;
                }
            } else {
                data[i].selected = false;
            }
        }
        return data;
    }

    // 추가 정보 입력 페이지 정보 입력
    setMoreInfoInsertData(pageInfo, patientMoreInfo) {
        console.log('insert', patientMoreInfo);
        const pageCopy = JSON.parse(JSON.stringify(pageInfo));
        const infoCopy = JSON.parse(JSON.stringify(patientMoreInfo));
        const infoSymptoms = this.setMoreInfoInsertDataPerVo(pageCopy.infoDisease, 'infoDisease');
        const infoDiseases = this.setMoreInfoInsertDataPerVo(pageCopy.infoDiseases, 'infoDiseases');
        const infoStatuses = this.setMoreInfoInsertDataPerVo(pageCopy.infoStatus, 'infoStatus');
        const infoDrinks = this.setMoreInfoInsertDataPerVo(pageCopy.alcohol, 'alcohol');
        const infoDrinkNows = this.setMoreInfoInsertDataPerVo(pageCopy.alcoholNow, 'alcoholNow');
        if (infoSymptoms) {
            infoCopy.infoSymptoms = infoSymptoms;
        }
        if (infoDiseases) {
            infoCopy.infoDiseases = infoDiseases;
        }
        if (infoStatuses) {
            infoCopy.infoStatuses = infoStatuses;
        }
        if (infoDrinks) {
            infoCopy.infoDrinks = infoDrinks;
        }
        if (infoDrinkNows) {
            infoCopy.infoDrinkNows = infoDrinkNows;
        }
        if (!infoCopy.educationCode) {
            infoCopy.educationEtc = '';
        }
        return infoCopy;
    }

    // 추가 정보 페이지 등록 유효성 검사
    setMoreInfoInsertDataPerVo(data, type) {
        let returnData: any;
        switch (type) {
            case 'infoDisease':
                const infoDisease = [];
                for (const item of data) {
                    if (item.insertData.diseaseCode){
                        infoDisease.push(item.insertData);
                        returnData = infoDisease;
                    }
                }
                returnData = infoDisease;
                return returnData;
                break;
            case 'infoDiseases':
                const infoDiseases = [];
                for (const item of data) {
                    if (item.insertData.infoDiseaseSymptoms.length > 0){
                        infoDiseases.push(item.insertData);
                        returnData = infoDiseases;
                    }
                }
                returnData = infoDiseases;
                return returnData;
                break;
            case 'alcoholNow':
                const alcoholNow = [];
                for (const item of data) {
                    if (item.insertData.drinkAmount){
                        alcoholNow.push(item.insertData);
                        returnData = alcoholNow;
                    }
                }
                returnData = alcoholNow;
                return returnData;
                break;
            case 'alcohol':
                const alcohol = [];
                for (const item of data) {
                    if (item.insertData.drinkAmount){
                        alcohol.push(item.insertData);
                        returnData = alcohol;
                    }
                }
                returnData = alcohol;
                return returnData;
                break;
            case 'infoStatus':
                const infoStatus = [];
                for (const item of data) {
                    if (item.insertData.state){
                        infoStatus.push(item.insertData);
                        returnData = infoStatus;
                    }
                }
                returnData = infoStatus;
                return returnData;
                break;
            default:
        }
    }

    // 추가 정보 입력
    setMoreInfo(reqVo) {
        console.log(reqVo);
        return this.restApiService.postData(environment.simApi + this.urlService.getMoreInfo, reqVo).pipe(
            switchMap(res => {
                console.log(res);
                if (res) {
                    if (res.code === ResponseCode.OK) {
                        return of('추가 정보 입력 완료');
                        /*} else if (res.code === ResponseCode.NO_MATCHING) {*/
                    } else {
                        return throwError('추가 정보를 입력하는 도중 오류가 발생하였습니다.');
                    }
                } else {
                    return throwError('추가 정보를 입력하는 도중 오류가 발생하였습니다.');
                }
            })
        );
    }

    /*질문 유형별 유효성 검사---------------------------------*/

    // 3페이지 신체적 질병, 의학적 문제 유효성 검사
    infoDiseaseValidation(infoDisease) {
        let returnData = true;
        for (const item of infoDisease) {
            if (item.userInput === 'Y') {
                if (item.insertData) {
                    if (!item.insertData.content && item.insertData.diseaseCode && item.selected) {
                        returnData = false;
                        break;
                    }
                }
            }
        }
        return returnData;
    }

    // 학력, 직업, 종교 유효성 검사
    infoEduNJobNReligionValidation(params) {
        let returnData = true;
        for (const item of params.infoEducation) {
            if (item.codeSeq === params.educationCode) {
                if (item.codeId === 'etc') {
                    if (!params.educationEtc) {
                        returnData = false;
                        break;
                    }

                }
            }
        }
        for (const item of params.infoJob) {
            if (item.codeSeq === params.jobCode) {
                if (item.codeId === 'etc') {
                    if (!params.jobEtc) {
                        returnData = false;
                        break;
                    }

                }
            }
        }
        for (const item of params.infoReligion) {
            if (item.codeSeq === params.religionCode) {
                if (item.codeId === 'etc') {
                    if (!params.religionEtc) {
                        returnData = false;
                        break;
                    }

                }
            }
        }
        return returnData;
    }


    // 가입 인증번호 발송 (이메일)
    getVersionInfo(reqVo): Observable<any> {
        return this.restApiService.getData(environment.simApi + this.urlService.version + '/' + reqVo.userType + '/' + reqVo.osType + '/' + reqVo.nowVersion).pipe(
            switchMap(res => {
                if (res) {
                    console.log(res)
                    if (res.code === ResponseCode.OK) {
                        return of(res.data);
                    } else {
                        return throwError('데이터를 불러오는 도중 오류가 발생하였습니다.');
                    }
                } else {
                    return throwError('데이터를 불러오는 도중 오류가 발생하였습니다.');
                }
            })
        );
    }
}
