import {Injectable} from '@angular/core';
import {MemberModel} from './model/member.model';
import {SystemModel} from './model/system.model';
import {StorageUtil} from './util/storage.util';
import {CommonKey} from './common/common.key';
import {FCM} from '@ionic-native/fcm/ngx';
import {ResponseCode, ResponseData} from './data/response.data';
import {NaverCordovaSDK} from 'naver-sdk/ngx';
import {Observable} from 'rxjs';
import {DeviceModel} from './model/device.model';
import {BluetoothService} from '../util/common/bluetooth.service';
import {FitbitController} from './bluetooth/fitbit/fitbit.controller';
import {HttpClient} from '@angular/common/http';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {ProviderModel} from './model/provider.model';
import {AuthorizationData} from './data/authorization.data';
import {CredentialData} from './data/credential.data';
import {environment} from '../../environments/environment';
import {RestApiService} from './service/rest-api.service';
import {DateUtil} from '../util/common/date.util';
import {rejects} from 'assert';
import {
    AppleSignInErrorResponse,
    AppleSignInResponse,
    ASAuthorizationAppleIDRequest,
    SignInWithApple
} from '@ionic-native/sign-in-with-apple/ngx';
import MD5 from 'crypto-js';
import {AppleSignedUser} from './model/appleSignedUser.model';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {Facebook} from '@ionic-native/facebook/ngx';
import {PageInfoModel} from './model/pageInfo.model';

const CacheKeyNameAppleSign = 'APPLE_SIGNED_USER';

@Injectable()
export class MindManager {

    // 사용자 정보
    private memberModel: MemberModel;
    private memberToken: string;
    // 디바이스 정보
    private deviceInfo: any;
    // 시스템 설정 정보
    private systemSettingInfo: SystemModel;
    // 서버 버전 정보
    private serverAppVersion: any;
    // 사용자 잠금 패스워드
    private lockPw: any;
    // 선택 디바이스
    private deviceModel: DeviceModel;
    // 코드 리스트
    private codeList: any;
    // 모달 실행여부 정보
    private sideMenuOnOff: any;
    // 설문 정보
    private surveyDataInfo: any;
    // 자동로그인 안내 정보
    private autoLoginPopupInfo: any;


    private fitbitCtrl: FitbitController;
    private supportedPlatformList: Array<ProviderModel>;
    /*private memberModel: MemberModel;*/

    /*공통------------------------------------------------------*/
    // 페이지 정보
    private pageInfo: any;

    /*----------------------------------------------------------*/

    /*선영 추가--------------------------------------------------*/
    private diaryDateInfo: any;

    /*----------------------------------------------------------*/

    constructor(
        private fcm: FCM,
        private naver: NaverCordovaSDK,
        private bluetoothService: BluetoothService,
        private httpClient: HttpClient,
        private browser: InAppBrowser,
        private signInWithApple: SignInWithApple,
        private storage: NativeStorage,
        private fb: Facebook,
    ) {
        this.initManager();
        this.fitbitCtrl = new FitbitController(httpClient, browser);
    }

    // -----------------------------------------------------------------------------------
    // Init
    // -----------------------------------------------------------------------------------
    // Init Manager (순차처리 할려고 async 처리함)
    private async initManager() {
        console.log('================================================');
        console.log('============ Init mind manager ==============');
        console.log('================================================');
        // 로그인 사용자 체크
        const memberToken = StorageUtil.get(CommonKey.storagekeyMemberToken);
        console.log('test용 memberToken: ' + memberToken);
        // 디바이스 목록 조회
        /*const result = await this.getDeviceList();*/
        /*console.log(result, 'result');*/
        /*        if (result != null && result.resultCd === '0') {
                    //this.bluetoothManager.setDevices(result.bleDeviceVoList);
                }*/
        /*        // 헬스 플랫폼 목록 조회
                result = await this.commonService.getPlatformList();
                if (result != null && result.resultCd === '0') {
                    console.log(result);
                    console.log(result.healthProviderVoList);
                    this.platformManager.setPlatforms(result.healthProviderVoList);
                }
                // 헬스 플랫폼 클라이언트 설정
                if (environment.credentials != null) {
                    let credentialData = new CredentialData();
                    environment.credentials.forEach(item => {
                        credentialData = new CredentialData();
                        credentialData.clientId = item.clientId;
                        credentialData.appSecret = item.appSecret;
                        //console.log('================= credentialData', credentialData);
                        this.setCreadential(item.name, credentialData);
                    });
                }*/
    }

