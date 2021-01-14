import {IrbContentListModel} from './irbContentList.model';

export class IrbPageInfoModel {
    public projectSeq: number;
    public irbTitle: string;
    public shortDescription: string;
    public fullDescription: string;
    public preContent: string;
    public postContent: string
    public agreeContent: IrbContentListModel[];
}
