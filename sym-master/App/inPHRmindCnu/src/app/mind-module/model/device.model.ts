export class DeviceModel {

    public deviceCode: string; // 장비코드
    public deviceName: string; // 장비명
    public bluetoothName: string; // 장비 블루투스명
    public deviceTypeCd: string; // 디바이스 타입코드
    public deviceTypeName: string; // 디바이스 타입명
    public lifelogTypeGrpCd: string; // 라이프로그 그룹코드
    public lifelogTypeGrpName: string; // 라이프로그 그룹명
    public lifelogTypeCd: string; // 라이프로그 코드
    public lifelogTypeName: string; // 라이프로그 코드명
    public manufacturer: string; // 제조사
    public deviceImg: string; // 장비이미지
    public useInfo: string; // 사용방법
    public infInfo: string; // 연동방법
    public useYn: string; // 사용여부
    public regDt: string; // 생성일시
    public edtDt: string; // 수정일시

    public address?: string; // 디바이스 Mac
    public name?: string; // 디바이스 Ble명
}