    /*
        // 디바이스 목록 조회
        getDeviceList(): Observable<any> {
            return this.restApiService.getDatas(environment.inPHRApi + '/api/device/device-total');
        }
    */

    // 시스템 설정
    public setSystemInfo(settingData) {
        this.systemSettingInfo = settingData;
        StorageUtil.set(CommonKey.storagekeySetting, settingData);
    }

    public getSystemInfo(): SystemModel {
        if (!this.systemSettingInfo) {
            this.systemSettingInfo = StorageUtil.get(CommonKey.storagekeySetting);
        }
        return this.systemSettingInfo;
    }

    // 사용자 정보
    public getMemberModel(): MemberModel {
        if (!this.memberModel) {
            this.memberModel = StorageUtil.get(environment.storagekeyMember);
        }
        return this.memberModel;
    }

    public setMemberModel(model) {
        this.memberModel = model;
        StorageUtil.set(environment.storagekeyMember, this.memberModel);
    }


    // 마지막 버전 정보
    public getLastVersionInfo(): any {
        return this.serverAppVersion;
    }

    public setLastVersionInfo(version) {
        this.serverAppVersion = version;
    }

    // 디바이스 정보
    public getDeviceInfo(): any {
        return this.deviceInfo;
    }

    public setDeviceInfo(device) {
        this.deviceInfo = device;
    }

    // 코드 리스트 정보
    public getCodeList(): any {
        return this.codeList;
    }

    public setCodeList(codeList) {
        this.codeList = codeList;
    }

    // 모달 정보
    public getModalONOff(): any {
        return this.sideMenuOnOff;
    }

    public setModalONOff(sideMenuOnOff) {
        this.sideMenuOnOff = sideMenuOnOff;
    }

    // 설문 정보
    public getSurveyData(): any {
        return this.surveyDataInfo;
    }

    public setSurveyData(surveyData) {
        this.surveyDataInfo = surveyData;
    }


    /*사용자 토큰------------------------------------------------------*/

    // 사용자 토큰
    public getMemberToken() {
        if (!this.memberToken) {
            this.memberToken = StorageUtil.get(CommonKey.storagekeyMemberToken);
        }
        return this.memberToken;
    }

    public setMemberToken(token) {
        this.memberToken = token;
        /*this.apiService.setMemberToken(token);*/
        StorageUtil.set(CommonKey.storagekeyMemberToken, this.memberToken);
    }

    public removeMemberToken() {
        this.memberToken = null;
    }
    /*------------------------------------------------------------------*/

    /*자동 로그인 안내------------------------------------------------------*/

    public getAutoLoginPopupInfo() {
        if (!this.autoLoginPopupInfo) {
            this.autoLoginPopupInfo = StorageUtil.get(CommonKey.storagekeyautoLoginPopup);
        }
        return this.autoLoginPopupInfo;
    }

    public setAutoLoginPopupInfo(popup) {
        this.autoLoginPopupInfo = popup;
        StorageUtil.set(CommonKey.storagekeyautoLoginPopup, this.autoLoginPopupInfo);
    }
    /*------------------------------------------------------------------*/


    /*잠금 패스워드------------------------------------------------------*/

    // 사용자 토큰
    public getLockPw() {
        if (!this.lockPw) {
            this.lockPw = StorageUtil.get(CommonKey.storagekeyLockPw);
        }
        return this.lockPw;
    }

    public setLockPw(password) {
        this.lockPw = password;
        StorageUtil.set(CommonKey.storagekeyLockPw, this.lockPw);
    }

    /*------------------------------------------------------------------*/

    /*SNS 로그인------------------------------------------------------*/

    // 페이스북 로그인
    async facebookLogin(): Promise<ResponseData> {

        const responseData = new ResponseData();
        return await new Promise((resolve, reject) => {
            // the permissions your facebook app needs from the user
            const permissions: any = ['public_profile', 'email'];

            this.fb.login(permissions)
                .then(async response => {

                    console.log('facebook login success..');
                    console.log(response);
                    responseData.code = ResponseCode.OK;

                    const snsInfo: any = {
                        accessToken : ''
                        , email: ''
                        , expiresAt: ''
                        , id: ''
                        , name: ''
                        , refreshToken: ''
                        , tokenType: ''
                        , snsType: ''
                    };


                    snsInfo.accessToken = response.authResponse.accessToken;

                    snsInfo.expiresAt = response.authResponse.expiresIn;
                    snsInfo.snsType = 'F';
                    snsInfo.id = response.authResponse.userID;
                    if ('email' in response) {
                        // snsInfo.email = response.email;
                    }

                    responseData.data = snsInfo;
                    // responseData.data.email = await this.facebookInfo();
                    resolve(responseData);
                }, error => {
                    console.log(error);
                    responseData.code = ResponseCode.BAD_REQUEST;
                    reject(responseData);
                });
        });
    }

