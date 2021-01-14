import {BaseDeviceController} from '../../../util/common/base.device.controller';
import {Mi1aController} from '../xiaomi/xiaomi.mi1a.controller';
import {BaseCtrlFactory} from '../base/base.ctrl.factory';

export class ActiveCtrlFactory extends BaseCtrlFactory {

    // Get Active Device Controller
    public getController(deviceData): BaseDeviceController {
        alert('1')
        let controller: BaseDeviceController = null;
        switch (deviceData.lifelogTypeCd) {
            case 'LIFELOG_TYPE_STP':
                /*발걸음*/
                controller = this.getActiveStepCtrl(deviceData);
                break;
        }
        return controller;
    }

    // Get Step Deivce Controller
    private getActiveStepCtrl(device) {
        alert(2)
        let controller: BaseDeviceController = null;
        switch (device.bluetoothName) {
            case 'MI1A':
                controller = new Mi1aController();
                break;
        }
        return controller;
    }

}
