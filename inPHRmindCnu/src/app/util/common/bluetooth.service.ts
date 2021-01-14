import { Injectable } from '@angular/core';
import {BluetoothSdk} from './bluetooth.sdk';
import {DeviceModel} from '../../mind-module/model/device.model';
import {Platform} from '@ionic/angular';
import {BLE} from '@ionic-native/ble/ngx';
import {Observable} from 'rxjs';
import {ResponseCode, ResponseData} from '../../mind-module/data/response.data';
import {DeviceData} from '../../mind-module/data/device.data';
import {BaseDeviceController} from './base.device.controller';
import {BaseCtrlFactory} from '../../mind-module/bluetooth/base/base.ctrl.factory';
import {ActiveCtrlFactory} from '../../mind-module/bluetooth/active/active.ctrl.factory';

@Injectable({
  providedIn: 'root'
})
export class BluetoothService {
  // Bluetooth SDK
  private bluetoothSdk: BluetoothSdk;

  // Support Devices List
  private supportedDeviceList: Array<DeviceModel>;

  constructor(
      private platform: Platform,
      private ble: BLE
  ) {
    this.bluetoothSdk = new BluetoothSdk(platform, ble);
    this.supportedDeviceList = new Array();
  }

  // SET Server Registered Device List
  public setDevices(list) {
    this.supportedDeviceList = list;
  }

  public getDevices() {
    return this.supportedDeviceList;
  }

  // -----------------------------------------------------------------------------------
  // Bluetooth Device
  // -----------------------------------------------------------------------------------
  // Device Scan Start
  public startScan(time): Observable<ResponseData> {
    return new Observable<ResponseData>(observer => {
      this.bluetoothSdk.startScan(time).subscribe(data => {
        const response = new ResponseData();
        if (data.status === 'device') {
          const matchDevice = this.match(data);
          if (matchDevice) {
            response.data = matchDevice;
          }
        } else {
          response.data = data;
        }
        if (response.data) {
          observer.next(response);
        }
      }, err => {
        const response = new ResponseData();
        response.code = ResponseCode.error;
        response.data = err;
        observer.error(response);
      });
    });
  }

  public stopScan() {
    this.bluetoothSdk.stopScan().then(() => {
      console.log('stop scan');
    }).catch(err => {
      console.log('stop scan err => ', err);
    });
  }

  public connectDevice(deviceModel: DeviceModel): Observable<any> {
    return new Observable<any>(observer => {
      console.log('111')
      const controller = this.getDeviceCtrl(deviceModel);
      controller.connectDevice().subscribe(result => {
        console.log(result, 'result2')
        observer.next(result);
        observer.complete();
      }, err => {
        console.log(err, 'err')
        observer.error(err);
      });
    });
  }

  public disConnectDevice(deviceModel: DeviceModel) {
    this.bluetoothSdk.disConnect(deviceModel.address).then(() => {
      console.log('disconnect device');
    }).catch(err => {
      console.log('disconnect device err => ', err);
    });
  }

  // Get Health Data
  public getSyncData(deviceModel: DeviceModel): Observable<ResponseData> {
    return new Observable<ResponseData>(observer => {
      const contoller = this.getDeviceCtrl(deviceModel);
      contoller.syncData().subscribe(data => {
        console.log('syncData data', data);
        const response = new ResponseData();
        response.data = data;
        if (typeof data === 'boolean') {
          response.code = ResponseCode.ready;
        }
        observer.next(response);
      }, err => {
        const response = new ResponseData();
        response.code = ResponseCode.error;
        response.data = err;
        observer.error(response);
      });
    });
  }

  // Device Support check
  public isSupported(deviceData: DeviceData) {
    const match = this.match(deviceData);
    if (match.deviceCode !== '00000000') {
      return true;
    }
    return false;
  }

  public getDeviceModel(deviceData: DeviceData) {
    return this.match(deviceData);
  }

  // -----------------------------------------------------------------------------------
  // Controller
  // -----------------------------------------------------------------------------------
  // Get Device Controller
  public getDeviceCtrl(deviceModel: DeviceModel): BaseDeviceController {
    // Matching Deivce
    // let matchDevice = this.match(deviceData);
    console.log('222')
    const factory: BaseCtrlFactory = this.getContollerFactory(deviceModel);
    console.log('factory333', factory)
    console.log('333')
    let controller: BaseDeviceController = null;
    if (factory) {
      console.log('333333')
      console.log('factory', factory)
      controller = factory.getController(deviceModel);
    } else {
      return null;
    }
    console.log('controller', controller)
    // Setting Bluetooth SDK Init
    controller.setBleData(this.bluetoothSdk);
    console.log('666')
    // Setting Bluetooth Device Model
    controller.setDevice(deviceModel);
    return controller;
  }

  // Device registered on the server?
  private match(device: DeviceData) {
    let matchDevice: DeviceModel = null;
    this.supportedDeviceList.some(item => {
      const deUpperName = this.getUpperCaseTrim(device.name);
      const bleUpperName = this.getUpperCaseTrim(item.bluetoothName);
      if (deUpperName.indexOf(bleUpperName) > -1 || bleUpperName.indexOf(deUpperName) > -1) {
        matchDevice = item;
        return true;
      }
      return false;
    });

    // Set Device (Macaddress or UUID or ID)
    if (matchDevice) {
      matchDevice.address = device.address;
      matchDevice.name = device.name;
    }
    return matchDevice;
  }

  // Get Factory
  private getContollerFactory(deviceData): BaseCtrlFactory {
    console.log(deviceData)
    let factory: BaseCtrlFactory = null;
            switch (deviceData.lifelogTypeGrpCd) {
                case 'LIFELOG_GRP_HEALTH':
                    /*factory = new HealthCtrlFactory();*/
                    break;
                case 'LIFELOG_GRP_ACTIVE':
                    factory = new ActiveCtrlFactory();
                    break;
                case 'LIFELOG_GRP_FOOD':
                    /*factory = new FoodCtrlFactory();*/
                    break;
            }
    return factory;
  }

  private getUpperCaseTrim(str): string {
    return str.toUpperCase().replace(/(\s*)/g, '');
  }
}
