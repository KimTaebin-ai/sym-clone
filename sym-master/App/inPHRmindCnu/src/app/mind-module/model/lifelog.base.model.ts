export class LifelogBaseModel {

    public status: Status = Status.wait;
    public message: string;
    public dateTime: string; // 측정 일시 (YYYY-MM-DD HH:mm:ss)
    
}

export enum Status {
    wait = 0,
    ok = 1,
    fail = 2,
    ing = 3
}