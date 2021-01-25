import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController, IonItemSliding, NavController} from '@ionic/angular';
import {AlertUtilService} from '../../../util/common/alert-util.service';
import {PatientSurveyService} from '../../../mind-module/service/patient-survey.service';
import {ActivatedRoute, NavigationExtras} from '@angular/router';
import {PageInfoService} from '../../../services/page-info.service';

@Component({
    selector: 'app-scale-sub-list',
    templateUrl: './scale-sub-list.page.html',
    styleUrls: ['./scale-sub-list.page.scss'],
})
export class ScaleSubListPage implements OnInit {

    @ViewChild(IonItemSliding) slidingItem: IonItemSliding;

    surveyCategoryCode = '';

    surveyList: any = {
        subSurveyInfo: [],
        surveyInfo: {
            completeCount: 0,
            surveyCategoryCode: 0,
            surveyCategoryName: '',
            totalCount: 0
        }
    }

    constructor(
        private alertCtrl: AlertController,
        private alertUtilService: AlertUtilService,
        private surveyService: PatientSurveyService,
        private route: ActivatedRoute,
        private pageInfoService: PageInfoService,
        private navController: NavController
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (params) {
                this.surveyCategoryCode = params.surveyCategoryCode;
            }
        });
        this.getSurveyInfo();
    }

    // 진행 퍼센트 계산
    getPercent(type, item) {
        const resultData = type === 'SURVEY' ?
            Math.floor(Number(this.surveyList.surveyInfo.completeCount) / Number(this.surveyList.surveyInfo.totalCount) * 100) / 100 :
            Math.floor(Number(item.completeCount) / Number(item.totalCount) * 100) / 100;
        return resultData;
    }

    // 스킵 해제
    changeSkipInfo(item, type) {

        const reqVo: any = {
            roundNo: item.roundNo,
            surveySeq: item.surveySeq,
            surveySkip: ''
        };
        reqVo.surveySkip = type === 'STOP' ? 'Y' : 'N';
        this.surveyService.chageSkipInfo(reqVo).subscribe(res => {
            item.surveySkip = type === 'STOP' ? 'Y' : 'N';
        }, err => {
            this.alertUtilService.showAlert(null, err);
        });
    }



    getSurveyInfo() {
        this.surveyService.getSurveySubList(this.surveyCategoryCode).subscribe(res => {
            console.log(res)
            this.surveyList.subSurveyInfo = res.subSurveyInfo;
            this.surveyList.surveyInfo = res.surveyInfo;
        }, err => {
            this.alertUtilService.showAlert(null, err);
        });
    }

    startSurvey(item) {
        if (item.surveySkip === 'Y') {
            return false;
        }
        item.surveyCategoryCode = this.surveyCategoryCode;
        const navigationExtras: NavigationExtras = {
            queryParams: {
                data: JSON.stringify(item)
            }
        };
        this.pageInfoService.getToOtherPage('/scale-sub-list', '/insert-psychological-scale', item.surveyTitleKO).then(() => {
            this.navController.navigateRoot(['/insert-psychological-scale'], navigationExtras);
        });
    }


    // 통합아이디 확인창
    async showConfirmAlert(item, type) {
        let alertText = '';
        if (type === 'STOP') {
            this.slidingItem.close;
            alertText = '<p class="popup_font">설문을 중단하면 해당 설문은 설문이 불가합니다.<br>그래도 중단하시겠습니까?</p>';
        } else {
            alertText = '<p class="popup_font">해당 설문을 다시 시작하시겠습니까?</p>';
        }
        const alert = await this.alertCtrl.create({
            header: '알림',
            message: alertText,
            buttons: [
                {
                    text: '예',
                    handler: data => {
                        this.changeSkipInfo(item, type);
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



}
