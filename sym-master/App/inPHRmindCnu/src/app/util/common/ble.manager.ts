import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs';
import {ResponseData} from '../../mind-module/data/response.data';

@Injectable()
export class BleManager {


    constructor(
        private ngZone: NgZone
    )
    {
        /*this.bluetoothManager = new BluetoothManager(platform, ble);*/
    }

    /**
     * 모든 BLE 장비 스캔 시작
     * @param time - seconds 설정 (ex 1, 2..)
     */
  /*  public startScan(time: number): Observable<ResponseData> {
        /!*this.setStatus('Scanning for Bluetooth LE Devices');*!/
        return new Observable<ResponseData>(observer => {
            console.log(observer)
            this.ble.scan([], time).subscribe(
                device => {
                    console.log(device)
                    if (device.name) {
                        this.onDiscover(device, observer);
                    }
                },
                error => {
                    console.error('$$ startScan $$ error=>>:', error);
                    observer.error(error);
                }
            );

            // timeout 이후 observer complete callback
            setTimeout(() => observer.complete(), time * 1000);
        });
    }


    onDiscover(device, observer) {
        /!*this.devices.forEach((item) => {
          if (this.getLifeLogType() === item.lifelogTypeCd && device.name.includes(item.bluetoothName)) {
            this.commonLog.log('#Device start:', device);
            this.deviceModel = item;
            this.deviceModel.address = device.id;
            this.deviceModel.name = device.name;
            this.commonLog.log('#Device:', this.deviceModel);

            const res = new ResponseData();
            res.code = ResponseCode.ok;
            res.data = this.deviceModel;
            observer.next(res);
          }
        });*!/
    }*/

}
