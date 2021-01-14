import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {RestApiService} from './rest-api.service';
import {UrlService} from './url.service';
import {environment} from '../../../environments/environment';
import {ResponseCode} from '../data/response.data';
import {DateService} from '../../util/common/date.service';

@Injectable({
  providedIn: 'root'
})
export class IrbService {

  constructor(
      private restApiService: RestApiService,
      private urlService: UrlService,
      private dateService: DateService
  ) { }

  readonly mockList = [
    {
      title: '충남대XXXXX연구 - NNNNN',
      opened: 'N',
      contents: '연구대상자 동의서(예시) \n' +
          ' \n' +
          '1. 본인은 임상연구에 대해 구두로 설명을 받고 상기 연구 설명문을 읽었으며 담당 연구원과 이 연구에 대하여 충분히 의논하였습니다. \n' +
          '2. 본인은 연구의 위험과 이득에 관하여 들었으며 나의 질문에 만족할 만한 답변을 얻었습니다.\n' +
          '3. 본인은 이 연구에 참여하는 것에 대하여 자발적으로 동의합니다. \n' +
          '4. 본인은 이후의 치료에 영향을 받지 않고 언제든지 연구의 참여를 거부하거나 연구의 참여를 중도에 철회할 수 있고 이러한 결정이 나에게 어떠한 해가 되지 않을 것이라는 것을 알고 있습니다. \n' +
          '5. 본인은 이 설명서 및 동의서에 서명함으로써 의학 연구 목적으로 나의 개인정보가 현행 법률과 규정 이 허용하는 범위 내에서 연구자가 수집하고 처리하는데 동의합니다. \n' +
          '6. 본인은 연구 설명문 및 동의서의 사본을 받을 것을 알고 있습니다.  '
    },
    {
      title: '충남대XXXXX연구 - NNNNN' ,
      opened: 'N',
      contents: '연구대상자 동의서(예시) \n' +
          ' \n' +
          '1. 본인은 임상연구에 대해 구두로 설명을 받고 상기 연구 설명문을 읽었으며 담당 연구원과 이 연구에 대하여 충분히 의논하였습니다. \n' +
          '2. 본인은 연구의 위험과 이득에 관하여 들었으며 나의 질문에 만족할 만한 답변을 얻었습니다.\n' +
          '3. 본인은 이 연구에 참여하는 것에 대하여 자발적으로 동의합니다. \n' +
          '4. 본인은 이후의 치료에 영향을 받지 않고 언제든지 연구의 참여를 거부하거나 연구의 참여를 중도에 철회할 수 있고 이러한 결정이 나에게 어떠한 해가 되지 않을 것이라는 것을 알고 있습니다. \n' +
          '5. 본인은 이 설명서 및 동의서에 서명함으로써 의학 연구 목적으로 나의 개인정보가 현행 법률과 규정 이 허용하는 범위 내에서 연구자가 수집하고 처리하는데 동의합니다. \n' +
          '6. 본인은 연구 설명문 및 동의서의 사본을 받을 것을 알고 있습니다.  '
    },
    {
      title: '충남대XXXXX연구 - NNNNN',
      opened: 'N',
      contents: '연구대상자 동의서(예시) \n' +
          ' \n' +
          '1. 본인은 임상연구에 대해 구두로 설명을 받고 상기 연구 설명문을 읽었으며 담당 연구원과 이 연구에 대하여 충분히 의논하였습니다. \n' +
          '2. 본인은 연구의 위험과 이득에 관하여 들었으며 나의 질문에 만족할 만한 답변을 얻었습니다.\n' +
          '3. 본인은 이 연구에 참여하는 것에 대하여 자발적으로 동의합니다. \n' +
          '4. 본인은 이후의 치료에 영향을 받지 않고 언제든지 연구의 참여를 거부하거나 연구의 참여를 중도에 철회할 수 있고 이러한 결정이 나에게 어떠한 해가 되지 않을 것이라는 것을 알고 있습니다. \n' +
          '5. 본인은 이 설명서 및 동의서에 서명함으로써 의학 연구 목적으로 나의 개인정보가 현행 법률과 규정 이 허용하는 범위 내에서 연구자가 수집하고 처리하는데 동의합니다. \n' +
          '6. 본인은 연구 설명문 및 동의서의 사본을 받을 것을 알고 있습니다.  '
    }
  ];

