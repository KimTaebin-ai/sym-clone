export class ResponseData {
    public code: any = ResponseCode.OK;
    public message: string;
    public data: any;
}

export enum ResponseCode {

    /*성공*/
    OK = 200,
    FAIL = 500,
    Success = (
        OK
    ),
    error = 500,
    ready = 700,

    /*300: 데이터 없음, 301: 중복 데이터 있음*/
    NOT_FOUND = 300,
    DUPLICATED = 301,
    Redirection = (
        NOT_FOUND | DUPLICATED
    ),


    /*400: 잘못된 파라미터 or 헤더, 401: 인증 실패, 403: 접근 권한 없음*/
    BAD_REQUEST = 400,
    BAD_REQUEST_HEADER = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    ClientErrors = (
        BAD_REQUEST | BAD_REQUEST_HEADER | UNAUTHORIZED | FORBIDDEN
    ),
    AuthorizationErrors = (
        UNAUTHORIZED | FORBIDDEN
    ),


    /*500: 서버 내부 오류*/
    INTERNAL_SERVER = 500,
    ServerErrors = (
        INTERNAL_SERVER
    ),

    /*30100: 설문완료, 30101: 미완료 설문 이력 존재*/
    COMPLETE_PRO = 30100,
    INCOMPLETE_PRO = 30101,
    ProResponse = (
        COMPLETE_PRO | INCOMPLETE_PRO
    ),

}
