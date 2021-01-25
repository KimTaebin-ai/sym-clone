import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {DeviceMotion, DeviceMotionAccelerationData} from '@ionic-native/device-motion/ngx';
import {Sensors} from '@ionic-native/sensors/ngx';
import {BleManager} from '../../../../util/common/ble.manager';
import {BLE} from '@ionic-native/ble/ngx';
import {Observable, Subject} from 'rxjs';
import {ResponseCode, ResponseData} from '../../../../mind-module/data/response.data';
import {DeviceModel} from '../../../../mind-module/model/device.model';
import {BluetoothManager} from '../../../../mind-module/bluetooth/bluetooth.manager';
import {MemberModel} from '../../../../mind-module/model/member.model';
import {MindManager} from '../../../../mind-module/mind.manager';
import {takeUntil} from 'rxjs/operators';
import {ProviderModel} from '../../../../mind-module/model/provider.model';
import {PlatformService} from '../../../../mind-module/service/platform.service';
import {environment} from '../../../../../environments/environment';
import {CredentialData} from '../../../../mind-module/data/credential.data';
import {Toast} from '@ionic-native/toast/ngx';
import {LifelogModel} from '../../../../mind-module/model/lifelog.model';
import {StepModel} from '../../../../mind-module/model/step.model';
import {LoadingController} from '@ionic/angular';
import {Health} from '@ionic-native/health/ngx';
import {HealthKit, HealthKitOptions} from '@ionic-native/health-kit/ngx';
import * as moment from 'moment';
import {CommonUtilService} from '../../../../util/common/common-util.service';
import {LoadingService} from '../../../../util/loading.service';
import {PatientSurveyService} from '../../../../mind-module/service/patient-survey.service';
import {LifelogService} from '../../../../mind-module/service/lifelog.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  light = 0;
  devices = [];
  fitbitInfo: any = {};

  testInfo: any = {
    step: {},
    health: {},
    pus: {},
    sleep: {}
  }

  testOb: any = {
    a: {
      b: {
        d: 'dd'
      },
      c: {
        d: 'dd'
      }
    },
    b: {
      dd: 'dd'
    }
  };

  stepList: any = [];
  heartRate: any = [];
  sleepList: any = [];
  private bluetoothManager: BluetoothManager;
  private memberModel: MemberModel;
  constructor(
      public deviceMotion: DeviceMotion,
      private sensors: Sensors,
      private bleManager: BleManager,
      private ble: BLE,
      private ngZone: NgZone,
      private mindManager: MindManager,
      private platformService: PlatformService,
      private toastUtil: Toast,
      private loadingController: LoadingController,
      private cd: ChangeDetectorRef,
      private health: Health,
      private healthKit: HealthKit,
      private commonUtillService: CommonUtilService,
      private loadingService: LoadingService,
      private surveyService: PatientSurveyService,
      private lifelogService: LifelogService
  ) {}

  ngOnInit(): void {

    //this.test();

/*    this.platformService.getDeviceList().subscribe(res => {
      console.log(res)
    });*/

    this.platformService.getPlatformList().subscribe(res => {
      console.log(res)
      for (let i = 0; i < res.healthProviderVoList.length; i++) {
        if (res.healthProviderVoList[i].providerName === 'fitbit') {
          this.fitbitInfo = res.healthProviderVoList[i];
        }
      }
    });

    // 헬스 플랫폼 클라이언트 설정
    if (environment.credentials != null) {
      let credentialData = new CredentialData();
      environment.credentials.forEach(item => {
        credentialData = new CredentialData();
        credentialData.clientId = item.clientId;
        credentialData.appSecret = item.appSecret;
        console.log('================= credentialData', credentialData);
        this.setCreadential(item.name, credentialData);
      });
    }
  }

  // 헬스 플랫폼(fitbit, misfit) 인증 정보 등록
  private setCreadential(providerName, credentialData: CredentialData) {
    this.platformService.setCreadential(providerName, credentialData);
  }


  // BLE
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  startScan() {
    console.log(DeviceModel, 'DeviceModel')
    this.devices = [];
    this.mindManager.startScan(10 /*Timeout seconds*/).subscribe((obs) => {
      // 측정 가능한 디바이스 목록
        console.log(obs, 'data')
      // devices 저장
      this.devices = obs.data.data;
      /*
      this.ngZone.run(() => {
        this.devices.push(obs.data as DeviceModel);
      });
      this.checkError('NOT_ERROR');
*/

    }, error => {
      this.checkError('ERROR');
    });
  }

  checkError(error) {
   /* if (error == 'NOT_ERROR') {
      if (this.devices.length > 0) {
        this.test.findedBle = 'Y';
        this.test.loading = 'N';
        this.test.findingBle = 'N';
        this.refresh();
      }
    } else {
      this.test.scannig = 'N';
      this.test.loading = 'N';
      this.test.findingBle = 'N';
      this.test.findedBle = 'N';
      this.refresh();
    }*/
  }

  connectDevice(deviceModel, device) {
    deviceModel.lifelogTypeGrpCd = 'LIFELOG_GRP_ACTIVE';
    deviceModel.lifelogTypeCd = 'LIFELOG_TYPE_STP'
    this.mindManager.setDevice(deviceModel);
    this.mindManager.connectDevice(deviceModel).subscribe(obs => {
          // 디바이스 연결
          console.log('################ connect device1:', obs);
          /*this.test.loading = 'N';
          this.test.scannig = 'N';
          this.test.selectedDevice = device;
          this.refresh();*/
        }, error => {
          console.log('################ connect device2:', error);
          this.devices = this.devices.filter(dev => dev.address !== error.id);
        });
  }


  mibandTest() {
/*    alert('ddddㄴ')
    this.health.isAvailable()
        .then((available:boolean) => {
          console.log(available);
          this.health.requestAuthorization([
            'distance', 'nutrition',  //read and write permissions
            {
              read: ['steps']       //read only permission
            }
          ])
              .then(res => {
                    console.log('미밴드 5 : ', res);
                    alert(JSON.stringify(res));
                    /!*this.testInfo = res;*!/
                    this.getMiBandData();
              }
              )
              .catch(e => console.log('미밴드 5 연동 오류: ', e));
        })
        .catch(e => console.log('미밴드 5 연동 오류2: ', e));*/
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
                  if (values && values.length > 0) {
                  } else {
                    alert('데이터 없음');
                  }
                });
                alert(JSON.stringify(res));

              })
              .catch((e) => alert(JSON.stringify(e)));
        });

