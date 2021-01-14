import {LifelogBaseModel} from './lifelog.base.model';

export class TemperatureModel extends LifelogBaseModel {

    public temperature: string; // 체온
    public voltage: string; // 전력(베터리)

}
