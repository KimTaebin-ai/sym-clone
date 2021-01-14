import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  /*-------계정관리-------------------------------------*/
  public loginUrl = '/api/platform/login'; // 로그인
  public getTermListUrl = '/api/term/getUseTermList'; // 약관리스트 조회
  public kakaoLogin = ''; // 카카오 로그인
  /*---------------------------------------------------*/
}