    public facebookInfo(): Promise<string> {
        return this.fb.api('/me?fields=id,name,email', ['public_profile', 'email'])
            .then(profile => {
                console.log(profile.id + ' | ' + profile.name + ' | ' + profile.email + ' | ');
                return profile.email;
            }, error => {
                console.log(error);
                return error;
            });
    }


    // 네이버 로그인
    async naverLogin(): Promise<ResponseData> {
        const resData = new ResponseData();
        return new Promise((resolve, reject) => {
            this.naver.login()
                .then((response) => {
                    console.log(response, '서비스');
                    resData.code = ResponseCode.OK;
                    resData.data = response;
                    resolve(resData);
                }, (error) => {
                    console.log(error);
                    resData.code = ResponseCode.FAIL;
                    reject(resData);
                }).catch(error => {
                console.log(error);
            });
        });
    }

    // 애플 로그인
    appleLogin(): Promise<ResponseData> {
        const responseData = new ResponseData();
        return new Promise((resolve, reject) => {
            console.log('애플 로그인');
            this.signInWithApple.signin({
                requestedScopes: [
                    ASAuthorizationAppleIDRequest.ASAuthorizationScopeFullName,
                    ASAuthorizationAppleIDRequest.ASAuthorizationScopeEmail
                ]
            }).then((res: AppleSignInResponse) => {
                console.log(res);
                responseData.code = ResponseCode.OK;
                responseData.data = res;
                resolve(responseData);
            }).catch((error: AppleSignInErrorResponse) => {
                console.error(error);
                reject(error);
            });
        });
    }

    getHashedAppleUser(id: string): string {
        return MD5(id).toString();
    }

    saveAppleUserInfo(tid: string, data: AppleSignInResponse) {
        const store: AppleSignedUser = {
            userId: data.user,
            email: data.email,
            name: data.fullName
        };

        console.log('indexed' + CacheKeyNameAppleSign + tid);
        console.log(store);

        return this.storage.setItem(CacheKeyNameAppleSign + tid, store);
    }

    /*------------------------------------------------------------------*/


    // Bluetooth------------------------------------------------------*/

    // 디바이스 목록 반환
    public getSupportedDevices() {
        return this.bluetoothService.getDevices();
    }

    // Bluetooth Device Scan Start
    public startScan(time): Observable<ResponseData> {
        return new Observable<ResponseData>(observer => {
            /*            if (this.memberModel == null) {
                            observer.error('사용자 정보 없음');
                            return;
                        }*/
            this.bluetoothService.startScan(time).subscribe(obj => {
                if (obj.code === ResponseCode.OK) {
                    observer.next(obj);
                    if (obj.data.status === 'stop') {
                        observer.complete();
                    }
                }
            }, err => {
                observer.error(err);
            });
        });
    }

    public stopScan() {
        this.bluetoothService.stopScan();
    }

    // Bluetooth Device Connenct
    public connectDevice(deviceModel: DeviceModel): Observable<ResponseData> {
        return new Observable<ResponseData>(observer => {
            const response = new ResponseData();
            this.bluetoothService.connectDevice(deviceModel).subscribe(result => {
                console.log(result, 'result');
                if (!result) {
                    /*response.code = ResponseCode.fail;*/
                    observer.next(response);
                    observer.complete();
                    return;
                }
                const param = {
                    memberSeq: this.memberModel.memberSeqNo,
                    deviceCode: deviceModel.deviceCode,
                    uuid: this.deviceInfo.uuid,
                    macAddress: deviceModel.address
                };
                /*서비스 부분 생기고 없어져야함*/
                response.code = ResponseCode.OK;
                observer.next(response);
                observer.complete();
                /*---------------------------*/

                /*                this.memberService.saveDevice(param).then(res => {
                                  if (res.code == '0') {
                                    response.code = ResponseCode.ok;
                                  } else {
                                    response.code = res.code;
                                    response.message = res.message;
                                  }
                                  observer.next(response);
                                  observer.complete();
                                }, err => {
                                  observer.error(err);
                                });*/
            }, err => {
                observer.error(err);
            });
        });
    }

