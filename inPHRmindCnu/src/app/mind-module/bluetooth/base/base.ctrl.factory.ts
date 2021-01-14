import {BaseDeviceController} from '../../../util/common/base.device.controller';

export abstract class BaseCtrlFactory {

    // ------------------------------------------------------------------------------------
    // Abstract function
    // ------------------------------------------------------------------------------------
    // Get Device Controller
    public abstract getController(deviceData): BaseDeviceController;

}
