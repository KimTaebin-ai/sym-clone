export class ResponseData {
    public code: any = ResponseCode.OK;
    public message: string;
    public data: any;
}

export enum ResponseCode {

    OK = 200,

    DUPLICATED = 301,
    EMAIL_DUPLICATED = 304,
    NO_MATCHING = 303,
    NO_INFORMATION = 3005,
    ALREADY_DATA = 307,
    SIGN_UP_EMAIL_DUPLICATED = 205,

    // inphr
    INPHR_OK = '0',
    INPHR_SIGN_UP_EMAIL_DUPLICATED = '205',
    INPHR_NOT_FOUND_SYM = '302',

    FAIL = 500,
    // @ts-ignore
    Success = (OK),
    error = 500,
    ready = 700,

    /*300: 데이터 없음, 301: 중복 데이터 있음*/
    NOT_FOUND = 300,
    // @ts-ignore
    Redirection = (
        // tslint:disable-next-line:no-bitwise
        NOT_FOUND | DUPLICATED
    ),


    /*400: 잘못된 파라미터 or 헤더, 401: 인증 실패, 403: 접근 권한 없음*/
    BAD_REQUEST = 400,
    BAD_REQUEST_HEADER = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    // @ts-ignore
    ClientErrors = (
        // tslint:disable-next-line:no-bitwise
        BAD_REQUEST | BAD_REQUEST_HEADER | UNAUTHORIZED | FORBIDDEN
    ),
    // @ts-ignore
    AuthorizationErrors = (
        // tslint:disable-next-line:no-bitwise
        UNAUTHORIZED | FORBIDDEN
    ),

    /*500: 서버 내부 오류*/
    INTERNAL_SERVER = 500,
    // @ts-ignore
    ServerErrors = (
        INTERNAL_SERVER
    ),

    // @ts-ignore
    ProResponse = (
        // tslint:disable-next-line:no-bitwise
        COMPLETE_PRO | INCOMPLETE_PRO
    ),

    SURVEY_COMPLETE = 204,
    SURVEY_COMPLETE_MESSAGE = '설문을 완료하였습니다.',
    EMPTY_ANSWER = 4002,
    EMPTY_ANSWER_MESSAGE = '응답 값을 입력하세요.'
}

/*
	DUPLICATE_INFO(307, "이미 등록된 데이터 입니다."), // 매치되는 정보 없음
	NOT_FOUND_SURVEY(4000, "존재하지 않는 설문 입니다."), // 매치되는 정보 없음
	LOCK_INFO(4001, "잠겨 있는 정보 입니다."), // 매치되는 정보 없음
	EMPTY_ANSWER(4002, "응답 값을 입력하세요."), // 매치되는 정보 없음
	VALIDATION_FAIL(4003, "응답의 유효성을 확인하세요."), // 매치되는 정보 없음
	NOT_ANSWER_QUESTION(4004, "응답 불가 문항입니다."), // 매치되는 정보 없음
	TOO_MUCH_QUESTION(4005, "응답 수가 너무 많습니다."), // 매치되는 정보 없음
	ANSWER_TYPE_ERROR(4006, "응답 타입이 일치하지 않습니다."), // 매치되는 정보 없음
	NO_HAVE_ANSWER_HINT(4007, "응답 보기가 없습니다."), // 매치되는 정보 없음
	MISSING_TARGET(4008, "응답 대상이 없습니다."), // 매치되는 정보 없음
	IS_FIRST_QUESTION(4009, "이전 문제 없음."), // 매치되는 정보 없음
*/