  readonly irbPageInfo = {
    projectSeq: 1,
    irbTitle: '연구대상자를 위한 설명문',
    shortDescription: '본 서비스는 충남대병원임상환자를 위한 개인정보를 추가로 수집하고 있습니다. 수집된 정보는 연구용으로만 사용되며, 동의하지 않을시 데이터는 활용되지 않으며, 미동의 사용자도 시스템의 기능을 사용하실 수 있습니다.',
    fullDescription: '원선영 html',
    preContent: '※ 아래의 내용을 완전히 이해하고 동의하시면 동의 버튼을 눌러주시기 바랍니다.',
    postContent: '' +
        '본 연구목적과 관련하여, 귀하에게서 수집되는 정보는 다음과 같습니다.\n' +
        '- 개인정보 ( 성명 초성 및 영문이니셜, 생년월일, 연령, 교육, 직업 )\n' +
        '- 민감정보 ( 과거병력, 흡연, 음주 약물처방 유무 및 복용량, 임신여부, 생리 및 폐경여부, 불안- 증상 관련설문, 스마트 밴드 착용 및 앱 연동 하는경우: 수면-활동 리듬, 신체활동량, 심박수)\n' +
        '이 정보는 본 연구를 목적으로 연구종료 후 정해진 기간까지만 사용되며 수집된 정보는 개인정보보호법에 따라 관리됩니다. 해당 개인정보는 관련 연구자 이외에는 제공되지 않습니다. 개인정보는 연구종료 후 3년 간 보관되며 이후 폐기될 예정입니다.' +
        '',
    irbContentList: [
      {
        irbSeq: 1,
        agreeOrder: 1,
        agreeContent: '본인은 연구대상자 설명서를 통해 본 연구의 목적, 방법, 기대효과, 가능한 위험성 등에 대해 충분한 설명을 보고 이해하였습니다.'
      },
      {
        irbSeq: 1,
        agreeOrder: 2,
        agreeContent: '본인은 본 연구 참여에 대해 충분히 고려할 시간을 가졌으며, 모든 궁금한 사항에 대해 질문하였고 연구 관련자로부터 충분한 답변을 받았습니다.'
      },
      {
        irbSeq: 1,
        agreeOrder: 3,
        agreeContent: '본인은 본 연구에 동의한 경우라도 언제든지 자유롭게 동의를 철회할 수 있고, 철회 이후 다른 적절한 치료를 받을 수 있음을 확인하였습니다.'
      },
      {
        irbSeq: 1,
        agreeOrder: 4,
        agreeContent: '본인은 이 동의서가 앱 상에서 저장된다는 것을 알고 있습니다.'
      },
      {
        irbSeq: 1,
        agreeOrder: 5,
        agreeContent: '본인은 자유로운 의사에 따라 본 연구 참여에 대해 동의합니다.'
      },
      {
        irbSeq: 1,
        agreeOrder: 6,
        agreeContent: '본인은 이 동의서에 서명함으로써 의학연구 목적으로 아래의 개인정보 수집 및 이용에 동의합니다.'
      },
      {
        irbSeq: 1,
        agreeOrder: 7,
        agreeContent: '본인은 이 동의서에 서명함으로써 의학연구 목적으로 아래의 민감정보 수집 및 이용에 동의합니다.'
      }
    ]
  }

  getList(): Observable<ListResponse<InstitutionalReviewBoard>> {
/*    return of(this.mockList).pipe(map(it => {
      const items = it.map(i => ({
        title: i.title,
        opened: i.opened === 'Y',
        contents: i.contents
      }));

      return {
        items,
        total: this.mockList.length
      };
    }));*/
    return this.restApiService. getData(environment.simApi + this.urlService.getIrb + '/1').pipe(
        switchMap(res => {
          if (res) {
            if (res.code === 200) {
              return of(res.data);
            } else {
              return throwError('IRB 동의서 페이지를 불러오는<br>도중 오류가 발생하였습니다.');
            }
          } else {
            return throwError('IRB 동의서 페이지를 불러오는<br>도중 오류가 발생하였습니다.');
          }
        })
    );
  }

  getIrbPageInfo(): Observable<any> {
    return this.restApiService.getData(environment.simApi + this.urlService.getIrb + '/1').pipe(
        switchMap(res => {
          if (res) {
            if (res.code === 200) {
              return of(res.data);
            } else {
              return throwError('IRB 동의서 페이지를 불러오는<br>도중 오류가 발생하였습니다.');
            }
          } else {
            return throwError('IRB 동의서 페이지를 불러오는<br>도중 오류가 발생하였습니다.');
          }
        })
    );
  }

  // IRB 모두 동의 확인
  checkAllAgree(list) {
    let resultValidation = true;
    for (const item of list) {
      if (!item.agree) {
        resultValidation = !resultValidation;
        break;
      }
    }
    return resultValidation;
  }

  // 오프라인 IRB 동의 처리
  addOfflineAgreement(verificationCode) {
    return this.restApiService.postData(environment.simApi + this.urlService.offlineAgreement, {verificationCode}).pipe(
        switchMap(res => {
          if (res) {
            if (res.code === ResponseCode.OK) {
              return of(res.data);
            } else if (res.code === ResponseCode.NO_MATCHING) {
              return throwError('잘못된 임상코드 입니다.');
            } else {
              return throwError('임상코드 등록을 실패하였습니다.');
            }
          } else {
            return throwError('임상코드 등록을 실패하였습니다.');
          }
        })
    );
  }

