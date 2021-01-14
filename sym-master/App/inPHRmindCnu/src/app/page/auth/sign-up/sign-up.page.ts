import {Component, OnDestroy, OnInit} from '@angular/core';
import {MindManager} from '../../../mind-module/mind.manager';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit, OnDestroy {

  constructor(
      private mindManager: MindManager
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }
}
