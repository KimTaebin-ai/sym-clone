import { Component, OnInit } from '@angular/core';
import {PageInfoService} from '../../../../services/page-info.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-lifelog',
  templateUrl: './lifelog.page.html',
  styleUrls: ['./lifelog.page.scss'],
})
export class LifelogPage implements OnInit {

  constructor(
      private pageInfoService: PageInfoService,
      private navController: NavController
  ) { }

  ngOnInit() {
  }

  goToPage(url, title) {
      this.pageInfoService.getToOtherPage('/main/main/lifelog', url, title).then(() => {
        this.navController.navigateRoot([url]);
      });
  }

}
