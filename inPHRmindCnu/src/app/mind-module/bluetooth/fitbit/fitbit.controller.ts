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
        sleepLogs: '/1.2/user/:userId/sleep/date/:startDate.json',
        // sleepLogs: '/1.2/user/:userId/sleep/date/:startDate/:endDate.json',
        // sleepLogs: '/1.2/user/:userId/sleep/date/2020-11-02/2020-12-20.json',
        /*steps: '/1.2/user/:userId/activities/steps/date/today/1d/1min.json',*/
        /*steps: '/1.2/user/:userId/activities/steps/date/2020-11-01/2020-12-20.json',*/
        steps: '/1.2/user/:userId/activities/steps/date/:startDate/1d/1min.json',
        stepList: '/1/user/:userId/activities/steps/date/:startDate/:endDate.json',
        heartRateList: '/1/user/:userId/activities/heart/date/:startDate/:endDate.json',
        heartRates: '/1/user/:userId/activities/heart/date/:startDate/1d/1min.json',
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

            let count = 0;
            const data: any = {
                step: {},
                pulse: {},
                sleep: {}
            }
            const interval = setInterval(() => {
                if (count === 1) {
                    console.log(2)
                    this.syncProvider = null;
                    console.log(data, 'FITBIT 데이터 data');
                    observer.next(data);
                    observer.complete();
                    clearInterval(interval);
                } else if (count === 0) {
                    console.log(1)
                    const searchDate = {
                        startDate: providerModel.startDate,
                        endDate: providerModel.endDate
                    };
                    Promise.all([
                        // 발걸음, 혈압의 Intraday Time Series가 개인용앱에서만 가져오게 되어 있어서 동기화 안함
                        // 종합데이터밖에 안들어옴, 핏빗쪽에 데이터 접근권한 요청함
                        this.getStepTimeSeries(searchDate),
                        this.getHeartRateTimeSeries(searchDate),
                        this.getSleepLogs(searchDate),
                    ]).then(values => {
                        if (values != null && values.length > 0) {
                            console.log('데이터 있음');
                            console.log(values, 'FITBIT 데이터');

                            for (const item of values) {
                                console.log(item.lifelogTypeCd)
                                if (item.lifelogTypeCd === 'STEP') {
                                    console.log(1111111111111111111111)
                                    console.log(item.data.length)
                                    console.log(item)
                                    data.step = item.data ? item : {};
                                    console.log(data)
                                } else if (item.lifelogTypeCd === 'SLEEP') {
                                    console.log(222222222222222)
                                    data.sleep = item.data ? item : {};
                                } else if (item.lifelogTypeCd === 'PULSE') {
                                    console.log(3333333333333333)
                                    data.pulse = item.data ? item : {};
                                }
                            }
                            console.log(data, '데이터');
                        }
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

    // 발걸음
    public getStepTimeSeries(searchDate): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const stepData: any = {};
            const items = [];
/*            const days = moment.duration(searchDate.endDate.diff(searchDate.startDate)).asDays()
            for (let i = 0; i < days; i++) {
                items.push(moment(searchDate.endDate).subtract(i, 'd').format('YYYY-MM-DD'));
            }*/
            for (let i = 0; i < 7; i++) {
                items.push(moment(searchDate.endDate).subtract(i, 'd').format('YYYY-MM-DD'));
            }
            if (items.length > 0) {
                stepData.startDate = searchDate.startDate;
                stepData.endDate = searchDate.endDate;
                stepData.lifelogTypeCd = 'STEP';
                stepData.data = [];
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
                                    stepData.data.push(data.data);
                                }
                            }
                        }
                    });
                }
            }
            console.log('stepData = ', stepData)
            resolve(stepData);
        });
    }

    // 심박
    public getHeartRateTimeSeries(searchDate): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const items = [];
            for (let i = 0; i < 7; i++) {
                items.push(moment(searchDate.endDate).subtract(i, 'd').format('YYYY-MM-DD'));
            }
            const pulseData: any = {};
            if (items.length > 0) {
                pulseData.startDate = searchDate.startDate;
                pulseData.endDate = searchDate.endDate;
                pulseData.lifelogTypeCd = 'PULSE';
                pulseData.data = [];
                for (const item of items) {
                    const params = {
                        startDate: DateUtil.convertFormat(item, 'YYYY-MM-DD')
                    };
                    this.getResource('heartRates', params).then(data => {
                        console.log('########### getPulse data => ', data);
                        /*const list = new Array();*/
                        if (data.code === ResponseCode.OK) {
                            if (data.data != null) {
                                console.log(data.data)
                                const infos = data.data['activities-heart-intraday'].dataset;
                                if (infos != null || infos.length > 0) {
                                    pulseData.data.push(data.data);
                                }
                            }
                        }
                    });
                }
            }
            console.log('pulseData = ', pulseData)
            resolve(pulseData);
        });
    }

    // 수면 로그
    public getSleepLogs(searchDate): Promise<any> {
        return new Promise<any>((resolve, reject) => {

            const items = [];
            const sleepData: any = {};
            for (let i = 0; i < 7; i++) {
                items.push(moment(searchDate.endDate).subtract(i, 'd').format('YYYY-MM-DD'));
            }
            sleepData.startDate = searchDate.startDate;
            sleepData.endDate = searchDate.endDate;
            sleepData.lifelogTypeCd = 'SLEEP';
            sleepData.data = [];
            for (const item of items) {
                const params = {
                    startDate: DateUtil.convertFormat(item, 'YYYY-MM-DD')
                };
                this.getResource('sleepLogs', params).then(data => {
                    console.log('########### sleepLogs data => ', data);
                    /*const list = new Array();*/
                    if (data.code === ResponseCode.OK) {
                        if (data.data != null) {
                            console.log(data.data)
                            const infos = data.data['sleep'];
                            if (infos != null || infos.length > 0) {
                                sleepData.data.push(data.data);
                            }
                        }
                    }
                });
            }
            resolve(sleepData);
    });
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
