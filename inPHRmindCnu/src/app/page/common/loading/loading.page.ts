import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {EventBusService} from '../../../services/event-bus.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})
export class LoadingPage implements OnInit, OnDestroy {

  loading: any = {
    active: false,
    text: ''
  };

  loadingSubscription: Subscription;
  constructor(
      private eventBusService: EventBusService
  ) { }

  ngOnInit() {
    this.loadingSubscription = this.eventBusService.loading$.subscribe(event => {
      this.loading.active = event.active;
      this.loading.text = event.text;
    });
  }

  ngOnDestroy(): void {
    /*this.loadingSubscription?.unsubscribe();*/
  }

}
