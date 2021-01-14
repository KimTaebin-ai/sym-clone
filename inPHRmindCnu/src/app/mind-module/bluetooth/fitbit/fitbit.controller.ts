/**
 * Fitbit
 * site: https://dev.fitbit.com
 *
 * Application PHIS-Lifelog
 * OAuth 2.0 ClientId: 22CZPM
 * Client Secret: 0638aa5afbaad38106dd720b61b4a1f2
 * Callback URL(RedirectUri): http://localhost
 * OAuth 2.0: Authorize URI: https://www.fitbit.com/oauth2/authorize
 * OAuth 2.0: Access/Refresh Token Request UrI: https://api.fitbit.com/oauth2/token
 *
 * ResponseType: token
 *  Code, Token
 *
 * ExpiresIn: 31536000 Defaults 86400
 *  86400 for 1 day
 *  604800 for 1 week
 *  2592000 for 30 days
 *  31536000 for 1 year
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BasePlatformController} from '../base/base.platform.controller';
import {StorageUtil} from '../../util/storage.util';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {ResponseCode, ResponseData} from '../../data/response.data';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import {AuthorizationData} from '../../data/authorization.data';
import {ProviderModel} from '../../model/provider.model';
import {DateUtil} from '../../../util/common/date.util';
import {StepModel} from '../../model/step.model';
import {LifelogHeaderModel} from '../../model/lifelog.header.model';
import {LifelogModel} from '../../model/lifelog.model';
import {PulseModel} from '../../model/pulse.model';
import {ExerciseModel} from '../../model/exercise.model';
import {SleepModel, SleepStageModel} from '../../model/sleep.model';
import {WeightModel} from '../../model/weight.model';
import {WeightUtil} from '../../../util/common/weight.util';
import * as moment from 'moment';

export class FitbitController extends BasePlatformController {

    // API Base
    private apiRoot = 'https://api.fitbit.com';
    private authorizeUri = 'https://www.fitbit.com/oauth2/authorize';
    private redirectUri = 'http://localhost';

    // API Endpoint
    private endpoint = {
        // summary: "/1/user/:userId/activities/date/:date.json",
        activityLogs: '/1/user/:userId/activities/list.json?afterDate=:startDate&sort=:sort&offset=:offset&limit=:limit',
        /*sleepLogs: '/1/user/:userId/sleep/date/:startDate.json',*/
        // sleepLogs: '/1.2/user/:userId/sleep/date/:startDate/:endDate.json',
        sleepLogs: '/1.2/user/:userId/sleep/date/2020-11-02/2020-12-20.json',
        /*steps: '/1.2/user/:userId/activities/steps/date/today/1d/1min.json',*/
        /*steps: '/1.2/user/:userId/activities/steps/date/2020-11-01/2020-12-20.json',*/
        steps: '/1.2/user/:userId/activities/steps/date/:startDate/1d/15min.json',
        stepList: '/1/user/:userId/activities/steps/date/:startDate/:endDate.json',
        heartRateList: '/1/user/:userId/activities/heart/date/:startDate/:endDate.json',
        heartRates: '/1/user/:userId/activities/heart/date/2020-12-10/1d/15min.json',
        /*heartRates: '/1/user/:userId/activities/heart/date/today/1d/1sec/time/00:00/00:01.json',*/
        weight: '/1/user/:userId/body/log/weight/date/:startDate.json'
    };

    private memberModel;

    constructor(
        private httpClient: HttpClient,
        private inAppbrowser: InAppBrowser
    ) {
        super();

        this.memberModel = StorageUtil.get(environment.storagekeyMember);
    }

    // -------------------------------------------------------------------------------------
    // Override Function
    // -------------------------------------------------------------------------------------
    // Authorization
    public authorization(): Observable<ResponseData> {
        return new Observable<any>(observer => {
            const responseData = new ResponseData();
            responseData.code = ResponseCode.OK;
            console.log(this.authorizationData, 'authorizationData')
            // Check AuthorizationData
            if (this.authorizationData) {
                responseData.code = ResponseCode.OK;
                responseData.data = this.authorizationData;
                observer.next(responseData);
                observer.complete();
                return;
            }

            // Client Data Validataion
            const valid = this.validCredential();
            console.log(valid)
            if (valid !== '') {
                responseData.code = ResponseCode.FAIL;
                responseData.message = valid;
                observer.next(responseData);
                observer.complete();
                return;
            }
            // Create Authorization URL
            let url = this.authorizeUri;
            url += '?response_type=token';
            url += '&client_id=' + this.credentialData.clientId;
            url += '&redirect_uri=' + encodeURIComponent(this.redirectUri);
            url += '&scope=activity%20heartrate%20location%20nutrition%20sleep%20weight';
            url += '&expires_in=31536000';
            console.log(url, 'url')
            // Request Authorization URL
            const target = '_blank'; // self, system, blank
            const options: InAppBrowserOptions = {
                location: 'no',
                clearcache: 'yes',
                clearsessioncache: 'yes',
                toolbar: 'no',
                footer: 'no',
                zoom: 'no',
                hardwareback: 'no'
            };
            const browser = this.inAppbrowser.create(url, target, options);
            browser.on('loadstart').subscribe(event => {
                if (event.url.indexOf(this.redirectUri) > -1) {
                    const responData = event.url.split('#')[1].split('&');
                    const authorizationData = new AuthorizationData();
                    authorizationData.accessToken = responData[0].split('=')[1];
                    authorizationData.userId = responData[1].split('=')[1];
                    const scope = responData[2].split('=')[1];
                    authorizationData.scope = scope.split('+');
                    authorizationData.tokenType = responData[3].split('=')[1];
                    authorizationData.expiresIn = responData[4].split('=')[1];
                    responseData.code = ResponseCode.OK;
                    responseData.data = authorizationData;
                    observer.next(responseData);
                    observer.complete();
                    browser.close();
                }
            });
            browser.on('loaderror').subscribe(event => {
                if (event.code === -6) {
                    if (event.url.indexOf(this.redirectUri) > -1) {
                        return;
                    }
                }
                responseData.code = ResponseCode.error;
                responseData.message = event.message;
                responseData.data = event;
                observer.error(responseData);
            });
            // browser.on('exit').subscribe(event => {
            //     if(this.authorizationData != null){
            //         responseData.code = ResponseCode.ok;
            //         responseData.data = this.authorizationData;
            //     } else {
            //         responseData.code = ResponseCode.fail;
            //         responseData.data = "계정 연동이 취소되었습니다.";
            //     }
            //     observer.next(responseData);
            //     observer.complete();
            // });
            browser.show();
        });
    }

    // synchronization
    public synchronization(providerModel: ProviderModel): Observable<any> {
        return new Observable<any>(observer => {
            this.syncProvider = providerModel;
            let startDate = providerModel.lastSyncDt;
            console.log(this.syncProvider, 'this.syncProvider')
            console.log(providerModel, 'providerModel')
            console.log(startDate, 'startDate')
            // 마지막 동기화  일자부터7일 이상 차이날 경우
            // 오늘 일자로부터 7일전 데이터만 동기화 진행 (fitbit request limit로 인한 제한)
            const diffDays = DateUtil.diffDay(startDate, new Date()) + 1;
            if (diffDays > 7) {
                startDate = DateUtil.minusDays(new Date(), 7);
            }

            let count = 0;
            let ingCount = -1;
            let totalMergeArray = new Array();
            const interval = setInterval(() => {
                if (count === diffDays) {
                    this.syncProvider = null;
                    observer.next(totalMergeArray);
                    observer.complete();
                    clearInterval(interval);
                } else if (count > ingCount) {
                    ingCount = count;
                    const searchDate = {
                        startDate: providerModel.startDate,
                        endDate: providerModel.endDate
                    }
                    /*const searchDate = DateUtil.addDays(startDate, ingCount).split(' ').join('T');*/
                    Promise.all([
                        // 발걸음, 혈압의 Intraday Time Series가 개인용앱에서만 가져오게 되어 있어서 동기화 안함
                        // 종합데이터밖에 안들어옴, 핏빗쪽에 데이터 접근권한 요청함

                        // 2020.07.16 Jaewoo
                        // Intraday data가 들어오지 않아 마지막 데이터 가져오는 부분도 처리 되도록 수정.
                        this.getStepTimeSeries(searchDate),
                        this.getHeartRateTimeSeries(searchDate),
                        //this.getActivityLogs(searchDate),
                        this.getSleepLogs(searchDate),
                        //this.getWeightLogs(searchDate)
                    ]).then(values => {
                        let mergeArray = new Array();
                        if (values != null) {
                            values.forEach(item => {
                                if (item != null && item.length > 0) {
                                    mergeArray = mergeArray.concat(item);
                                }
                            });
                        }
                        totalMergeArray = totalMergeArray.concat(mergeArray);
                        count++;
                    });
                }
            }, 1000);
        });
    }

    // -------------------------------------------------------------------------------------
    // Function
    // -------------------------------------------------------------------------------------
    /**
     * User get heath data
     * @param resource summary, activityLogs, sleepLogs, steps, heartRates
     * @param params { date, sort, offset, limit }
     */
    private getResource(resource, params): Promise<ResponseData> {
        return new Promise<ResponseData>((resolve, reject) => {
            const responseData = new ResponseData();

            if (params == null) {
                responseData.code = ResponseCode.FAIL;
                responseData.message = 'No params';
                reject(responseData);
            }

            let requestUrl = this.apiRoot + this.endpoint[resource];
            console.log(resource , 'resource')
            console.log(requestUrl , 'requestUrl')

            requestUrl = requestUrl.replace(':userId', this.authorizationData.userId);
            if (params.startDate) {
                requestUrl = requestUrl.replace(':startDate', params.startDate);
            }
             if (params.endDate) {
                 requestUrl = requestUrl.replace(':endDate', params.endDate);
            }
            if (params.sort) {
                requestUrl = requestUrl.replace(':sort', params.sort);
            }
            if (params.offset) {
                requestUrl = requestUrl.replace(':offset', params.offset);
            }
            if (params.limit) {
                requestUrl = requestUrl.replace(':limit', params.limit);
            }
            // if (params.startTime) {
            //     requestUrl = requestUrl.replace(":startTime", params.startTime);
            // }
            // if (params.endTime) {
            //     requestUrl = requestUrl.replace(":endTime", params.endTime);
            // }

            const options = {
                headers: new HttpHeaders({
                    Authorization : this.authorizationData.tokenType + ' ' + this.authorizationData.accessToken
                })
            };

            this.httpClient.get(requestUrl, options).subscribe(obj => {
                responseData.code = ResponseCode.OK;
                responseData.message = 'ok';
                responseData.data = obj;
                resolve(responseData);
            }, err => {
                responseData.code = ResponseCode.error;
                responseData.data = err;
                if (err.status === 429) {
                    if (err.error.errors[0].message === 'Too Many Requests') {
                        responseData.message = '요청 리미티 초과';
                    }
                } else {
                    responseData.message = err.message;
                }
                resolve(responseData);
            });
        });
    }

    // -------------------------------------------------------------------------------------
    // Get Health Data
    // -------------------------------------------------------------------------------------
    // 활동 종합 (사용안함)
    // public getActivitySummary(searchDate): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         let params = {
    //             date: searchDate
    //         };
    //         this.getResource("summary", params).then(data => {
    //             resolve(data);
    //         });
    //     });
    // }

    // 발걸음
    public getStepTimeSeries(searchDate): Promise<any> {
        return new Promise<any>((resolve, reject) => {
/*            const params = {
                startDate: DateUtil.convertFormat(searchDate.startDate, 'YYYY-MM-DD')
            };*/

            // ----------------
            const stepData: any = {};
            let requestUrl = this.apiRoot + this.endpoint.stepList;
            requestUrl = requestUrl.replace(':userId', this.authorizationData.userId);
            if (searchDate.startDate) {
                requestUrl = requestUrl.replace(':startDate', DateUtil.convertFormat(searchDate.startDate, 'YYYY-MM-DD'));
            }
            if (searchDate.endDate) {
                requestUrl = requestUrl.replace(':endDate', DateUtil.convertFormat(searchDate.endDate, 'YYYY-MM-DD'));
            }
            const options = {
                headers: new HttpHeaders({
                    Authorization : this.authorizationData.tokenType + ' ' + this.authorizationData.accessToken
                })
            };

            this.httpClient.get(requestUrl, options).subscribe(obj => {
                console.log(obj)
                const items = [];
                const sleepData: any = {};
                if (obj['activities-steps']) {
                    for (const item of obj['activities-steps']) {
                        console.log(item)
                        if (item.value !== '0') {
                            items.push(item.dateTime);
                        }
                    }
                }
                if (items.length > 0) {
                    sleepData.startDate = searchDate.startDate;
                    sleepData.endDate = searchDate.endDate;
                    sleepData.lifelogTypeCd = 'LIFELOG_TYPE_STP';
                    sleepData.data = [];
                    for (const item of items) {
                        const params = {
                            startDate: DateUtil.convertFormat(item, 'YYYY-MM-DD')
                        };
                        this.getResource('steps', params).then(data => {
                            console.log('########### getStepTimeSeries data => ', data);
                            /*const list = new Array();*/
                            if (data.code === ResponseCode.OK) {
                                if (data.data != null) {
                                    const infos = data.data['activities-steps-intraday'].dataset;
                                    if (infos != null || infos.length > 0) {
                                        sleepData.data.push(data.data);
                                    }
                                }
                            }
                        });
                    }
                }
                console.log('sleepData = ', sleepData)
                resolve(sleepData);
            }, err => {
                const sleepData: any = {};
                resolve(sleepData);
            });
            
            // ----------------
            
            
        });
    }

    // 심박
    public getHeartRateTimeSeries(searchDate): Promise<any> {
        return new Promise<any>((resolve, reject) => {
 /*           const params = {
                /!*startDate: DateUtil.convertFormat(searchDate.startDate, 'YYYY-MM-DD')*!/
                startDate: searchDate.startDate,
                /!*startDate: DateUtil.convertFormat(new Date('2020-12-01T09:09:09'), 'YYYY-MM-DDTHH:mm:ss'),*!/
                endDate: searchDate.endDate,
            };
            this.getResource('heartRates', params).then(data => {
                console.log('getHeartRateTimeSeries data => ', data);
                const list = new Array();
                if (data.code === ResponseCode.OK) {
                    if (data.data == null) {
                        resolve(list);
                        return;
                    }

                    const infos = data.data['activities-heart'];
                    if (infos == null || infos.length <= 0) {
                        resolve(list);
                        return;
                    }
                    console.log(infos[0].value, 'infos[0].value')
                    if (infos[0].value && infos[0].value.heartRateZones){
                        const value = infos[0].value.heartRateZones;
                        const model = new PulseModel();
                        if (value) {
                            model.pulse = value;

                            // Lifelog Insert Data Generate
                            const lifelogModel = new LifelogModel();
                            const HeaderModel = new LifelogHeaderModel();
                            HeaderModel.memberSeq = this.syncProvider.memberSeq;
                            HeaderModel.unit = 'bpm';
                            HeaderModel.lifelogTypeGrpCd = 'LIFELOG_GRP_HEALTH';
                            HeaderModel.lifelogTypeCd = 'LIFELOG_TYPE_PUS';
                            HeaderModel.measureDt = DateUtil.convertFormat(new Date()); // 현재 시간
                            HeaderModel.measureType = 'ACCOUNT';
                            HeaderModel.deviceCode = '';
                            HeaderModel.providerCode = this.syncProvider.providerCode;
                            lifelogModel.header = HeaderModel;
                            lifelogModel.detail = model;
                            list.push(lifelogModel);
                        }
                    }


/!*                    const dateTime = infos[0].dateTime;
                    if (data.data['activities-heart-intraday']) {
                        const dataset = data.data['activities-heart-intraday'].dataset;
                        dataset.forEach(item => {
                            const model = new PulseModel();
                            if (item.value !== 0) {
                                // 1분단위로 쌓을 경우 너무 많은 데이터가 쌓임
                                // 15분 단위로 저장 (조회시 설정 안됨)
                                const split = item.time.split(':');
                                if (split[1] === '00' || split[1] === '15' || split[1] === '30' || split[1] === '45') {
                                    model.pulse = item.value;

                                    // Lifelog Insert Data Generate
                                    const lifelogModel = new LifelogModel();
                                    const HeaderModel = new LifelogHeaderModel();
                                    HeaderModel.memberSeq = this.syncProvider.memberSeq;
                                    HeaderModel.unit = 'bpm';
                                    HeaderModel.lifelogTypeGrpCd = 'LIFELOG_GRP_HEALTH';
                                    HeaderModel.lifelogTypeCd = 'LIFELOG_TYPE_PUS';
                                    HeaderModel.measureDt = DateUtil.convertFormat(new Date(dateTime + ' ' + item.time));
                                    HeaderModel.measureType = 'ACCOUNT';
                                    HeaderModel.deviceCode = '';
                                    HeaderModel.providerCode = this.syncProvider.providerCode;
                                    lifelogModel.header = HeaderModel;
                                    lifelogModel.detail = model;
                                    list.push(lifelogModel);
                                }
                            }
                        });
                    }else{
                        if (infos[0].value && infos[0].value.restingHeartRate){
                            const value = infos[0].value.restingHeartRate;
                            const model = new PulseModel();
                            if (value) {
                                model.pulse = value;

                                // Lifelog Insert Data Generate
                                const lifelogModel = new LifelogModel();
                                const HeaderModel = new LifelogHeaderModel();
                                HeaderModel.memberSeq = this.syncProvider.memberSeq;
                                HeaderModel.unit = 'bpm';
                                HeaderModel.lifelogTypeGrpCd = 'LIFELOG_GRP_HEALTH';
                                HeaderModel.lifelogTypeCd = 'LIFELOG_TYPE_PUS';
                                HeaderModel.measureDt = DateUtil.convertFormat(new Date()); // 현재 시간
                                HeaderModel.measureType = 'ACCOUNT';
                                HeaderModel.deviceCode = '';
                                HeaderModel.providerCode = this.syncProvider.providerCode;
                                lifelogModel.header = HeaderModel;
                                lifelogModel.detail = model;
                                list.push(lifelogModel);
                            }
                        }
                    }*!/

                }
                console.log(list)
                resolve(list);
            });
*/

            const stepData: any = {};
            let requestUrl = this.apiRoot + this.endpoint.heartRateList;
            requestUrl = requestUrl.replace(':userId', this.authorizationData.userId);
            if (searchDate.startDate) {
                requestUrl = requestUrl.replace(':startDate', DateUtil.convertFormat(searchDate.startDate, 'YYYY-MM-DD'));
            }
            if (searchDate.endDate) {
                requestUrl = requestUrl.replace(':endDate', DateUtil.convertFormat(searchDate.endDate, 'YYYY-MM-DD'));
            }
            const options = {
                headers: new HttpHeaders({
                    Authorization : this.authorizationData.tokenType + ' ' + this.authorizationData.accessToken
                })
            };

            this.httpClient.get(requestUrl, options).subscribe(obj => {
                console.log('ob = ', obj)
                const items = [];
                const sleepData: any = {};
                if (obj['activities-heart']) {
                    for (const item of obj['activities-heart']) {
                        console.log(item)
                        if (Object.keys(item.value).includes('restingHeartRate')) {
                            items.push(item.dateTime);
                        }
                    }
                }
                if (items.length > 0) {
                    sleepData.startDate = searchDate.startDate;
                    sleepData.endDate = searchDate.endDate;
                    sleepData.lifelogTypeCd = 'LIFELOG_TYPE_PUS';
                    sleepData.data = [];
                    for (const item of items) {
                        const params = {
                            startDate: DateUtil.convertFormat(item, 'YYYY-MM-DD')
                        };
                        this.getResource('heartRates', params).then(data => {
                            console.log('########### getHeartRatesTimeSeries data => ', data);
                            /*const list = new Array();*/
                            if (data.code === ResponseCode.OK) {
                                if (data.data != null) {
                                    const infos = data.data['activities-heart-intraday'].dataset;
                                    if (infos != null || infos.length > 0) {
                                        sleepData.data.push(data.data);
                                    }
                                }
                            }
                        });
                    }
                }
                console.log('sleepData = ', sleepData)
                resolve(sleepData);
            }, err => {
                const sleepData: any = {};
                resolve(sleepData);
            });
        });
    }

    // 활동 로그
    public getActivityLogs(searchDate): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const params = {
                startDate: DateUtil.convertFormat(searchDate.startDate, 'YYYY-MM-DDTHH:mm:ss'),
                sort: 'asc',
                offset: '0',
                limit: '100'
            };
            this.getResource('activityLogs', params).then(data => {
                console.log('getActivityLogs data => ', data);
                const list = new Array();
                if (data.code === ResponseCode.OK) {
                    if (data.data == null) {
                        resolve(list);
                        return;
                    }

                    const activities = data.data.activities;
                    if (activities == null || activities.length <= 0) {
                        resolve(list);
                        return;
                    }

                    activities.forEach(item => {
                        if (item.activeDuration > 0) {
                            const model = new ExerciseModel();
                            model.time = Math.round((item.activeDuration / 1000) / 60);

                            // Lifelog Insert Data Generate
                            const lifelogModel = new LifelogModel();
                            const HeaderModel = new LifelogHeaderModel();
                            HeaderModel.memberSeq = this.syncProvider.memberSeq;
                            HeaderModel.unit = 'time';
                            HeaderModel.lifelogTypeGrpCd = 'LIFELOG_GRP_ACTIVE';
                            HeaderModel.lifelogTypeCd = this.getActivityName(item.activityTypeId);
                            HeaderModel.measureDt = DateUtil.convertFormat(new Date(item.startTime));
                            HeaderModel.measureType = 'ACCOUNT';
                            HeaderModel.deviceCode = '';
                            HeaderModel.providerCode = this.syncProvider.providerCode;
                            lifelogModel.header = HeaderModel;
                            lifelogModel.detail = model;
                            list.push(lifelogModel);
                        }
                    });
                }
                resolve(list);
            });
        });
    }
    // 수면 로그
    public getSleepLogs(searchDate): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const params = {
                startDate: searchDate.startDate,
                /*startDate: DateUtil.convertFormat(new Date('2020-12-01T09:09:09'), 'YYYY-MM-DDTHH:mm:ss'),*/
                endDate: searchDate.endDate,
            };
            console.log('asdfasdfdsfas => ', params.startDate);
            this.getResource('sleepLogs', params).then(data => {
                console.log('getSleepLogs data => ', data);
                const sleepData: any = {};
                if (data.code === ResponseCode.OK) {
                    if (data.data == null) {
                        resolve(sleepData);
                        return;
                    }
                    const sleep = data.data.sleep;
                    if (sleep == null || sleep.length <= 0) {
                        resolve(sleepData);
                        return;
                    }
                    sleepData.startDate = searchDate.startDate;
                    sleepData.endDate = searchDate.endDate;
                    sleepData.data = sleep;
                    console.log(sleepData);
                    resolve(sleep);
                } else {
                    resolve(sleepData);
                    return;
                }
/*                const list = new Array();
                if (data.code === ResponseCode.OK) {
                    if (data.data == null) {
                        resolve(list);
                        return;
                    }
                    const sleep = data.data.sleep;
                    if (sleep == null || sleep.length <= 0) {
                        resolve(list);
                        return;
                    }

                    sleep.forEach(item => {
/!*                        const model = new SleepModel();
                        model.startTime = DateUtil.convertFormat(new Date(item.startTime));
                        model.endTime = DateUtil.convertFormat(new Date(item.endTime));*!/
                        console.log(item, 'item')
                        if (item.levels != null) {
                            /!*const stages = new Array();*!/
                            if (item.levels.data != null && item.levels.data.length > 0) {
                                for (const i in item.levels.data) {
                                    if (item.type === 'stages') {
                                        const sleepData: any = {
                                            startDt: '',
                                            endDt: '',
                                            lifelogType: 'LIFELOG_TYPE_SLP',
                                            lifelogValueType: '',
                                            regType: 'D'
                                        }
                                        sleepData.startDt = moment(item.levels.data[i].dateTime).format('YYYY-MM-DD HH:mm:ss');
                                        sleepData.lifelogValueType = item.levels.data[i].level;
                                        if ((item.levels.data.length - 1) === Number(i)) {
                                            sleepData.endDt = moment(item.endTime).format('YYYY-MM-DD HH:mm:ss');
                                        } else {
                                            sleepData.endDt = moment(item.levels.data[Number(i) + 1].dateTime).format('YYYY-MM-DD HH:mm:ss');
                                        }
                                        list.push(sleepData);
                                    } else {
                                        const sleepData: any = {
                                            startDt: item.startTime,
                                            endDt: item.endTime,
                                            lifelogType: 'LIFELOG_TYPE_SLP',
                                            regType: 'M'
                                        }
                                        list.push(sleepData);
                                    }
                                }
/!*                                item.levels.data.forEach(item => {
                                    const stage = new SleepStageModel();
                                    stage.startTime = DateUtil.convertFormat(new Date(item.dateTime));
                                    stage.endTime = DateUtil.addSeconds(new Date(item.dateTime), item.seconds);
                                    stage.stage = this.getStage(item.level);
                                    stages.push(stage);
                                });*!/
                            }
/!*                            if (item.levels.shortData != null && item.levels.shortData.length > 0) {
                                item.levels.shortData.forEach(item => {
                                    const stage = new SleepStageModel();
                                    stage.startTime = DateUtil.convertFormat(new Date(item.dateTime));
                                    stage.endTime = DateUtil.addSeconds(new Date(item.dateTime), item.seconds);

                                    stage.stage = this.getStage(item.level);
                                    stages.push(stage);
                                });
                            }

                            if (stages.length > 1) {
                                stages.sort((a, b) => {
                                    return DateUtil.compareAfter(a.startTime, b.startTime) ? 1 : -1;
                                });
                            }
                            model.stages = stages;*!/
                        }



/!*                        // Lifelog Insert Data Generate
                        const lifelogModel = new LifelogModel();
                        const HeaderModel = new LifelogHeaderModel();
                        HeaderModel.memberSeq = this.syncProvider.memberSeq;
                        HeaderModel.unit = 'time';
                        HeaderModel.lifelogTypeGrpCd = 'LIFELOG_GRP_ACTIVE';
                        HeaderModel.lifelogTypeCd = 'LIFELOG_TYPE_SLP';
                        HeaderModel.measureDt = model.endTime;
                        HeaderModel.measureType = 'ACCOUNT';
                        HeaderModel.deviceCode = '';
                        HeaderModel.providerCode = this.syncProvider.providerCode;
                        lifelogModel.header = HeaderModel;
                        lifelogModel.detail = model;
                        list.push(lifelogModel);*!/
                    });
                }
                console.log(list);
                resolve(list);*/
            });
        });
    }

    // 체중
    public getWeightLogs(startDate): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const params = {
                startDate: DateUtil.convertFormat(startDate, 'YYYY-MM-DD')
            };
            this.getResource('weight', params).then(data => {
                console.log('getWeightLogs data => ', data);
                const list = new Array();
                if (data.code === ResponseCode.OK) {
                    if (data.data == null) {
                        resolve(list);
                        return;
                    }
                    const weights = data.data.weight;
                    if (weights == null || weights.length <= 0) {
                        resolve(list);
                        return;
                    }
                    weights.forEach(item => {
                        const model = new WeightModel();
                        if (item.weight != null) {
                            if (this.memberModel == null) {
                                this.memberModel = StorageUtil.get(environment.storagekeyMember);
                            }

                            // 성별 설정
                            // 성별이 설정 안되어 있을 경우 남자로 설정
                            let gender;
                            if (this.memberModel) {
                                gender = this.memberModel.gender;
                                if (gender == null) {
                                    gender = '1';
                                } else {
                                    if (gender === 'M') {
                                        gender = '1';
                                    } else {
                                        gender = '2';
                                    }
                                }
                            } else {
                                gender = '1';
                            }

                            // 키 설정
                            // 키 설정이 안되어 있을 경우 한국 평균 키로 설정
                            let height;
                            if (this.memberModel) {
                                height = this.memberModel.height;
                                if (height == null) {
                                    height = WeightUtil.getAvgrageHeight(gender);
                                }
                            } else {
                                height = WeightUtil.getAvgrageHeight(gender);
                            }

                            // 만나이 설정
                            let yyyy;
                            if (this.memberModel) {
                                yyyy = DateUtil.convertFormat(this.memberModel.birthday, 'YYYY');
                            } else {
                                // 생일 설정 안되어있는경우
                                yyyy = 1990;
                            }

                            const age = Number(DateUtil.getToday('YYYY')) - Number(yyyy);

                            model.weight = item.weight.toFixed(1);
                            model.bmi = item.bmi != null ? item.bmi.toFixed(1) : WeightUtil.getBmi(model.weight, height);
                            model.bodyFat = item.fat != null ? item.fat.toFixed(1) : WeightUtil.getBodyFat(gender, model.weight, height);
                            model.bodyWater = WeightUtil.getWater(model.bodyFat);
                            model.bodyMuscle = WeightUtil.getBodyMuscle(model.bodyFat, gender);
                            model.boneMess = WeightUtil.getBoneMass(model.bodyMuscle, gender, model.weight, height);
                            model.skeletonMuscleMass = WeightUtil.getSkeletonMuscleMass(model.bodyMuscle);
                            model.bmr = WeightUtil.getBmr(gender, model.weight, height, age);

                            // Lifelog Insert Data Generate
                            const lifelogModel = new LifelogModel();
                            const HeaderModel = new LifelogHeaderModel();
                            HeaderModel.memberSeq = this.syncProvider.memberSeq;
                            HeaderModel.unit = 'kg';
                            HeaderModel.lifelogTypeGrpCd = 'LIFELOG_GRP_HEALTH';
                            HeaderModel.lifelogTypeCd = 'LIFELOG_TYPE_BDW';
                            HeaderModel.measureDt = DateUtil.convertFormat(new Date(item.date + ' ' + item.time));
                            HeaderModel.measureType = 'ACCOUNT';
                            HeaderModel.deviceCode = '';
                            HeaderModel.providerCode = this.syncProvider.providerCode;
                            lifelogModel.header = HeaderModel;
                            lifelogModel.detail = model;
                            list.push(lifelogModel);
                        }
                    });
                }
                resolve(list);
            });
        });
    }

    private getActivityName(id) {
        let activityName = 'LIFELOG_TYPE_SPT'; // 운동
        switch (id) {
            case 15030: // 배드민턴
            case 15020:
                activityName = 'LIFELOG_TYPE_BMT';
                break;
            case 15040: // 농구
            case 15050:
            case 15060:
            case 15070:
            case 15075:
                activityName = 'LIFELOG_TYPE_BKB';
                break;
            case 90001: // 사이클
                activityName = 'LIFELOG_TYPE_CYC';
                break;
            case 3031: // 댄스
                activityName = 'LIFELOG_TYPE_DAN';
                break;
            case 15210: // 축구
            case 15230:
            case 15235:
                activityName = 'LIFELOG_TYPE_FTB';
                break;
            case 17080: // 하이킹
                activityName = 'LIFELOG_TYPE_HIK';
                break;
            case 15550: // 줄넘기
            case 15551:
            case 15552:
                activityName = 'LIFELOG_TYPE_HPR';
                break;
            case 32: // 필라테스
            case 53001:
            case 53002:
            case 53003:
                activityName = 'LIFELOG_TYPE_PLT';
                break;
            case 23: // 달리기
            case 12140:
            case 12170:
            case 12180:
            case 12190:
            case 90009:
                activityName = 'LIFELOG_TYPE_RUN';
                break;
            case 90024: // 수영
            case 18230:
            case 18250:
            case 18260:
            case 18270:
            case 18280:
            case 18290:
            case 18300:
            case 18310:
            case 18320:
            case 18330:
            case 18340:
            case 18350:
                activityName = 'LIFELOG_TYPE_SWM';
                break;
            case 90013: // 걷기
            case 17160:
            case 17260:
            case 17150:
            case 27:
                activityName = 'LIFELOG_TYPE_WAL';
                break;
            case 52001: // 요가
            case 52002:
            case 52003:
            case 52004:
            case 52005:
            case 31:
                activityName = 'LIFELOG_TYPE_YOG';
                break;
        }
        return activityName;
    }

    // 수면 상태
    private getStage(stage) {
        switch (stage) {
            case 'awake':
            case 'wake':
                stage = 'wake';
                break;
            case 'light':
            case 'restless':
                stage = 'sleep';
                break;
            case 'asleep':
            case 'deep':
            case 'rem':
                stage = 'deep';
                break;
        }
        return stage;
    }
}