/*          this.health.queryAggregated({
            startDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000),
            endDate: new Date(), // now
            dataType: 'steps',
            bucket: 'day'*/

/*          console.log(available);
          this.health.requestAuthorization([
            'distance', 'nutrition',  //read and write permissions
            {
              read: ['steps']       //read only permission
            }
          ])
              .then(res => {
                    console.log('미밴드 5 : ', res);
                    alert(JSON.stringify(res));
                    this.getMiBandData();
                  }
              )
              .catch(e => console.log('미밴드 5 연동 오류: ', e));
        })
        .catch(e => console.log('미밴드 5 연동 오류2: ', e));*/
    /*if (this.health.isAuthorized(['steps'])) {
      console.log('Already Authorised');
      this.health.requestAuthorization([
        'distance',
        'nutrition',
        {
          read: ['steps', 'height', 'weight'],
          write: ['height', 'weight'],
        },
      ])
          .then((res) => alert(JSON.stringify(res)))
          .catch((e) => alert(JSON.stringify(e)))
      alert(1)
      this.health.queryAggregated({
        startDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000),
        endDate: new Date(), // now
        dataType: 'steps',
        bucket: 'day'
      })
          .then(res => alert(JSON.stringify(res)))
          .catch(e => alert(JSON.stringify(e)));
    } else {
      alert(2)
      this.health
          .requestAuthorization([
            'distance',
            'nutrition',
            {
              read: ['steps'],
              write: ['height', 'weight'],
            },
          ])
          .then((res) => alert(JSON.stringify(res)))
          .catch((e) => alert(JSON.stringify(e)));
    }
*/
  }

  getHeartRateFromMiBand(): Promise<any> {
    return new Promise<any>((resolve) => {
      const startDt = moment('2020-11-20').format('YYYY-MM-DD') + ' 00:00:00';
      this.health.query({
        startDate: new Date(startDt),
        endDate: new Date(), // now
        filtered: true,
        dataType: 'heart_rate'
      })
          .then(res => {
            alert(JSON.stringify(res));

            const resultData: any = {};
            if (resultData.length > 0) {
              for (let i = 0; i < resultData.length; i++) {
                resultData[i].startDate = moment(res[i].startDate).format('YYYY-MM-DD HH:mm:ss');
                resultData[i].endDate = moment(res[i].endDate).format('YYYY-MM-DD HH:mm:ss');
              }
            }
            this.heartRate = resultData;
            resolve({pulse: resultData});
          })
          .catch(e => {
            resolve({pulse: {}});
          });
    });
  }
  getSleepFromMiBand(): Promise<any> {
    return new Promise<any>((resolve) => {
      const startDt = moment('2020-11-01').format('YYYY-MM-DD');
      alert(startDt)
      alert(new Date(startDt))
      this.health.query({
        startDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000),
        /*startDate: new Date(startDt),*/
        endDate: new Date(), // now
        filtered: true,
        dataType: 'activity'/*,
            bucket: 'day'*/
      })
          .then(res => {
            alert(JSON.stringify(res));
            const resultData: any = res;
            if (resultData.length > 0) {
              for (let i = 0; i < resultData.length; i++) {
                resultData[i].startDate = moment(res[i].startDate).format('YYYY-MM-DD HH:mm:ss');
                resultData[i].endDate = moment(res[i].endDate).format('YYYY-MM-DD HH:mm:ss');
              }
            }
            resolve({sleep: resultData});
          })
          .catch(e => {
            resolve({sleep: {}});
          });
    });
  }
  getStepsFromMiBand(): Promise<any> {
    return new Promise<any>((resolve) => {
      const startDt = moment('2020-11-20').format('YYYY-MM-DD') + ' 00:00:00';
      this.health.query({
          /*startDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000),*/
          startDate: new Date(startDt),
          endDate: new Date(), // now
          filtered: true,
          dataType: 'steps'/*,
              bucket: 'day'*/
        })
            .then(res => {
              alert(JSON.stringify(res));
              const resultData: any = res;
              if (resultData.length > 0){
                for (let i = 0; i < resultData.length; i++) {
                  resultData[i].startDate = moment(res[i].startDate).format('YYYY-MM-DD HH:mm:ss');
                  resultData[i].endDate = moment(res[i].endDate).format('YYYY-MM-DD HH:mm:ss');
                }
              }
              resolve({step: resultData});
            })
            .catch(e => {
              resolve({step: {}});
            });
      });
  }

  getMiBandData() {
    if (this.health.isAuthorized(['steps'])) {
      console.log('Already Authorised');
      this.health.requestAuthorization([
        'distance',
        'nutrition',
        {
          read: ['steps', 'height', 'weight'],
          write: ['height', 'weight'],
        },
      ])
          .then((res) => alert(JSON.stringify(res)))
          .catch((e) => alert(JSON.stringify(e)))

      this.health.queryAggregated({
        startDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000),
        endDate: new Date(), // now
        dataType: 'steps',
        bucket: 'day'
      })
          .then(res => alert(JSON.stringify(res)))
          .catch(e => alert(JSON.stringify(e)));
    } else {
      this.health
          .requestAuthorization([
            'distance',
            'nutrition',
            {
              read: ['steps'],
              write: ['height', 'weight'],
            },
          ])
          .then((res) => alert(JSON.stringify(res)))
          .catch((e) => alert(JSON.stringify(e)));
    }


    if (this.health.isAuthorized(['steps'])) {
      alert(JSON.stringify(this.health.isAuthorized(['height', 'weight', 'blood_glucose', 'blood_pressure', 'steps'])));
    }
    this.health.isAuthorized([ 'height', 'weight', 'blood_glucose', 'blood_pressure', 'steps' ]).then((data) => {
      alert(JSON.stringify(data));
    });

