import {LifelogBaseModel} from './lifelog.base.model';

export class BloodPressureModel extends LifelogBaseModel {

    public maximum: string; // 최대혈압
    public minimum: string; // 최소혈압
    public pulse: string; // 맥박
    public takeMedi;

}
