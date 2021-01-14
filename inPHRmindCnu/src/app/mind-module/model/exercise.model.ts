import {LifelogBaseModel} from './lifelog.base.model';

export class ExerciseModel extends LifelogBaseModel {

    public time: number; // 운동시간(분)
    public location: string; // 위치정보

}
