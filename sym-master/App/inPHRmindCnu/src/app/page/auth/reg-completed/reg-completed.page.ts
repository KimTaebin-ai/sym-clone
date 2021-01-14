import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationExtras} from '@angular/router';
import {AlertUtilService} from '../../../util/common/alert-util.service';
import {MindManager} from '../../../mind-module/mind.manager';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-reg-completed',
  templateUrl: './reg-completed.page.html',
  styleUrls: ['./reg-completed.page.scss'],
})
export class RegCompletedPage implements OnInit, OnDestroy {

  password: any = [];
  // 패스워드 입력 횟수( 등록시 2번 입력)
  pwCount = 0;
  lockType: any = {
    pw: 0
  };

  constructor(
      private alertUtilService: AlertUtilService,
      private mindManager: MindManager,
      private navController: NavController,
  ) { }

  ngOnInit() {
    this.resetData();
  }

  ngOnDestroy(): void {
    this.resetData();
  }

  selectNumber(num) {
    this.password.push(num);
    if (this.password.length === 4) {
      if (this.pwCount === 0) {
        let lockPw = '';
        for (let i = 0; i < this.password.length; i++) {
          lockPw = lockPw + this.password[i].toString();
        }
        this.lockType.pw = Number(lockPw);
        this.pwCount++;
        this.password = [];
        this.alertUtilService.showAlert(null, '패스워드를 한번 더 입력해주세요.');
      } else {
        let lockPw = '';
        for (let i = 0; i < this.password.length; i++) {
          lockPw = lockPw + this.password[i].toString();
        }
        if (this.lockType.pw === Number(lockPw)) {
          this.mindManager.setLockPw(lockPw);
          const paramVo = {
            queryParams: {
              login: 'LOGIN'
            }
          }
          const navigationExtras: NavigationExtras = paramVo;
          this.navController.navigateRoot(['/main'], navigationExtras);
        } else {
          this.alertUtilService.showAlert(null, '비밀번호가 동일하지 않습니다.<br>다시 입력해주세요.');
        }
        this.password = [];
        this.pwCount = 0;
      }
    }
  }

  delPw() {
    if (this.password.length > 0) {
      this.password.pop();
    }
  }

  resetData() {
    this.password = [];
    this.pwCount = 0;
  }

}
