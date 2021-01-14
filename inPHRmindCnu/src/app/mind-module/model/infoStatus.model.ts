
export class InfoStatusModel {
    public content: string; // 추가 정보 example: 대장암
    public state: string; // 현재 상태(C-완치(cure), U-치료중(under treatment), N-치료받지않음(방치 Neglect)) example: C
    public statusCode: number; // 질병 코드 시퀀스(75~92) example: 91
    public statusNm: string; // 질병 코드명
    public year: string; // 발현시기 example: 2010
}