/*    this.healthKit.available().then(available => {
      alert(available);
      if (available) {
        const option: HealthKitOptions = {
          readTypes: ['HKQuantityTypeIdentifierStepCount']
        };
        this.healthKit.requestAuthorization(option).then(res => {
          alert(JSON.stringify(res));
        });
      }
    }, err => {
      alert(err);
    });*/
  }



  // ------------------------------------------------------------------------------------
  // Event Function
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
    provider.startDate = '2020-11-10';
    provider.endDate = '2020-12-14';
    // provider.memberSeq = this.mindManager.getgetMemberModel().inphrMemberSeqNo;

    /*    await loading.present();*/

    this.mindManager.syncHealthPlatform(provider).then(res => {
      console.log(res, 'resrser')
      if (res.code === ResponseCode.OK) {
        console.log(res.code, 'res.code');
        console.log(res.data, 'res.data');
        this.sendDevice(res.data, 'FITBIT');
      } else {
        this.toastUtil.show('연동 중 오류가 발생되었습니다. 다시 시도해 주십시오.', '5000', 'center');
      }
    }).finally(async () => {
      await this.loadingController.dismiss();
    });
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

  /*setData(data: any) {
    if (this.lifeType == 'BT') {
      // 체온
      this.test.lifelogData = Number(data.temperature);
      this.btReqVo.measurementDate = data.dateTime;
      this.refresh();
    } else if (this.lifeType == 'WEIGHT') {
      // 체중
      this.test.lifelogData = Number(data.weight);
      this.weightReqVo.measurementDate = data.dateTime;
      this.refresh();
    } else if (this.lifeType === 'STEP') {
      // 최소값이 0보다는 커야만 정상적으로 조회된 것으로 취급한다.
      this.test.lifelogData = Math.max((data as StepModel).step, 1);
      this.test.findedBle = 'Y';
      this.refresh();
    }
    // 측정시간
    const time = data.dateTime;
    this.commonLog.log('weight&time:', this.test.lifelogData, time);
    this.test.scannig = 'N';
    this.test.loading = 'N';
    this.refresh();
  }*/
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



















