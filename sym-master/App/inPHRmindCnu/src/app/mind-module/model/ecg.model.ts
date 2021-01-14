import {LifelogBaseModel} from './lifelog.base.model';

export class EcgModel extends LifelogBaseModel {

    public averagePulse: string; // 심박
    public ecg: string; // ECG Data  ByteUtil.stringToBytes() 로 변환하여 사용
    public lead: string; // ECG Data

    
    //나중에 위정현 수정 예정
    public pulse: string;
}
