import {LifelogBaseModel} from './lifelog.base.model';

export class SpiroModel extends LifelogBaseModel {

    // Spiro Data
    public fvc: any; //기준치(폐의 용량)
    public fev1: any; //1초동안 내쉴수 있는 공기 양
    public pef: any; //fev1의 공기속도
    public pev1Per: any;

    public fef25: any;
    public fef50: any;
    public fef75: any;
    public fef2575: any;
    public fev05: any;

    public ev: any;
    public fet: any;
    public peft: any;
    public eotv: any;

    // DataList .. how... used..?
    public structTime: any;
    public structIndex: Array<any> = new Array();
    public structData: Array<any> = new Array();

    // Serial .. how... used..?
    public serial: Array<any> = new Array(20);

}
