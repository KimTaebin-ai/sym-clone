import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController, IonContent, ModalController, NavController} from '@ionic/angular';
import {TermModalPage} from '../../modal/term-modal/term-modal.page';
import {MoreInfoModalPage} from '../../modal/more-info-modal/more-info-modal.page';
import {AlertUtilService} from '../../../util/common/alert-util.service';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {MindManager} from '../../../mind-module/mind.manager';
import {PageInfoService} from '../../../services/page-info.service';
import {IrbService} from '../../../mind-module/service/irb.service';
import {AuthService} from '../../../mind-module/service/auth.service';
import {PatientInfoModel} from '../../../mind-module/model/patientInfo.model';
import {CodeService} from '../../../services/code.service';
import {ValidationService} from '../../../services/validation.service';
import {ResponseCode} from '../../../mind-module/data/response.data';
import {StorageUtil} from '../../../mind-module/util/storage.util';

@Component({
    selector: 'app-more-info',
    templateUrl: './more-info.page.html',
    styleUrls: ['./more-info.page.scss'],
})
export class MoreInfoPage implements OnInit {
    @ViewChild(IonContent) content: IonContent;
    infoPage = 1;


    diseaseInfo: any = {
        selectedDiseaseList: [],
    };
    /*IRB----------*/
    // 임상 실험 코드
    verificationCode: '';
    irbList: any = [];
    onlineIrb = false;
    /*-------------*/

    /*유저 기본 정보*/
    // 타이머
    timer: any = {
        num: 0
    };

    conditionValue: any = {
        // 타이머
        timer: false,
        mobileReadOnly: false,
        mobileAuthNum: false,
        mobileAuthYn: false,
        mobileConfirm: '',
        mobileUpdate: false
    };

    usrInfo: any = {
        mobileNum: '',
        authNum: '',
        authYn: false,
        height: 0,
        weight: 0
    };
    /*-------------*/

    /*유저 추가 정보*/


    pageInfo: any = {};
    patientMoreInfo: PatientInfoModel;

    // 유효성 알림 메세지
    checkInputValMessage: any = {
        birthday: '',
        password: '',
        passwordChk: '',
        loginId: ''
    };

    // 에러 메세지
    errorMessage: any = {
        mobile: ''
    };

    /*-------------*/
    constructor(
        private modalController: ModalController,
        private alertUtilService: AlertUtilService,
        public navController: NavController,
        private mindManager: MindManager,
        private pageInfoService: PageInfoService,
        private irbService: IrbService,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private codeService: CodeService,
        private validationService: ValidationService,
        private alertCtrl: AlertController
    ) {
    }

