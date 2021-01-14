import { Component, OnInit } from '@angular/core';
import {IrbService} from '../../../services/irb.service';

@Component({
  selector: 'app-irb',
  templateUrl: './irb.page.html',
  styleUrls: ['./irb.page.scss'],
})
export class IRBPage implements OnInit {
  constructor(
      private irbService: IrbService
  ) { }

  list$;

  ngOnInit() {
    this.list$ = this.irbService.getList();
  }

  selectList(item) {
    item.opened = !item.opened;
  }

}
