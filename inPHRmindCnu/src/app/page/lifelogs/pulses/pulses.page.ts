import { Component, OnInit } from '@angular/core';
import {PageInfoService} from '../../../services/page-info.service';
import {NavController} from '@ionic/angular';
import {NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-pulses',
  templateUrl: './pulses.page.html',
  styleUrls: ['./pulses.page.scss'],
})
export class PulsesPage implements OnInit {

  regType: any = {
    type: '',
    data: {}
  }

  constructor(
      private pageInfoService: PageInfoService,
      private navController: NavController
  ) { }

  ngOnInit() {
  }

  goToPage(data) {
    const url = 'insert-pulse';
    const title = '맥박 기록 수정';
    const paramVo = {
      queryParams: {
        inputType : 'UPDATE',
        data
      },
      animate: false
    };
    const navigationExtras: NavigationExtras = paramVo;
    this.pageInfoService.getToOtherPage('/pulses', url, title).then(() => {
      this.navController.navigateRoot([url], navigationExtras);
    });
  }
}
