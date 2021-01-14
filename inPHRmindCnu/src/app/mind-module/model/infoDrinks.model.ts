
export class InfoDrinksModel {
    public drinkAmount: number; // 평균 음주량 example: 5
    public drinkCode: number; // 음주 주종 코드 시퀀스(1~4) example: 4
    public drinkCodeNm: string; // 음주 주종 코드명
    public drinkEtc: string; // 기타 주종 example: 이과두주
    public perWeek: number; // 주당 음주 횟수 example: 1
    public numOfYears: number; // 음주 기간(년) example: 10
}
