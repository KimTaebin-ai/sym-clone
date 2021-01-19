import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../mind-module/service/auth.service';

@Component({
  selector: 'app-setting-term',
  templateUrl: './setting-term.page.html',
  styleUrls: ['./setting-term.page.scss'],
})
export class SettingTermPage implements OnInit {

  termInfoList: any = [];

  constructor(
      private authService: AuthService,
  ) { }

  ngOnInit() {
    this.getTermList();
  }

  getTermList() {
    this.authService.getTermInfoList().subscribe(res => {
      console.log(res)
      this.termInfoList = res;
    }, err => {

    });
  }

  selectList(item) {
    item.opened = !item.opened;
  }
}
