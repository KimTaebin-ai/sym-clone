import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {

  constructor() { }

  // 페이지 헤더 정보
  readonly pageHeaderInfo$ = new Subject<any>();

  // 탭 이동 정보
  readonly tabInfo$ = new Subject<any>();

  // 로딩 정보
  readonly loading$ = new Subject<any>();

  // 모달 정보
  readonly modal$ = new Subject<any>();
}