  // 온라인 IRB 동의 처리
  addOnlineAgreement(signSeq) {
    const reqVo: any = {
      signSeq,
      irbSeq: '1'
    };
    return this.restApiService.postData(environment.simApi + this.urlService.onlineAgreement, reqVo).pipe(
        switchMap(res => {
          if (res) {
            if (res.code === ResponseCode.OK) {
              return of('온라인 IRB 동의를 완료하였습니다.');
            } else if (res.code === ResponseCode.ALREADY_DATA) {
              return throwError('이미 온라인 IRB 동의를 하셨습니다.');
            } else {
              return throwError('온라인 IRB 동의를 실패하였습니다.');
            }
          } else {
            return throwError('온라인 IRB 동의를 실패하였습니다.');
          }
        })
    );
  }

  // 오프라인 IRB 삭제 처리
  delOfflineAgreement(agreeSeq) {
    return this.restApiService.deleteData(environment.simApi + this.urlService.delOfflineAgreement + '/' + agreeSeq).pipe(
        switchMap(res => {
          if (res) {
            if (res.code === ResponseCode.OK) {
              return of('임상코드 삭제를 성공하였습니다.');
            } else if (res.code === ResponseCode.NO_MATCHING) {
              return throwError('잘못된 임상코드 입니다.');
            } else {
              return throwError('임상코드 삭제를 실패하였습니다.');
            }
          } else {
            return throwError('임상코드 삭제를 실패하였습니다.');
          }
        })
    );
  }

  // IRB 동의 조회
  getAgreed() {
    return this.restApiService.getData(environment.simApi + this.urlService.getAgreed).pipe(
        switchMap(res => {
          console.log(res)
          if (res) {
            if (res.code === ResponseCode.OK) {
              return of(res.data);
            } else if (res.code === ResponseCode.NO_MATCHING) {
              return throwError('303');
            } else {
              return throwError('임상코드 삭제를 실패하였습니다.');
            }
          } else {
            return throwError('임상코드 삭제를 실패하였습니다.');
          }
        })
    );
  }

  // IRB 철회
  withdrawIrb(agreeSeq) {
    return this.restApiService.putData(environment.simApi + this.urlService.disagreement, {agreeSeq}).pipe(
        switchMap(res => {
          if (res) {
            if (res.code === ResponseCode.OK) {
              return of('정상적으로 철회를 완료하였습니다.');
            } else if (res.code === ResponseCode.NO_MATCHING) {
              return throwError('해당 프로젝트는 참여중이 아닙니다.');
            } else {
              return throwError('철회를 하는 도중 오류가 발생하였습니다.');
            }
          } else {
            return throwError('철회를 하는 도중 오류가 발생하였습니다.');
          }
        })
    );
  }

  setIrbList(res) {
    const irbList: any = [];
    for (let i = 0; i < res.length; i++) {
      //if (res[i].project.projectSeq !== 1) {
        const irbVo: any = {
          agreeSeq: res[i].agreeSeq,
          projectSeq: res[i].project.projectSeq,
          projectNm: res[i].project.projectNm,
          projectDescription: res[i].project.projectDescription,
          endDt: res[i].project.endDt,
          withdrawalDt: res[i].withdrawalDt,
          state: '',
          stateNm: '',
          useYn: res[i].useYn
        };
        if (irbVo.endDt !== null) {
          const same = this.dateService.compareDate(irbVo.endDt, this.dateService.getToday('YYYY-MM-DD'), 'SAME');
          const before = this.dateService.compareDate(irbVo.endDt, this.dateService.getToday('YYYY-MM-DD'), 'BEFORE');
          if (same || before) {
            if (irbVo.useYn === 'Y') {
              irbVo.state = 'Proceeding';
              irbVo.stateNm = '진행중';
            } else {
              irbVo.state = 'Withdraw';
              irbVo.stateNm = '철회됨';
            }
          } else {
            if (irbVo.useYn === 'Y') {
              irbVo.state = 'End';
              irbVo.stateNm = '시험 종료';
            } else {
              irbVo.state = 'Withdraw';
              irbVo.stateNm = '철회됨';
            }
          }
        } else {
          console.log(irbVo.useYn)
          if (irbVo.useYn === 'Y') {
            irbVo.state = 'Proceeding';
            irbVo.stateNm = '진행중';
          } else {
            irbVo.state = 'Withdraw';
            irbVo.stateNm = '철회됨';
          }
        }
        irbList.push(irbVo);
      //}
    }
    return irbList;
  }


}
