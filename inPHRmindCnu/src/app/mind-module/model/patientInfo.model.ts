import {InfoDiseasesModel} from './infoDiseases.model';
import {InfoDrinkNowsModel} from './infoDrinkNows.model';
import {InfoDrinksModel} from './infoDrinks.model';
import {InfoStatusModel} from './infoStatus.model';
import {InfoSymptomModel} from './infoSymptom.model';

export class PatientInfoModel {
    public children: number; // 자녀 수 example: 2
    public dayOfSmoke: string; // 하루 평균 흡연량 개피 example: 30
    public disaese: string; // 정신과적 진단 여부(Y/N) example: Y
    public drink: string; // 음주 여부(Y/N) example: Y
    public drinkNow: string; // 최근 12주간 음주 여부(Y/N) example: Y
    public drinkNowProblem: string; // 최근 12주간 음주로 인한 일상 생활 문제 발생 여부(Y/N) example: Y
    public drinkProblem: string; // 음주로 인한 일상 생활 문제 발생 여부(Y/N) example: Y
    public drugNow: string; // 최근 1달 약 처방 여부(Y/N) example: Y
    public drugNowTaking: string; // 실제 복용량 % example: 90
    public educationCode: number; // 학력 코드(53~61, display order - 고학력 오름차순) example: 61
    public educationCodeNm: string; // 학력 코드명
    public educationEtc: string; // 학력 기타 example: 기타 학력 입력
    public haveJob: string; // 직업 보유 여부(Y/N) example: Y
    public height: number; // 키 example: 170.15
    public income: number; // 수입(천만원 단위) example: 10
    public jobCode: string; // 직업 코드(62~69) example: 69
    public jobCodeNm: string; // 직업 코드명
    public jobEtc: string; // 직업 기타 example: 개발자
    public married: string; // 혼인 여부(Y/N) example: Y
    public menopause: string; // 폐경 여부(Y, N, M(남자 - 해당없음)) example: M
    public phone: string; // 전화번호(000-0000-0000 하이픈 포함) example: 010-0000-0000
    public religionCode: number; // 종교 코드(70~74) example: 74
    public religionCodeNm: string; // 종교 코드명
    public religionEtc: string; // 종교 기타 example: 기타 종교 입력
    public selfHarmNow: string; // 최근 1달 자해 여부(Y/N) example: Y
    public smoke: string; // 과거 흡연 여부(Y/N) example: Y
    public smokeNow: string; // 최근 12주간 흡연 여부(Y/N) example: Y
    public suicide: string; // 자살 시도 여부(Y/N) example: Y
    public suicideNow: string; // 최근 1달 자살 시도(Y/N) example: Y
    public suicideNowFeel: string; // 최근 1달 자살 충동 여부(Y/N) example: Y
    public suicideNum: string; // 자살 시도 횟수 example: 2
    public suicideWhen: string; // 최초 자살 시도 나이 example: 14
    public weight: number; // 몸무게 example: 85
    public infoDiseases: InfoDiseasesModel[];
    public infoDrinkNows: InfoDrinkNowsModel[];
    public infoDrinksModel: InfoDrinksModel[];
    public infoStatusModel: InfoStatusModel[];
    public infoSymptomModel: InfoSymptomModel[];

}
