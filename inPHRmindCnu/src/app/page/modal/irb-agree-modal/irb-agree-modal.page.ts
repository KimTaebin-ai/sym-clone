import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-irb-agree-modal',
  templateUrl: './irb-agree-modal.page.html',
  styleUrls: ['./irb-agree-modal.page.scss'],
})
export class IrbAgreeModalPage implements OnInit {
  @Input() title: string;
  @Input() detail: string;
  constructor() { }

  ngOnInit() {
  }

}
