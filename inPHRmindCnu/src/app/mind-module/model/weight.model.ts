import {LifelogBaseModel} from './lifelog.base.model';

export class WeightModel extends LifelogBaseModel {

    public weight: string; // 체중
    public bodyFat: string; // 체지방
    public bodyWater: string; // 체수분
    public bodyMuscle: string; // 근육
    public boneMess: string; // 골격
    public skeletonMuscleMass: string; // 골격근
    public bmi: string; // 체질량지수
    public bmr: string; // 기초대사량

    // 사용안함
    //public bodyVisceralFat: string; // 내장지방량
    //public protein: string; // 단백질량
    //public minerals: string; // 무기질량

}
