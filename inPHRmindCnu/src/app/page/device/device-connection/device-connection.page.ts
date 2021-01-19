import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {Health} from '@ionic-native/health/ngx';
import {LifelogService} from '../../../mind-module/service/lifelog.service';
import {ResponseCode} from '../../../mind-module/data/response.data';
import {MindManager} from '../../../mind-module/mind.manager';
import {Toast} from '@ionic-native/toast/ngx';
import {LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-device-connection',
  templateUrl: './device-connection.page.html',
  styleUrls: ['./device-connection.page.scss'],
})
export class DeviceConnectionPage implements OnInit {

  /*미밴드*/
  stepList: any = [];
  heartRate: any = [];
  sleepList: any = [];


  /*FITBIT*/
  fitbitInfo: any = {};

  constructor(
      private health: Health,
      private lifelogService: LifelogService,
      private mindManager: MindManager,
      private toastUtil: Toast,
      private loadingController: LoadingController,
  ) { }

  ngOnInit() {
  }


  // 디바이스 동기화
  sendDevice(data, type) {
    const reqVo: any = {
      deviceType: type,
      data
    };
    this.lifelogService.setDeviceInfo(reqVo).subscribe(res => {
      console.log();
    }, err => {

    });
  }



  // ------------------------------------------------------------------------------------
  // 미밴드
  // ------------------------------------------------------------------------------------
  miband() {
    this.health.isAvailable()
        .then((available: boolean) => {
          this.health.requestAuthorization([
            'distance',
            'nutrition',
            'activity',
            {
              read: ['steps', 'height', 'weight', 'heart_rate', 'activity']
            },
          ])
              .then((res) => {
                Promise.all([
                  // 발걸음, 혈압의 Intraday Time Series가 개인용앱에서만 가져오게 되어 있어서 동기화 안함
                  // 종합데이터밖에 안들어옴, 핏빗쪽에 데이터 접근권한 요청함
                  this.getStepsFromMiBand(),
                  this.getHeartRateFromMiBand(),
                  this.getSleepFromMiBand(),
                ]).then(values => {
                  alert(values)
                  if (values && values.length > 0) {
                    const data: any = {
                      sleep: {},
                      pulse: {},
                      step: {}
                    }
                    for (const item of values) {
                      if (item.lifelogTypeCd === 'STEP') {
                        data.step = item.data.length > 0 ? item.data : {};
                      } else if (item.lifelogTypeCd === 'SLEEP') {
                        data.sleep = item.data.length > 0 ? item.data : {};
                      } else if (item.lifelogTypeCd === 'PULSE') {
                        data.pulse = item.data.length > 0 ? item.data : {};
                      }
                    }
                    this.sendDevice(data, 'MIBAND');
                  } else {
                    alert('데이터 없음');
                  }
                });
                alert(JSON.stringify(res));

              })
              .catch((e) => alert(JSON.stringify(e)));
        });
  }

  // 수면 (미밴드)
  getSleepFromMiBand(): Promise<any> {
    return new Promise<any>((resolve) => {
      const startDt = moment('2020-11-01', 'YYYYMMDD').valueOf();
      this.health.query({
        // startDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000),
        startDate: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
        endDate: new Date(), // now
        // filtered: true,
        dataType: 'activity'
      })
          .then(res => {
            alert(JSON.stringify(res))
            const resultData: any = res;
            const data: any = {
              lifelogTypeCd : 'SLEEP',
              data : res
            }
            resolve(data);
          })
          .catch(e => {
            resolve(
                {
                  lifelogTypeCd : 'SLEEP',
                  data : []
                }
            );
          });
    });
  }

  // 심박수 (미밴드)
  getHeartRateFromMiBand(): Promise<any> {
    return new Promise<any>((resolve) => {
        const startDt = moment('2020-11-01', 'YYYYMMDD').valueOf();
        this.health.query({
            // startDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000),
        startDate: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
        endDate: new Date(), // now
        // filtered: true,
        dataType: 'heart_rate'
      })
          .then(res => {
            alert(JSON.stringify(res))
            const resultData: any = res;
            const data: any = {
              lifelogTypeCd : 'PULSE',
              data : res
            }
            resolve(data);
          })
          .catch(e => {
            resolve(
                {
                  lifelogTypeCd : 'PULSE',
                  data : []
                }
            );
          });
    });
  }

  // 걸음수 (미밴드)
  getStepsFromMiBand(): Promise<any> {
    return new Promise<any>((resolve) => {
      const startDt = moment('2020-11-20').format('YYYY-MM-DD') + ' 00:00:00';
      this.health.query({
        /*startDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000),*/
        startDate: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
        endDate: new Date(), // now
        // filtered: true,
        dataType: 'steps'
      })
          .then(res => {
            alert(JSON.stringify(res))
            const resultData: any = res;
            const data: any = {
              lifelogTypeCd : 'STEP',
              data : res
            }
            resolve(data);
          })
          .catch(e => {
            resolve(
        {
                lifelogTypeCd : 'STEP',
                data : []
              }
            );
          });
    });
  }

  // ------------------------------------------------------------------------------------
  // Fitbit
  // ------------------------------------------------------------------------------------

  onAuthEvent() {
    const item: any = this.fitbitInfo;
    item.memberSeq = 0;
    const message = item.providerName + ' 연동을 진행하시겠습니까?';

    this.mindManager.authHealthPlatform(item).then(async result => {
      console.log('============ authHealthPlatform:', result);
      if (result.code === ResponseCode.OK) {
        // 최초 연동시 계정 동기화
        await this.syncFitbit();
        // this.updatePlatformList();
        this.toastUtil.show('연동 완료되었습니다.', '5000', 'center');
      } else {
        this.toastUtil.show('연동 중 오류가 발생되었습니다. 다시 시도해 주십시오.', '5000', 'center');
      }
    }).catch(err => {
      this.toastUtil.show('연동 중 오류가 발생되었습니다. 다시 시도해 주십시오.', '5000', 'center');
    });
  }

  async syncFitbit() {
    const provider = this.fitbitInfo;
    provider.startDate = '2020-11-15';
    provider.endDate = '2020-12-20';
    // provider.memberSeq = this.mindManager.getgetMemberModel().inphrMemberSeqNo;

    /*    await loading.present();*/

    this.mindManager.syncHealthPlatform(provider).then(res => {
      console.log(res, 'resrser')
      if (res.code === ResponseCode.OK) {
        console.log(res.code, 'res.code')
        console.log(res.data, 'res.data')
        if (res.data && 0 < res.data.length) {
          this.sendDevice(res.data, 'FITBIT');
        } else {
        }
      } else {
        this.toastUtil.show('연동 중 오류가 발생되었습니다. 다시 시도해 주십시오.', '5000', 'center');
      }
    }).finally(async () => {
      await this.loadingController.dismiss();
    });
  }

}
