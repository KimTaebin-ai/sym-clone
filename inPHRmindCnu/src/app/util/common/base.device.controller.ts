import {BluetoothSdk} from './bluetooth.sdk';
import {DeviceModel} from '../../mind-module/model/device.model';
import {Observable} from 'rxjs';

export abstract class BaseDeviceController {

    // Bluetooth SDK
    public bluetoothSdk: BluetoothSdk;

    // Controller ID
    public ctrlId = 'other';

    // Connected Device
    public targetDevice: DeviceModel;

    // constructor(
    //     public platform: Platform,
    //     public ble: BLE
    // ) {
    //     this.bluetoothSdk = new BluetoothSdk(platform, ble);
    //     this.ctrlId = 'Device';
    // }

    // ------------------------------------------------------------------------------------
    // Abstract function
    // ------------------------------------------------------------------------------------

    // Data sync
    public abstract syncData(): Observable<any>;
    // Data sync stop
    public abstract stopSyncData(): Observable<any>;
    // Recive Data
    public abstract receiveData(data): any;
    // Data Parsing
    public abstract parseData(data): any;

    // ------------------------------------------------------------------------------------
    // Ble
    // ------------------------------------------------------------------------------------
    // Device Connect
    public connectDevice(): Observable<any> {
        return new Observable<any>(observer => {
            alert()
            observer.next(true);
            observer.complete();
        });
    }

    // ------------------------------------------------------------------------------------
    // Set/Get
    // ------------------------------------------------------------------------------------
    // BluetoothSdk
    public setBleData(bluetoothSdk) {
        console.log('666')
        this.bluetoothSdk = bluetoothSdk;
    }

    // Controller ID
    public getCtrlId(): string {
        return this.ctrlId;
    }

    // Connected Device
    public setDevice(device: DeviceModel) {
        this.targetDevice = device;
        this.ctrlId = device.deviceCode;
    }
    public getDevice(): DeviceModel {
        return this.targetDevice;
    }

}
