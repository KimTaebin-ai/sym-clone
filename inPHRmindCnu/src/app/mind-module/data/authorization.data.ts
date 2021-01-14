export class AuthorizationData {    
    public accessToken: string; // 연결 토큰
    public userId: string; // 사용자 아이디
    public scope: Array<string>; // 사용 범위
    public tokenType: string; // 토큰 종류
    public expiresIn: string; // 유효기간
}
