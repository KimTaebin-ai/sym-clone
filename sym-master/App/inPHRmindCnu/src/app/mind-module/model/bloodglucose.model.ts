import {LifelogBaseModel} from './lifelog.base.model';

export class BloodGlucoseModel extends LifelogBaseModel {

    public value: string; // 혈당값
    public insulinYn: string; // 인슐린 투여 여부
    public checkPoint: string; // 입력 시점

}