    public disConnectDevice(deviceModel: DeviceModel) {
        this.bluetoothService.disConnectDevice(deviceModel);
    }

    // Bluetooth Device Data Sync
    public getData(deviceModel: DeviceModel): Observable<ResponseData> {
        console.log('LifelogManager getData deviceModel => ', deviceModel);
        return new Observable<ResponseData>(observer => {
            this.bluetoothService.getSyncData(deviceModel).subscribe(result => {
                console.log('lifelogManager getData result => ', result);
                observer.next(result);
                // observer.complete();
            }, err => {
                observer.error(err);
            });
        });
    }

    /**
     * 디바이스 선택
     * @param device - 디바이스 정보
     */
    public setDevice(device: DeviceModel) {
        this.deviceModel = device;
    }


    /*------------------------------------------------------------------*/


    // -----------------------------------------------------------------------------------
    // Controller
    // -----------------------------------------------------------------------------------
    // Get Health Platform Controller
    public getController(providerName): any {
        providerName = providerName.toLowerCase();
        let controller = null;
        switch (providerName) {
            case 'samsung-health':
                /*controller = this.shealthCtrl;*/
                break;
            case 'fitbit':
                controller = this.fitbitCtrl;
                break;
            case 'apple-health':
                /*controller = this.appleCtrl;*/
                break;
            case 'misfit':
                /*controller = this.misfitCtrl;*/
                break;
            case 'googlefit':
                /*controller = this.googleCtrl;*/
                break;
        }
        return controller;
    }

    public setAuthorizationInfo(providerModel: ProviderModel, authorizationData: AuthorizationData) {
        const controller = this.getController(providerModel.providerName);
        if (controller != null) {
            controller.setAuthorization(authorizationData);
            return true;
        }
        return false;
    }


    // Fitbit
    // 헬스 플랫폼 인증
    public authHealthPlatform(providerModel: ProviderModel): Promise<any> {
        // providerModel.memberSeq = this.memberModel.memberSeq;
        providerModel.uuid = this.getDeviceInfo().uuid;
        return new Promise<any>(resolve => {
            const responseData = new ResponseData();
            console.log(providerModel, 'providerModel');
            // 헬스 플랫폼 연동 호출
            this.authorization(providerModel).subscribe(data => {
                console.log('LifelogManager authHealthPlatform data => ', data);
                if (data.code === ResponseCode.OK) {
                    providerModel.accessToken = data.data.accessToken;
                    providerModel.tokenType = data.data.tokenType;
                    providerModel.expiresIn = data.data.expiresIn;
                    providerModel.id = data.data.userId;

                    // 서버에 연동 정보 저장
                    // this.memberService.saveProvider(providerModel).then(result => {
                    //     if (result.code = '0') {
                    //         responseData.code = ResponseCode.ok;
                    //         // 계정 연동 후 동기화 진행
                    //         // zxthis.syncHealthPlatform(providerModel);
                    //     } else {
                    //         responseData.code = result.code;
                    //         responseData.message = result.message;
                    //     }
                    //     resolve(responseData);
                    // }).catch(err => {
                    //     responseData.code = ResponseCode.error;
                    //     responseData.message = err;
                    //     resolve(responseData);
                    // });

                    // 서버에 저장하지 않고 로컬에 저장
                    responseData.code = ResponseCode.OK;
                    responseData.data = data;
                    resolve(responseData);
                } else {
                    resolve(data);
                }
            }, err => {
                console.log('LifelogManager authHealthPlatform err => ', err);
                responseData.code = ResponseCode.error;
                responseData.message = err;
                resolve(responseData);
            });
        });
    }

    // 헬스 플랫폼 동기화 (대상 하나)
    public syncHealthPlatform(providerModel: ProviderModel): Promise<ResponseData> {
        return new Promise<ResponseData>(resolve => {
            const response = new ResponseData();

/*            // 마지막 동기화 일자 없을 경우 당일 시작일시로 설정하여 동기화 진행
            if (providerModel.lastSyncDt == null || providerModel.lastSyncDt === '') {
                providerModel.lastSyncDt = DateUtil.getTodayStart();
            }

            const lastSyncDt = DateUtil.getToday();*/
            this.synchronization(providerModel).subscribe(data => {
                console.log('================================================================');
                console.log('LIFELOG SYNC PROVIDER => ', providerModel.providerName);
                console.log('LIFELOG SYNC DATA => ', data);
                console.log('================================================================');
                // 데이터가 있을 경우 라이프로그 동기화
                // 데이터 없을 경우 마지막 동기화 일자만 업데이트
                response.code = ResponseCode.OK;
                response.data = data;
                console.log(data, 'response.data = data;')

                resolve(response);
            }, err => {
                response.code = ResponseCode.error;
                response.message = err.messgae;
                response.data = err;
                resolve(response);
            });
        });
    }

