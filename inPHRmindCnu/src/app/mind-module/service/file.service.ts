import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {switchMap} from 'rxjs/operators';
import {ResponseCode} from '../data/response.data';
import {RestApiService} from './rest-api.service';
import {UrlService} from './url.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
      private restApiService: RestApiService,
      private urlService: UrlService,
  ) { }

  // 파일 업로드
  uploadFile(reqVo): Observable<any> {
    return this.restApiService.postData(environment.simApi + this.urlService.file, reqVo).pipe(
        switchMap(res => {
            console.log(res)
            if (res) {
              if (res.code === 200) {
                  return of(res.data.fileSeq);      
              } else {
                  return throwError('서명 등록을 실패하였습니다.');
              }
          } else {
              return throwError('서명 등록을 실패하였습니다.');
          }
        })
    );
  }
}