/*  test2() {
    this.ble.startScan([]).subscribe(obj => {
      console.log(obj)
      if (obj.name !== undefined) {
        const data: any = {
          name: obj.name,
          id: obj.id
        }
        this.devices.push(data);

      }
      console.log(obj.name)
    }, err => {
      console.log(err);
    });


    this.bleManager.startScan(500).subscribe((obs) => {
      console.log(obs)
    });
  }

  connectDevice(data) {
    this.ble.connect(data.id).subscribe(res => {
      console.log(res)
    });
  }

  onDeviceDiscovered(res) {
    this.ngZone.run(() => {
      this.devices.push(res);
      console.log(res);
    });
  }*/

  // 조도센서 테스트
  test(): any {
    let sum = 0;
    let count = 0;

    const lightSensor = setInterval(() => {
      this.loadingService.showLoading(true, '조도를 측정하는 중입니다.</br>잠시만 기다려주세요.');
      this.sensors.enableSensor('LIGHT');
      const dd = this.sensors.getState();
      dd.then(res => {
        if (res) {
          this.light = res[0];
          sum = sum + Number(res);
          count++;
          console.log(sum)
          console.log(count)
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
        alert(res);
      }, err => {
        alert(err);
      })
      alert('측정된 조도값은 : ' + aug + ' 입니다.');
    });

  }

}
