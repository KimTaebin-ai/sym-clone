// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  simApi: 'http://beta.inphrcare.com:33300',
  storagekeyMember: 'SIM_MEMBER'           , /*회원정보*/
  storagekeyMemberToken: 'SIM_MEMBER_TOKEN', /*로그인 토큰*/
  storagekeyVersion: 'SERVER_APP_VERSION'  , /*버전 정보*/
  storagekeySetting: 'SYSTEM_SETTING'      , /*시스템 설정*/
  storagekeyLockPw: 'LOCK_PASSWORD'        , /*잠금비밀번호 설정*/
  storagekeyClinicInfo: 'CLINIC_INFO'      , /*클리닉 회차 설정*/
  storagekeyVersionInfo: 'VERSION_INFO'    , /*버전 설정*/


  /*-------------------------------------------------------------------------*/
  /* Health Platform Credential*/
  /*-------------------------------------------------------------------------*/
 credentials: [
    {
      name: 'fitbit',
      clientId: '22CZPM',
      appSecret: '0638aa5afbaad38106dd720b61b4a1f2'
    }
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
