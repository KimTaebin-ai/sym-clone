import { Platform } from '@ionic/angular';
import { BLE } from '@ionic-native/ble/ngx';
import {BluetoothSdk} from '../../util/common/bluetooth.sdk';
import {DeviceModel} from '../model/device.model';
import {Observable} from 'rxjs';
import {ResponseCode, ResponseData} from '../data/response.data';
import {DeviceData} from '../data/device.data';
import {BaseDeviceController} from '../../util/common/base.device.controller';
import {BaseCtrlFactory} from './base/base.ctrl.factory';

export class BluetoothManager {

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
        console.log(time)
        return new Observable<ResponseData>(observer => {
            console.log(observer, '3')
            this.bluetoothSdk.startScan(time).subscribe(data => {
                console.log(data, '4')
                const response = new ResponseData();
                if (data.status === 'device') {
                    const matchDevice = this.match(data);
                    if (matchDevice) {
                        response.data = matchDevice;
                    }
                } else {
                    response.data = data;
                }
                console.log(response, 'response,')
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
            const controller = this.getDeviceCtrl(deviceModel);
            controller.connectDevice().subscribe(result => {
                observer.next(result);
                observer.complete();
            }, err => {
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
        const factory: BaseCtrlFactory = this.getContollerFactory(deviceModel);
        let controller: BaseDeviceController = null;
        if (factory) {
            controller = factory.getController(deviceModel);
        } else {
            return null;
        }
        // Setting Bluetooth SDK Init
        controller.setBleData(this.bluetoothSdk);
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
        const factory: BaseCtrlFactory = null;
/*        switch (deviceData.lifelogTypeGrpCd) {
            case 'LIFELOG_GRP_HEALTH':
                factory = new HealthCtrlFactory();
                break;
            case 'LIFELOG_GRP_ACTIVE':
                factory = new ActiveCtrlFactory();
                break;
            case 'LIFELOG_GRP_FOOD':
                factory = new FoodCtrlFactory();
                break;
        }*/
        return factory;
    }

    private getUpperCaseTrim(str): string {
        return str.toUpperCase().replace(/(\s*)/g, '');
    }
}