    /*------------------------------------------------------------------*/

    // -----------------------------------------------------------------------------------
    // Health Platform
    // -----------------------------------------------------------------------------------
    // Health Platform set creadential
    public setCreadential(providerName, credentialData: CredentialData) {
        if (providerName === 'fitbit') {
            const controller = this.getController(providerName);
            controller.setCreadential(credentialData);
        }
    }

    // Auth Health Platform
    public authorization(providerModel: ProviderModel): Observable<ResponseData> {
        return new Observable<ResponseData>(observer => {
            console.log(providerModel.providerName, 'providerModel.providerName');
            const controller = this.getController(providerModel.providerName);
            console.log(controller, 'controller');
            if (controller == null) {
                const response = new ResponseData();
                response.code = ResponseCode.FAIL;
                response.message = 'Not Controller';
                observer.next(response);
                observer.complete();
                return;
            }
            console.log('ddd');
            controller.authorization().subscribe(data => {
                if (data.code === ResponseCode.OK) {
                    console.log(data.data, 'data.data');
                    controller.setAuthorization(data.data);
                }
                observer.next(data);
                observer.complete();
            }, err => {
                observer.error(err);
            });
        });
    }

    // Health Platform synchronization
    public synchronization(providerModel: ProviderModel): Observable<any> {
        return new Observable<any>(observer => {
            const controller = this.getController(providerModel.providerName);
            // 이미 동기화 중인지 체크
            if (controller.isSynchronization()) {
                observer.error('이미 동기화 진행중');
            } else {
                controller.synchronization(providerModel).subscribe(data => {
                    observer.next(data);
                    observer.complete();
                }, err => {
                    observer.error(err);
                });
            }
        });
    }


    // -----------------------------------------------------------------------------------
    // Controller
    // -----------------------------------------------------------------------------------
    // Get Health Platform Controller
    /*
        public getController(providerName): any {
            providerName = providerName.toLowerCase();
            let controller = null;
            if (providerName === 'fitbit') {
                controller = this.fitbitCtrl;
            }
            return controller;
        }

        public setAuthorizationInfo(providerModel: ProviderModel, authorizationData: AuthorizationData) {
            const controller = this.getController(providerModel.providerName);
            if (controller != null) {
                controller.setAuthorization(authorizationData);
                return true;
            }
            return false;
        }
    */

    // -----------------------------------------------------------------------------------
    // Setter/Getter
    // -----------------------------------------------------------------------------------
    // SET Server Registered Device List
    public setPlatforms(list) {
        this.supportedPlatformList = list;
    }

    public getPlatforms() {
        return this.supportedPlatformList;
    }

    // -----------------------------------------------------------------------------------
    // Health Platform Manager Wrapper
    // -----------------------------------------------------------------------------------
    // 플랫폼 목록 반환
    public getSupportedPlatforms() {
        const list = new Array();
        const item: any = {
            providerName: 'fitbit',
            imgPath: 'assets/image/provider/fitbit.png'
        };
        list.push(item);
        return list;
    }

    /*공통------------------------------------------------------*/

    // 페이지 정보
    public getPageInfo(): any {
        if (!this.pageInfo) {
            this.pageInfo = StorageUtil.get(CommonKey.storagekeyPageInfo);
        }
        return this.pageInfo;
    }

    public setPageInfo(PageInfoVo) {
        this.pageInfo = PageInfoVo;
        StorageUtil.set(CommonKey.storagekeyPageInfo, PageInfoVo);
    }


    // 잠금 상태
    public getLockState(): any {
        const lockState = StorageUtil.get(CommonKey.storagekeyLockState);
        return lockState;
    }

    public setLockState(type) {
        StorageUtil.set(CommonKey.storagekeyLockState, type);
    }


    /*------------------------------------------------------------------*/
    /*선영 추가-----------------------------------------------------------*/
    // 선택 날짜 정보
    public getDateBinding(): any {
        return this.diaryDateInfo;
    }

    public setDateBinding(date) {
        this.diaryDateInfo = date;
    }
    /*------------------------------------------------------------------*/

}
