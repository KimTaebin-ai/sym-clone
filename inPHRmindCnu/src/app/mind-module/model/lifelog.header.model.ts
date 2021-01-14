export class LifelogHeaderModel {

    public lifelogSeq: number; // 라이프로그 순번    
    public memberSeq: number; // 사용자 순번
    public unit: string; // 데이터 단위
    public lifelogTypeGrpCd: string; // 라이프로그 타입 그룹코드
    public lifelogTypeGrpCdName: string; // 라이프로그 타입 그룹명
    public lifelogTypeCd: string; // 라이프로그 타입 코드
    public lifelogTypeCdName: string; // 라이프로그 타입명
    public measureDt: string; // 측정일시
    public measureType: string; // 측정타입 (DIRECT, DEVICE, ACCOUNT)
    public deviceCode: string; // 측정 디바이스 코드
    public deviceCodeName: string; // 측정 디바이스명
    public providerCode: string; // 헬스 플랫폼 코드
    public providerCodeName: string; // 헬스 플랫폼명
    public regDt: string; // 입력 일시
    public edtDt: string; // 수정 일시

}
