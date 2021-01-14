export class ProviderModel {

    public mpSeq: number; // 순번
    public memberSeq: number; // 사용자 순번
    public id: string; // 아이디
    public uuid: string; // 폰 uuid    
    public providerCode: string; // 헬스플랫폼 코드
    public providerName: string; // 헬스플랫폼명
    public homePage: string; // 홈페이지
    public useYn: string; // 사용여부
    public syncDt: string; // 연동 일시
    public regDt: string; // 생성일시
    public edtDt: string; // 수정일시    
    public syncYn: string; // 동기화 여부
    public lastSyncDt: string; // 마지막 동기화 일시
    public startDate: string; // 시작 시간
    public endDate: string; // 종료 시간

    //
    public imgPath: string;

    // 헬스 플랫폼 access 정보
    public tokenType: string; // 토큰 타입
    public accessToken: string; // 연동 토큰
    public refreshToken: string; // 재생성 토큰
    public expiresIn: string; // 만료기간

}
