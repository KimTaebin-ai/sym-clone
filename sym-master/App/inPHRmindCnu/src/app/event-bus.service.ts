import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {

  constructor() { }

  // 페이지 헤더 정보
  readonly pageHeaderInfo$ = new Subject<any>();
}
