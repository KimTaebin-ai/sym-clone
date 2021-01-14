import { Injectable } from '@angular/core';
import {RestApiService} from './rest-api.service';
import {UrlService} from './url.service';
import {DateService} from '../../util/common/date.service';
import {Observable, of, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {switchMap} from 'rxjs/operators';
import {ResponseCode} from '../data/response.data';

@Injectable({
  providedIn: 'root'
})
export class MainService {


  constructor(
      private restApiService: RestApiService,
      private urlService: UrlService
  )
   { }

    getMainInfo(): Observable<any> {
        return this.restApiService.getData(environment.simApi + this.urlService.main).pipe(
            switchMap(res => {
                if (res) {
                    console.log(res)
                    if (res.code === ResponseCode.OK) {
                        return of(res.data);
                    } else {
                        return throwError('IRB 동의서 페이지를 불러오는<br>도중 오류가 발생하였습니다.');
                    }
                } else {
                    return throwError('IRB 동의서 페이지를 불러오는<br>도중 오류가 발생하였습니다.');
                }
            })
        );
    }
}
