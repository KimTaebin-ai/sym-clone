import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationExtras} from '@angular/router';
import {PatientSurveyService} from '../../../mind-module/service/patient-survey.service';
import {AlertUtilService} from '../../../util/common/alert-util.service';
import {ResponseCode} from '../../../mind-module/data/response.data';
import {environment} from '../../../../environments/environment';
import {LoadingService} from '../../../util/loading.service';
import {CommonUtilService} from '../../../util/common/common-util.service';
import {Sensors} from '@ionic-native/sensors/ngx';
import {PageInfoService} from '../../../services/page-info.service';
import {AlertController, IonContent, NavController} from '@ionic/angular';
import {MindManager} from '../../../mind-module/mind.manager';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-insert-psychological-scale',
  templateUrl: './insert-psychological-scale.page.html',
  styleUrls: ['./insert-psychological-scale.page.scss'],
})
export class InsertPsychologicalScalePage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  /*페이지 정보*/
  pageTitle: any = '';


  symUrlForImg = environment.simApi + '/api/file/';

  // 라운드 정보
  roundInfo: any = {
    roundNo: 0,
    surveySeq: 0,
    surveyTitleKO: ''
  };

  // 복수형 답변
  multipleAnswers: any = {
   answers: [],
   answer: ''
  }


  surveyInfo: any = {};

  surveyAnswer: any = {
    radioGrid: {
      values: {
        displayOrder: null,
        inputOrder: null
      }
    },
    radio: {
      values: {
        displayOrder: null,
        inputOrder: null
      }
    },
    stepGrid: {
      values: {
        displayOrder: null,
        inputOrder: null
      }
    },
    number: {
      values: {
        numberValue: null,
        inputOrder: null
      }
    },
    check: {
      values: []
    },
    listText: {
      values: []
    },
    radioGridByList: {
      values: {
        displayOrder: '',
        inputOrder: null
      }
    }
  };

  // 결과 페이지
  surveyCompleteInfo: any = null;

  constructor(
      private route: ActivatedRoute,
      private surveyService: PatientSurveyService,
      private alertUtilService: AlertUtilService,
      private loadingService: LoadingService,
      private commonUtillService: CommonUtilService,
      private sensors: Sensors,
      private pageInfoService: PageInfoService,
      private navController: NavController,
      private alertCtrl: AlertController,
      private mindManager: MindManager,
      private iab: InAppBrowser
  ) { }

  ngOnInit() {
    this.pageTitle = this.pageInfoService.getPageInfo('title');
    this.route.queryParams.subscribe(params => {
      if (params) {
        console.log(JSON.parse(params.data))
        this.roundInfo = JSON.parse(params.data);
        this.mindManager.setSurveyData(params.data)
        // surveyCategoryCode
        const paramData: any = {
          roundNo: this.roundInfo.roundNo,
          surveySeq: this.roundInfo.surveySeq
        };
        this.getSurveyInfo(paramData, 'INIT');
      }
    });
  }

  setParamsForGSI(direction) {
    this.loadingService.showLoading(true, '설문을 조회 중입니다.');
    const data: any = {
      questionType: this.surveyInfo.questionType,
      surveyInfo: this.surveyInfo,
      roundInfo: this.roundInfo,
      surveyAnswer: this.surveyAnswer,
      multipleAnswers: this.multipleAnswers
    }

    this.surveyService.setParamsForGSI(direction, data).then(res => {
      this.getSurveyInfo(res, 'GET_INFO');
    }, err => {
      this.loadingService.showLoading(false, '');
    });
  }

  // 질문 조회
  getSurveyInfo(param, type) {
    this.surveyService.getSurveyInfo(param).subscribe(res => {
      this.content.scrollToTop();
      console.log(res)
      this.resetAnswer();
      this.surveyInfo = res;
      if (Object.keys(this.surveyInfo.nowAnswers).length !== 0 && JSON.stringify(this.surveyInfo.nowAnswers) !== JSON.stringify({})) {
        if (this.surveyInfo.questionType === 'listText') {
          this.multipleAnswers.answers = this.surveyInfo.nowAnswers.answers
        } else {
          this.surveyAnswer[this.surveyInfo.questionType].values = this.surveyInfo.nowAnswers.answers;
        }
      }
      this.loadingService.showLoading(false, '');
    }, err => {
      this.loadingService.showLoading(false, '');
      if (err.code === ResponseCode.SURVEY_COMPLETE) {
        // 설문 종료 및 조도 측정
        if (type !== 'INIT') {
          this.setLux(err.data);
        } else {
          this.resetAnswer();
          this.surveyInfo = {};
          this.surveyCompleteInfo = err.data;
        }
      } else if (err.code === ResponseCode.EMPTY_ANSWER) {
        this.alertUtilService.showAlert(null, ResponseCode.EMPTY_ANSWER_MESSAGE);
      } else {
        console.log(err);
        // this.alertUtilService.showAlert(null, err.message);
      }
    });
  }



  // 답변 선택
  selectAnswer(type, item) {
    if (type === 'radioGrid' || type === 'radio' || type === 'stepGrid' || type === 'radioGridByList') {
      this.surveyAnswer[type].values.displayOrder = item.displayOrder;
    } else if (type === 'check') {
      let delYn = false;
      for (const i in this.surveyAnswer.check.values) {
        if (this.surveyAnswer.check.values[i].displayOrder === item.displayOrder) {
          this.surveyAnswer.check.values.splice(i, 1);
          delYn = true;
        }
      }
      if (!delYn) {
        const reqVo: any = {
          displayOrder: item.displayOrder,
          inputOrder: 0
        }
        this.surveyAnswer.check.values.push(reqVo);
      }
    }
  }

  // 복수 답변 선택 여부 확인
  checkMultipleAnswer(type, item) {
    let resultData = false;
    if (type === 'check') {
      for (const i in this.surveyAnswer[type].values) {
        if (this.surveyAnswer[type].values[i].displayOrder === item.displayOrder) {
          resultData = true;
        }
      }
    }
    return resultData;
  }

  addMultipleAnswers(type) {
    if (type === 'listText') {
      this.multipleAnswers.answers.push(this.multipleAnswers.answer);
      this.multipleAnswers.answer = '';
    }
  }

  delMultipleAnswers(index, type) {
    if (type === 'listText') {
      this.multipleAnswers.answers.splice(index, 1);
    }
  }

  // 설문 재시작
  restartSurvey() {
    const paramData: any = {
      roundNo: this.roundInfo.roundNo,
      surveySeq: this.roundInfo.surveySeq,
      updateYn: true
    };
    this.surveyCompleteInfo = null;
    this.getSurveyInfo(paramData, 'GET_INFO');
  }

  // 조도센서
  setLux(completeData): any {
    let sum = 0;
    let count = 0;
    const lightSensor = setInterval(() => {
      this.loadingService.showLoading(true, '조도를 측정하는 중입니다. 잠시만 기다려주세요.');
      this.sensors.enableSensor('LIGHT');
      const dd = this.sensors.getState();
      dd.then(res => {
        if (res) {
          sum = sum + Number(res);
          count++;
        }
      });
    }, 200);

    this.commonUtillService.delay(3000).then(() => {
      this.loadingService.showLoading(false, '');
      clearInterval(lightSensor);
      this.sensors.disableSensor();
      let aug = 0;
      if (count !== 0) {
        aug = Math.floor(sum / count);
      }
      this.surveyService.setLux(aug).subscribe(res => {
      }, err => {
        console.log(err);
      });
    });
    this.resetAnswer();
    this.surveyInfo = {};
    this.surveyCompleteInfo = completeData;
  }

  resetAnswer() {
    this.surveyAnswer = {
      radioGrid: {
        values: {
          displayOrder: null,
          inputOrder: null
        }
      },
      radio: {
        values: {
          displayOrder: null,
          inputOrder: null
        }
      },
      stepGrid: {
        values: {
          displayOrder: null,
          inputOrder: null
        }
      },
      number: {
        values: {
          numberValue: null,
          inputOrder: null
        }
      },
      check: {
        values: []
      },
      listText: {
        values: []
      },
      radioGridByList: {
        values: {
          displayOrder: '',
          inputOrder: null
        }
      }
    };
    this.multipleAnswers = {
      answers: [],
      answer: ''
    };
  }

  // 확인창
  async closeSurveyAlert() {
      const alert = await this.alertCtrl.create({
        header: '알림',
        message: '설문을 종료하시겠습니까?',
        buttons: [
          {
            text: '예',
            handler: data => {
              this.closeSurvey();
            }
          },
          {
            text: '아니요',
            role: 'cancel',
            handler: data => {
            }
          }
        ]
      });
      await alert.present();
  }

  closeSurvey() {
    this.mindManager.setSurveyData(null)
    const lastUrl = this.pageInfoService.getToBack();
    if (lastUrl) {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          surveyCategoryCode: this.roundInfo.surveyCategoryCode
        }
      };
      this.navController.navigateRoot(['/scale-sub-list'], navigationExtras);
    } else {
      this.alertUtilService.showAlert(null, '이전 위치를 조회하는 도중 오류가 발생하였습니다.APP를 종료 후 다시 실행 시켜주세요.');
    }
  }

  // 리소스 참고 사이트 이동
  viewWebBroser() {
    const options = 'closebuttoncaption=닫기,hideurlbar=yes,location=no,toolbar=yes,toolbarposition=top';
    const url = this.surveyCompleteInfo.outcomePath;
    /*this.iab.create(url, '_blank' , options);*/
    const browser = this.iab.create(url,  '_blank', options);
    browser.on('loadstop').subscribe(event => {
      browser.insertCSS({ code: 'html{height: 100%;} body{height: calc(100% - 45px);}' });
    });
  }

}
