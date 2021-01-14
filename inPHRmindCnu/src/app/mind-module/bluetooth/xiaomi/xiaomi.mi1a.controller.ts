/**
 * 제조사: Xiaomi (샤오미)
 * 모델명: MI1A (미밴드1)
 */
import {Observable} from 'rxjs';
import {StepModel} from '../../model/step.model';
import {BaseDeviceController} from '../../../util/common/base.device.controller';
import {Status} from '../../model/lifelog.base.model';
import {DateUtil} from '../../../util/common/date.util';

export class Mi1aController extends BaseDeviceController {

    public syncData(): Observable<StepModel> {
        return new Observable<StepModel>(observer => {
            let dataModel: StepModel = new StepModel();
            if (this.bluetoothSdk == null) {
                dataModel.status = Status.fail;
                dataModel.message = 'Bluetooth SDK Not init';
                observer.error(dataModel);
            } else {
                const data = {
                    service: 'FFF0',
                    characteristic: 'FFF4'
                };
                this.bluetoothSdk.notify(this.targetDevice.address, data).subscribe(buffer => {
                    console.log('syncData buffer => ', buffer);
                    dataModel = this.receiveData(buffer);
                    if (dataModel.status === Status.ok || dataModel.status === Status.fail) {
                        console.log('syncData dataModel => ', dataModel);
                        observer.next(dataModel);
                        observer.complete();
                    }
                }, err => {
                    console.log('syncData err => ', err);
                    observer.error(err);
                });
            }
        });
    }

    public stopSyncData(): Observable<any> {
        return new Observable<any>(observer => {
            const data = {
                service: 'FFF0',
                characteristic: 'FFF4'
            };
            this.bluetoothSdk.disNotify(this.targetDevice.address, data).then(obj => {
                observer.next(obj);
                observer.complete();
            }).catch(err => {
                observer.error();
            });
        });
    }

    public receiveData(data): StepModel {
        let dataModel: StepModel = new StepModel();
        dataModel.status = Status.ing;

        console.log('receiveData => ', data);
        dataModel = this.parseData(data);

        return dataModel;
    }

    public parseData(data): StepModel {
        const dataModel: StepModel = new StepModel();

        const uintArray = new Uint8Array(data);
        console.log('receiveData => ', uintArray);

        const step = (uintArray[0] & 0xff) | ((uintArray[1] & 0xff) << 8);
        dataModel.step = step;
        dataModel.dateTime = DateUtil.getToday();

        dataModel.status = Status.ok;
        return dataModel;
    }

}
