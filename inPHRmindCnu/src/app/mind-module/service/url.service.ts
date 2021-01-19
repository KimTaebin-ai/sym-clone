import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  /*-------계정관리-------------------------------------*/
  public loginUrl = '/api/patient/login'; // 로그인
  public getTermListUrl = '/api/term'; // 약관리스트 조회
  public getTermInfoList = '/api/settings/term'; // 최근 약관정보리스트 조회
  public kakaoLogin = ''; // 카카오 로그인
  public findPw = ''; // 비밀번호 찾기
  public joinCertKeySend = '/api/patient/joinCertKeySend'; // 가입 인증 번호 발송(이메일)
  public mobileCertKeySend = '/api/patient/mobileCertKeySend'; // 가입 인증 번호 발송(모바일)
  public certKeyCheck = '/api/patient/certKeyCheck'; // 인증 번호 확인
  public join = '/api/patient/join'; // 통합 회원가입
  public joinSym = '/api/patient/joinSym'; // 심 회원가입

  public sendTempPw = '/api/patient/tempPwMailSend'; // 임시비밀번호 발급
  public updatePwAfterChk = '/api/patient/updatePwAfterCheck'; // 비밀번호 찾기_비밀번호 변경
  public getMoreInfo = '/api/patientInfo/info'; // 추가 정보 입력 정보 조회
  public updatePw = '/api/patient/updatePw'; // 설정_비밀번호 변경
  public getUserInfoFromKakao = '/api/patient/kakao'; // 카카오유저 정보 조회
  public checkTokenInfo = '/api/patient/checkPatientToken'; // 토큰 유효성 확인
  /*---------------------------------------------------*/

  /*-------다이어리-------------------------------------*/
  public getDiaryList = '/api/diary/main'; // 다이어리 전체 데이터 조회
  public getCodeList = '/api/code'; // 코드 리스트 조회
  public panicDiary = '/api/diary/panic'; // 일간 공황 리스트 조회 / 입력 / 삭제
  public emotionDiary = '/api/diary/emotion'; // 일간 정서 입력
  public drinkDiary = '/api/diary/drink'; // 일간 음주 조회 / 입력 / 삭제
  public caffeineDiary = '/api/diary/caffeine'; // 일간 카페인 조회 / 입력 / 삭제
  public exerciseDiary = '/api/diary/exercise'; // 일간 운동 조회 / 입력 / 삭제
  public smokeDiary = '/api/diary/smoke'; // 일간 흡연 조회 / 입력 / 삭제
  public mealDiary = '/api/diary/meal'; // 일간 식사 조회 / 입력 / 삭제
  public periodDiary = '/api/diary/menstruation'; // 일간 생리 조회 / 입력 / 삭제
  public getDiaryData = ''; // 다이어리 전체 데이터 조회

  /*---------------------------------------------------*/

  /*-------파일관리-------------------------------------*/
  public file = '/api/file'; // 파일 컨드롤러 URL
  /*---------------------------------------------------*/


  /*-------리포트---------------------------------------*/
  public getEmotionWeekList = '/api/report/emotion/week'; // 정서불안 1주 데이터 조회
  public getEmotionMonthList = '/api/report/emotion/month'; // 정서불안 1개월 데이터 조회
  public getEmotionPageList = '/api/report/emotion/list'; // 정서불안 데이터 리스트 조회
  public getPanicWeekList = '/api/report/panic/week'; // 공황 1주 데이터 조회
  public getPanicMonthList = '/api/report/panic/month'; // 공황 1개월 데이터 조회
  public getPanicPageList = '/api/report/panic/list'; // 공황 데이터 리스트 조회
  public getPatternList = '/api/report/pattern'; // 생활패턴 조회
  public getSurveyCategoryList = '/api/report/survey' // 심리척도 설문 카테고리 리스트 조회
  public getSurveyChartData = '/api/report/survey/chart' // 심리척도 설문 데이터 조회
  /*---------------------------------------------------*/

  /*-------IRB-----------------------------------------*/
  public getIrb = '/api/irb/get'; // irb 동의 페이지 정보 조회
  public offlineAgreement = '/api/irb/offlineAgreement'; // 오프라인 IRB 동의 처리
  public onlineAgreement = '/api/irb/onlineAgreement'; // 온라인 IRB 동의 처리
  public delOfflineAgreement = '/api/irb/deleteAgreement'; // 오프라인 IRB 철회 및 삭제 처리
  public getAgreed = '/api/irb/getAgreed'; // IRB 동의 조회
  public disagreement = '/api/irb/disagreement'; // IRB 동의 조회
  /*---------------------------------------------------*/

  /*-------코드관리-------------------------------------*/
  public codeList = '/api/code'; // 코드 관리
  public groupCodeList = '/api/code/group'; // 그룹코드 관리
  /*---------------------------------------------------*/

  /*-------일기관리-------------------------------------*/
  public calendar = '/api/calendar'; // 일기 관리
  public calendarList = '/api/calendar/list'; // 일기 리스트 관리
  public calendarMonthList = '/api/calendar/pointList'; // 월간 일기 리스트 관리
  /*---------------------------------------------------*/

  /*-------일기관리-------------------------------------*/
  public dictionary = '/api/ency'; // 증상백과 관리
  public dictionaryList = '/api/ency/list'; // 증상백과 리스트 관리
  /*---------------------------------------------------*/

  /*-------설문관리-------------------------------------*/
  public lux = '/api/lux'; // 조도 관리
  public surveyList = '/api/survey/type'; // 심리척도 리스트 관리
  public surveySubList = '/api/survey/list'; // 심리척도 리스트 관리
  public surveySkip = '/api/survey/skip'; // 심리척도 스킵 관리
  public answerGetQuestion = '/api/survey/answerGetQuestion'; // 심리척도 설문 관리
  /*---------------------------------------------------*/

  /*-------메인관리-------------------------------------*/
  public main = '/api/main'; // 조도 관리
  /*---------------------------------------------------*/

  /*-------디바이스 관리-------------------------------------*/
  public device = '/api/lifeLog'; // 디바이스 관리
  public version = '/api/settings/version'; // 버전 관리
  /*---------------------------------------------------*/
}
