import {LifelogBaseModel} from './lifelog.base.model';

export class UrineModel extends LifelogBaseModel {

    public id;
    public user;
    public year;
    public month;
    public day;
    public hours;
    public min;
    public seconds;
    public item;

    // Traditional Unit (Unit: mg/dl)
    public uro; // 유로빌리노겐
    public bld; // 잠혈
    public bil; // 빌리루빈
    public ket; // 케톤체
    public glu; // 요포도당
    public pro; // 요단백질
    public ph; // 요산성도
    public nit; // 아질산염
    public leu; // 요백혈구 (Unit: /ul)
    public sg; // 요비중 (요농축 정도) 정상치 1.015 ~ 1.025
    public vc; //
    public mal; //
    public cr; //
    public uca; //

    // Special Unit
    public uroSu;
    public bldSu;
    public bilSu;
    public ketSu;
    public gluSu;
    public proSu;
    public phSu;
    public nitSu;
    public leuSu;
    public sgSu;
    public vcSu;
    public malSu;
    public crSu;
    public ucaSu;

    //
    public uroIu; // 유로빌리노겐
    public bldIu; // 잠혈
    public bilIu; // 빌리루빈
    public ketIu; // 케톤체
    public gluIu; // 요포도당
    public proIu; // 요단백질
    public phIu; // 요산성도
    public nitIu; // 아질산염
    public leuIu; // 요백혈구 (Unit: /ul)
    public sgIu; // 요비중 (요농축 정도) 정상치 1.015 ~ 1.025
    public vcIu; //
    public malIu; //
    public crIu; //
    public ucaIu; //


    // 직접입력, Detail값
    public uroDetail;
    public bldDetail;
    public bilDetail;
    public ketDetail;
    public gluDetail;
    public proDetail;
    public phDetail;
    public nitDetail;
    public leuDetail;
    public sgDetail;
    public vcDetail;
    public malDetail;
    public crDetail;
    public ucaDetail;

    public uroCode;
    public bldCode;
    public bilCode;
    public ketCode;
    public gluCode;
    public proCode;
    public phCode;
    public nitCode;
    public leuCode;
    public sgCode;
    public vcCode;
    public malCode;
    public crCode;
    public ucaCode;

    public uroCu;
    public bldCu;
    public bilCu;
    public ketCu;
    public gluCu;
    public proCu;
    public phCu;
    public nitCu;
    public leuCu;
    public sgCu;
    public vcCu;
    public malCu;
    public crCu;
    public ucaCu;
}
