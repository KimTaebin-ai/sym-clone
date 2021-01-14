import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {EventBusService} from '../services/event-bus.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(
      private eventBusService: EventBusService
  ) { }


  showLoading(active, text) {
    const param: any = {
      active,
      text
    }

    this.eventBusService.loading$.next(param);
  }
}
