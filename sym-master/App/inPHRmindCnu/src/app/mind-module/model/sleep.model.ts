import {LifelogBaseModel} from './lifelog.base.model';

export class SleepModel extends LifelogBaseModel {

    public startTime: string; // 수면 시작일시 (YYYY-MM-DD HH:mm:ss)
    public endTime: string; // 수면 종료 일시 (YYYY-MM-DD HH:mm:ss)
    public stages: Array<SleepStageModel>; // 수면 상세 (json 문자열)

}

export class SleepStageModel {

    public startTime: string; // (YYYY-MM-DD HH:mm:ss)
    public endTime: string; // (YYYY-MM-DD HH:mm:ss)
    public stage: string; //

    //fitbit wake, light, deep, rem
    //misfit 1: awake 2: sleep 3: deep sleep
    //wake sleep deep
}
