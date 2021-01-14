import { Component, OnInit } from '@angular/core';
import {MindManager} from '../../../../mind-module/mind.manager';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.page.html',
  styleUrls: ['./alarm.page.scss'],
})
export class AlarmPage implements OnInit {

  constructor(
      private mindManager: MindManager
  ) { }

  ngOnInit() {
    const pageInfo: any = {
      url: '/main/main/home',
      title: '알림'
    };
    this.mindManager.setPageInfo(pageInfo);
  }

}