    ngOnInit() {
        this.getAgreed();
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.queryParams) {
                if (this.router.getCurrentNavigation().extras.queryParams) {
                    const paramData: any = this.router.getCurrentNavigation().extras.queryParams;
                    if (paramData.onlineRes) {
                        this.onlineIrb = paramData.onlineRes;
                    }
                }
            }
        });
        this.getMoreInfo();
        //this.getPageInfo();
    }

    selectList(item, type) {
        if (type === 'DISEASE') {
            if (item.selected) {
                item.insertData.content = '';
                item.insertData.diseaseCode = '';
            } else {
                item.insertData.diseaseCode = item.codeSeq;
            }
            console.log(item);
            item.selected = !item.selected;
        }
    }

    async selectMoreInfoModal(i, item, type) {
        if (type === '10-1') {
            if (item.insertData.infoDiseaseSymptoms.length > 0) {
                const insertData: any = {
                    content: '',
                    diseaseCode: '',
                    infoDiseaseSymptoms: [],
                    onset: ''
                };
                item.insertData = insertData;
            } else {
                const modal = await this.modalController.create({
                    component: MoreInfoModalPage,
                    cssClass: 'moreInfoModal1',
                    componentProps: {
                        moreInfoData: item,
                        type,
                        codeList: this.pageInfo.infoSymptom
                    },
                    backdropDismiss: false
                });

                modal.onDidDismiss()
                    .then((data) => {
                        if (data.data.modalResultYn === 'Y') {
                            if (data.data.data) {
                                item.insertData = data.data.data;
                            }
                        }
                    });

                return await modal.present();
            }
        } else if (type === '3-1') {
            if (item.insertData.state) {
                const insertData: any = {
                    content: '',
                    state: '',
                    statusCode: item.codeSeq,
                    year: ''
                };
                item.insertData = insertData;
            } else {
                const modal = await this.modalController.create({
                    component: MoreInfoModalPage,
                    cssClass: 'moreInfoModal2',
                    componentProps: {
                        moreInfoData: item,
                        type,
                        codeList: null
                    },
                    backdropDismiss: false
                });

                modal.onDidDismiss()
                    .then((data) => {
                        if (data.data.data) {
                            item.insertData = data.data.data;
                        }
                    });

                return await modal.present();
            }
        } else if (type === '12-2') {
            if (item.insertData.drinkAmount) {
                const insertData: any = {
                    drinkAmount: 0,
                    drinkCode: 0,
                    drinkEtc: '',
                    numOfYears: 0,
                    perWeek: 0
                };
                item.insertData = insertData;
            } else {
                const modal = await this.modalController.create({
                    component: MoreInfoModalPage,
                    cssClass: 'moreInfoModal2',
                    componentProps: {
                        moreInfoData: item,
                        type,
                        codeList: null
                    },
                    backdropDismiss: false
                });

                modal.onDidDismiss()
                    .then((data) => {
                        if (data.data.data) {
                            item.insertData = data.data.data;
                        }
                    });
                return await modal.present();
            }
        }
    }

    checkSelectIndex(item, type) {
        if (type === 'DISEASE') {
            if (item.selected) {
                return true;
            } else {
                return false;
            }
        } else if (type === 'education_etc') {
            let etcVo;

            for (let i = 0; i < this.pageInfo.infoEducation.length; i++) {
                if (this.pageInfo.infoEducation[i].codeSeq === Number(this.patientMoreInfo.educationCode)) {
                    etcVo = this.pageInfo.infoEducation[i];
                }
            }
            if (etcVo.codeId === 'etc') {
                return true;
            } else {
                return false;
            }
        } else if (type === 'job_etc') {
            if (this.patientMoreInfo.jobCode) {
                let etcVo;
                for (let i = 0; i < this.pageInfo.infoJob.length; i++) {
                    if (this.pageInfo.infoJob[i].codeSeq === Number(this.patientMoreInfo.jobCode)) {
                        etcVo = this.pageInfo.infoJob[i];
                    }
                }
                if (etcVo.codeId === 'etc') {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else if (type === 'religion_etc') {
            if (this.patientMoreInfo.religionCode) {
                let etcVo;

                for (let i = 0; i < this.pageInfo.infoReligion.length; i++) {
                    if (this.pageInfo.infoReligion[i].codeSeq === Number(this.patientMoreInfo.religionCode)) {
                        etcVo = this.pageInfo.infoReligion[i];
                    }
                }
                if (etcVo.codeId === 'etc') {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else if (type === 'DISEASE_LIST') {
            let returnData = false;
            if (this.pageInfo.infoDisease) {
                for (const key in this.pageInfo.infoDisease) {
                    if (this.pageInfo.infoDisease[key].selected === true) {
                        returnData = true;
                        break;
                    }
                }
            }
            return returnData;
        }
    }

    nextPage() {
        if (this.infoPage === 9) {
            this.insertMoreUserInfo();
        } else {
            this.content.scrollToTop();
            if (this.infoPage === 2) {
                if (this.patientMoreInfo.weight > 501 || this.patientMoreInfo.height > 301 || this.conditionValue.mobileUpdate) {
                    if (this.conditionValue.mobileUpdate) {
                        this.alertUtilService.showAlert(null, '휴대폰 번호를 인증해주세요.');
                        return false;
                    }
                    if (this.patientMoreInfo.weight > 501) {
                        this.alertUtilService.showAlert(null, '몸무게는 500kg를 초과할 수 없습니다.');
                        return false;
                    }
                    if (this.patientMoreInfo.height > 301) {
                        this.alertUtilService.showAlert(null, '신장은 300cm를 초과할 수 없습니다.');
                        return false;
                    }
                } else {
                    this.infoPage++;
                }
            } else if (this.infoPage === 1) {
                this.mindManager.setLockState(false);
                this.infoPage++;
            } else if (this.infoPage === 2) {
                this.mindManager.setLockState(true);
                this.infoPage++;
            } else if (this.infoPage === 3) {
                if (!this.authService.infoDiseaseValidation(this.pageInfo.infoDisease)) {
                    this.alertUtilService.showAlert(null, '상세 내용을 입력해주세요.');
                    return false;
                } else {
                    const subInfo = this.checkSelectIndex(null, 'DISEASE_LIST');
                    if (subInfo === false) {
                        this.infoPage = this.infoPage + 2;
                    } else {
                        this.infoPage++;
                    }
                }
            } else if (this.infoPage === 5) {
                const params: any = {
                    educationCode: this.patientMoreInfo.educationCode,
                    educationEtc: this.patientMoreInfo.educationEtc,
                    jobCode: this.patientMoreInfo.jobCode,
                    jobEtc: this.patientMoreInfo.jobEtc,
                    religionCode: this.patientMoreInfo.religionCode,
                    religionEtc: this.patientMoreInfo.religionEtc,
                    infoEducation: this.pageInfo.infoEducation,
                    infoJob: this.pageInfo.infoJob,
                    infoReligion: this.pageInfo.infoReligion
                };
                if (!this.authService.infoEduNJobNReligionValidation(params)) {
                    this.alertUtilService.showAlert(null, '상세 내용을 모두 입력해주세요.');
                    return false;
                } else {
                    this.infoPage++;
                }
            } else {
                this.infoPage++;
            }

        }
        if (this.infoPage === 9) {
            setTimeout(function() {
                console.log('Works!');
                const ionRangePin = document.querySelector('ion-range').shadowRoot.querySelector('.range-slider').querySelector('.range-pin');
                const ionRangeSlider = document.querySelector('ion-range').shadowRoot.querySelector('.range-slider');
                ionRangePin.setAttribute('style',
                    '' +
                    'align-items: center;' +
                    'display: grid;position: relative;' +
                    'top: -6vh;right: 27%;' +
                    'transition: transform 0.12s ease 0s, -webkit-transform 0.12s ease 0s;' +
                    'color: var(--ion-text-color,#000);' +
                    'font-size: 1rem;text-align: center;' +
                    'font-weight: 900;' +
                    'width: 16vw;' +
                    'height: 5vh;' +
                    'border-radius: 4px;' +
                    'padding: 0;' +
                    'content: " %";' +
                    'box-shadow: rgba(83, 85, 155, 0.18) 0px 1px 8px 0px;' +
                    ''
                );

                ionRangePin.textContent = `0%`;
                ionRangeSlider.querySelector('.range-knob-handle')
                    .addEventListener('pointermove', function() {
                        const value = this.getAttribute('aria-valuenow');
                        this.querySelector('.range-pin').textContent = `${value}%`;
                    });

                ionRangeSlider.querySelector('.range-knob-handle').setAttribute('style', 'top: 0;');
                ionRangeSlider.querySelector('.range-knob').setAttribute('style', 'border: 0.6vh solid #44bbc8;');

            }, 1500);

            /**/
        }
    }


    // 약관 모달 실행
    openIrbModal() {
        this.pageInfoService.getToOtherPage('/more-info', '/irb-agree', '연구 대상자 동의서').then(() => {
            const paramVo = {
                queryParams: {},
                animate: false
            };
            const navigationExtras: NavigationExtras = paramVo;
            this.navController.navigateForward(['/irb-agree'], {animated: false});
        });
    }


    /*--IRB-----------------------------------------------------*/
    getAgreed() {
        this.irbService.getAgreed().subscribe(res => {
            for (let i = 0; i < res.length; i++) {
                if (res[i].project.projectSeq === 1) {
                    this.onlineIrb = true;
                }
            }
            this.irbList = this.irbService.setIrbList(res);
            const data = [];
            for (const i in this.irbList) {
                if (this.irbList[i].useYn === 'Y') {
                    const vo = this.irbList[i];
                    vo.type = 'OLD';
                    data.push(vo);
                }
            }
            this.irbList = data;
        }, err => {
            if (err === '303') {
                this.irbList = [];
                this.onlineIrb = false;
            } else {
                this.alertUtilService.showAlert(null, err);
            }
        });
    }

    // 오프라인 IRB 등록
    addOfflineAgreement() {
        if (!this.verificationCode) {
            this.alertUtilService.showAlert(null, '임상 시험 코드를 <br>입력해주세요.');
            return false;
        }
        this.irbService.addOfflineAgreement(this.verificationCode).subscribe(res => {
            console.log(res);
            this.verificationCode = '';
            const data: any = {
                projectNm: res.project.projectNm,
                projectSeq: res.project.projectSeq,
                agreeSeq: res.agreeSeq,
                type: 'NEW'
            };
            this.irbList.push(data);
        }, err => {
            this.alertUtilService.showAlert(null, ' 임상 시험 코드 입력을<br>실패하였습니다.');
        });
    }

    // 오프라인 IRB 삭제
    delOfflineAgreement(index) {
        this.irbService.delOfflineAgreement(this.irbList[index].agreeSeq).subscribe(res => {
            console.log(index);
            console.log(this.irbList);
            console.log(this.irbList[index]);
            this.irbList.splice(index, 1);
        }, err => {
            this.alertUtilService.showAlert(null, ' 임상 시험 코드 삭제를<br>실패하였습니다.');
        });
    }

    /*----------------------------------------------------------*/

    /*--유저 기본 정보--------------------------------------------*/

    getPageInfo() {
        this.codeService.getTotalCodeList().subscribe(res => {
            console.log(res);
            this.pageInfo = this.authService.getMoreInfoPage(res, this.patientMoreInfo);
        });
    }

    getMoreInfo() {
        this.authService.getMoreInfo().subscribe(res => {
            this.patientMoreInfo = res;
            if (this.patientMoreInfo) {
                if (this.patientMoreInfo.phone) {
                    this.conditionValue.mobileReadOnly = true;
                    this.conditionValue.mobileAuthNum = false;
                    this.usrInfo.mobileNum = this.patientMoreInfo.phone;
                }
            }
            this.getPageInfo();
        }, err => {
            this.patientMoreInfo = new PatientInfoModel();
            if (err.code !== ResponseCode.NO_MATCHING) {
                this.alertUtilService.showAlert(null, err.massege);
            }
            this.getPageInfo();
        });
    }

    // 선택 버튼 선택
    selectButton(type, data) {
        if (type === 'married') {
            this.patientMoreInfo.married = data;
        } else if (type === 'haveJob') {
            this.patientMoreInfo.haveJob = data;
            if (data === 'N') {
                this.patientMoreInfo.jobCode = '';
                this.pageInfo.jobEtc = '';
            }
        } else if (type === 'disaese') {
            this.patientMoreInfo.disaese = data;
        } else if (type === 'smoke') {
            this.patientMoreInfo.smoke = data;
            if (data === 'N') {
                this.patientMoreInfo.smokeNow = '';
                this.patientMoreInfo.dayOfSmoke = '';
            }
        } else if (type === 'smokeNow') {
            this.patientMoreInfo.smokeNow = data;
        } else if (type === 'drinkNow') {
            this.patientMoreInfo.drinkNow = data;
        } else if (type === 'drinkNowProblem') {
            this.patientMoreInfo.drinkNowProblem = data;
        } else if (type === 'drinkProblem') {
            this.patientMoreInfo.drinkProblem = data;
        } else if (type === 'menopause') {
            this.patientMoreInfo.menopause = data;
        } else if (type === 'suicide') {
            this.patientMoreInfo.suicide = data;
            if (data === 'N') {
                this.patientMoreInfo.suicideWhen = '';
                this.patientMoreInfo.suicideNum = '';
            }
        } else if (type === 'drink') {
            this.patientMoreInfo.drink = data;
        } else if (type === 'suicideNowFeel') {
            this.patientMoreInfo.suicideNowFeel = data;
        } else if (type === 'suicideNow') {
            this.patientMoreInfo.suicideNow = data;
        } else if (type === 'drugNow') {
            this.patientMoreInfo.drugNow = data;
            if (data === 'N') {
                this.patientMoreInfo.drugNowTaking = '';
            }
        }
    }

    insertMoreUserInfo() {
        console.log(this.pageInfo, this.patientMoreInfo);
        const reqVo: any = this.authService.setMoreInfoInsertData(this.pageInfo, this.patientMoreInfo);
        this.authService.setMoreInfo(reqVo).subscribe(res => {
            this.alertUtilService.showAlert(null, '추가 정보 입력을 완료하였습니다.');
            const paramVo = {
                queryParams: {
                    login : 'LOGIN'
                }
            }
            const navigationExtras: NavigationExtras = paramVo;
            const data: any = {
                url: '/main/main/home',
                title: '메인페이지/홈'
            }
            this.pageInfoService.resetPageInfo(data).then(() => {
                this.navController.navigateRoot(['/main'], navigationExtras);
            });
        }, err => {
            this.alertUtilService.showAlert(null, err);
        });

    }

    /*----------------------------------------------------------*/


    /*회원 기본 정보----------------------------------------------*/


    // 타이머 생성
    createTimer() {
        const isExist = Object.keys(this.timer).includes('timerFunction');
        if (isExist) {
            clearInterval(this.timer.timerFunction);
            this.timer = {
                num: 0,
                time: ''
            };
        }
        this.conditionValue.timer = true;
        this.timer.num = 600;
        this.timer.timerFunction = setInterval(() => {
            this.timer.num--;
            this.timer.time = (Math.floor(this.timer.num / 60) + '분' + (this.timer.num % 60) + '초').toString(); // 남은 시간 계산
            if (this.timer.num === 0) {
                clearInterval(this.timer.timerFunction);
                this.alertUtilService.showAlert(null, '<p class="popup_boldText">인증번호가 만료되었습니다.<br>재인증해주세요.</p>');
                this.conditionValue.timer = false;
                this.conditionValue.mobileAuthNum = false;
                this.conditionValue.mobileAuthYn = false;
            }
        }, 1000);
    }

    // 타이머 종료
    stopTimer() {
        const isExist = Object.keys(this.timer).includes('timerFunction');
        if (isExist) {
            clearInterval(this.timer.timerFunction);
            this.timer = {
                num: 0,
                time: ''
            };
        }
        this.conditionValue.timer = true;
    }

    // 모바일 인증
    mobileCertification() {
        this.errorMessage.mobile = '';

        this.authService.mobileCertKeySend(this.usrInfo.mobileNum).subscribe(res => {
            this.conditionValue.mobileConfirm = this.usrInfo.mobileNum;
            console.log(res);
            this.alertUtilService.showAlert(null, res);
            this.conditionValue.mobileAuthNum = true;
            this.createTimer();
        }, err => {
            console.log(err);
            this.alertUtilService.showAlert(null, err);
            this.conditionValue.mobileAuthNum = false;
        });
    }


    // 인증 번호 확인
    certificationAuthNum() {
        if (this.conditionValue.mobileConfirm !== this.usrInfo.mobileNum) {
            this.alertUtilService.showAlert(null, '인증 받은 번호가 아닙니다. 다시 인증해주세요.');
            this.stopTimer();
            this.patientMoreInfo.phone = '';
            this.conditionValue.timer = false;
            this.conditionValue.mobileReadOnly = false;
            this.conditionValue.mobileAuthNum = false;
            this.conditionValue.mobileAuthYn = false;
            this.conditionValue.mobileConfirm = '';
            this.usrInfo.mobileNum = '';
            this.usrInfo.authNum = '';
            this.usrInfo.authYn = false;
            return false;
        }
        const reqVo: any = {
            mobile: this.usrInfo.mobileNum,
            authKey: this.usrInfo.authNum
        };

        this.authService.certKeyCheck(reqVo).subscribe(res => {
            this.alertUtilService.showAlert(null, res);
            this.conditionValue.mobileReadOnly = true;
            this.conditionValue.mobileAuthNum = false;
            this.patientMoreInfo.phone = this.usrInfo.mobileNum;
            this.conditionValue.mobileUpdate = false;
            this.stopTimer();
        }, err => {
            this.alertUtilService.showAlert(null, err);
        });
    }

    delPhoneNumber() {
        this.conditionValue.mobileUpdate = true;
        this.patientMoreInfo.phone = '';
        this.conditionValue.timer = false;
        this.conditionValue.mobileReadOnly = false;
        this.conditionValue.mobileAuthNum = false;
        this.conditionValue.mobileAuthYn = false;
        this.conditionValue.mobileConfirm = '';
        this.usrInfo.mobileNum = '';
        this.usrInfo.authNum = '';
        this.usrInfo.authYn = false;
    }


    userInfoValidation(type) {
        if (type === 'MOBILE') {
            if (this.usrInfo.mobileNum) {
                const validation = this.validationService.mobileCheckVal(this.usrInfo.mobileNum);
                if (validation.code === 0) {
                    this.errorMessage.mobile = '';
                    return true;
                } else {
                    this.errorMessage.mobile = validation.message;
                    return false;
                }
            } else {
                return false;
            }
        } else if (type === 'AUTH_NUM') {
            if (this.usrInfo.authNum) {
                if (this.usrInfo.authNum.length === 6) {
                    return true;
                }
            } else {
                return false;
            }
        }
    }

    // 입력창 유효성 검사
    checkInputVal(type) {
        this.validationService.checkInputVal(type, this.usrInfo[type]).then(res => {
            switch (type) {
                case 'birthday':
                    this.checkInputValMessage.birthday = !res.value ? res.message : '';
                    break;
                case 'password':
                    this.checkInputValMessage.password = !res.value ? res.message : '';
                    break;
                case 'passwordChk':
                    this.checkInputValMessage.passwordChk = !res.value ? res.message : '';
                    break;
                case 'loginId':
                    this.checkInputValMessage.loginId = !res.value ? res.message : '';
                    break;
                default:
                    break;
            }
        });

    }


    /*----------------------------------------------------------*/

    goBack() {
        if (this.infoPage === 1) {
            this.showConfirmAlert();
        } else {
            if (this.infoPage === 2) {
                if (this.conditionValue.mobileUpdate) {
                    this.alertUtilService.showAlert(null, '휴대폰 번호를 인증해주세요.');
                    return false;
                } else {
                    this.mindManager.setLockState(true);
                    this.infoPage--;
                }
            } else if (this.infoPage === 3) {
                this.mindManager.setLockState(false);
                this.infoPage--;
            } else if (this.infoPage === 5) {
                const subInfo = this.checkSelectIndex(null, 'DISEASE_LIST');
                if (subInfo === false) {
                    this.infoPage = this.infoPage - 2;
                } else {
                    this.infoPage--;
                }
            } else {
                this.infoPage--;
            }
        }
    }

    // 통합아이디 확인창
    async showConfirmAlert() {
        const alert = await this.alertCtrl.create({
            header: '알림',
            message: '추가정보를 저장하지 않고 종료하시겠습니까?',
            buttons: [
                {
                    text: '예',
                    handler: data => {
                        const lastUrl = this.pageInfoService.getToBack();
                        if (lastUrl) {
                            if (lastUrl.startsWith('/sign-up') || lastUrl.startsWith('/sns-sign-up') || lastUrl.startsWith('/platform-sign-up')) {
                                this.logout();
                            } else {
                                this.navController.navigateRoot([lastUrl]);
                            }
                        } else {
                            this.alertUtilService.showAlert(null, '이전 위치를 조회하는 도중 오류가 발생하였습니다.APP를 종료 후 다시 실행 시켜주세요.');
                        }
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

    logout() {
        const versionNumber = localStorage.getItem('versionNumber');
        const versionCode = localStorage.getItem('versionCode');
        const osType = localStorage.getItem('osType');
        const systemSetting = this.mindManager.getSystemInfo();
        const versionInfo = this.mindManager.getLastVersionInfo();
        systemSetting.autoLogin = false;
        this.mindManager.removeMemberToken();
        StorageUtil.clear();
        localStorage.setItem('versionNumber', versionNumber);
        localStorage.setItem('versionCode', versionCode);
        localStorage.setItem('osType', osType);
        this.mindManager.setLastVersionInfo(versionInfo);
        this.mindManager.setSystemInfo(systemSetting);
        this.mindManager.setLockState(false);
        this.pageInfoService.resetPageInfo([]).then(() => {
            this.navController.navigateRoot(['/login']);
        });
    }

    // maxlength 체크
    maxLengthCheck(type, maxlength) {
        if (this.patientMoreInfo[type]) {
            if (this.patientMoreInfo[type].toString().length > maxlength) {
                this.patientMoreInfo[type] = Number(this.patientMoreInfo[type].toString().slice(0, maxlength));
            }
        }
        console.log(this.patientMoreInfo[type]);
    }

}
