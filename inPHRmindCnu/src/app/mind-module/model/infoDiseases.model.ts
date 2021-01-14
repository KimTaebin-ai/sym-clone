import {InfoDiseaseSymptomModel} from './infoDiseaseSymptom.model';

export class InfoDiseasesModel {
    public content: string; // 추가정보 example: 정신적인질병명
    public diseaseCode: number; // 정신과적 질병 코드 시퀀스(33~52) example: 51
    public diseaseCodeNm: string; // 정신과적 질병 코드명
    public onset: string; // 발병 시기 example: 2020-12
    public infoDiseaseSymptoms: InfoDiseaseSymptomModel[];
}

