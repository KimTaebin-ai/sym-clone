import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertUtilService} from '../../../util/common/alert-util.service';
import {MindManager} from '../../../mind-module/mind.manager';
import {NavController} from '@ionic/angular';
import {ActivatedRoute, NavigationExtras} from '@angular/router';
import {PageInfoService} from '../../../services/page-info.service';

@Component({
  selector: 'app-lock',
  templateUrl: './lock.page.html',
  styleUrls: ['./lock.page.scss'],
})
export class LockPage implements OnInit, OnDestroy {

  password: any = [];
  // 패스워드 입력 횟수( 등록시 2번 입력)
  pwCount = 0;
  lockType: any = {
    type: 'REG',
    pw: 0
  };

  constructor(
      private alertUtilService: AlertUtilService,
      private mindManager: MindManager,
      private navController: NavController,
      private route: ActivatedRoute,
      private pageInfoService: PageInfoService
  ) { }

  ngOnInit() {
    this.resetData();
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.lockType.type = params.type;
      }
    });

  }

  ngOnDestroy(): void {
    this.resetData();
  }

  selectNumber(num) {
    this.password.push(num);
    if (this.password.length === 4) {
      if (this.lockType.type === 'REG') {
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
                login : 'LOGIN'
              }
            }
            const navigationExtras: NavigationExtras = paramVo;
            const data: any = {
              url: '/main/main/home',
              title: '메인페이지/홈'
            }
            this.pageInfoService.resetPageInfo(data).then(() => {
              this.navController.navigateRoot(['/main'], navigationExtras);
            });

          } else {
            this.alertUtilService.showAlert(null, '비밀번호가 동일하지 않습니다.<br>다시 입력해주세요.');
          }
          this.password = [];
          this.pwCount = 0;
        }
      } else {
        const recentlyData = this.mindManager.getLockPw();
        let lockPw = '';
        for (let i = 0; i < this.password.length; i++) {
          lockPw = lockPw + this.password[i].toString();
        }
        if (Number(recentlyData) === Number(lockPw)) {
          this.password = [];
          this.pwCount = 0;
          const paramVo = {
            queryParams: {
              login : 'LOGIN'
            }
          }
          const navigationExtras: NavigationExtras = paramVo;
          this.navController.navigateRoot(['/main'], navigationExtras);
        } else {
          this.password = [];
          this.pwCount = 0;
          this.alertUtilService.showAlert(null, '잘못된 비밀번호 입니다.<br>비밀번호를 다시 입력해주세요.');
        }
      }
    }
  }

  delPw() {
    if (this.password.length > 0) {
      this.password.pop();
    }
  }
  logout() {
    this.navController.navigateRoot(['/login']);
  }

  resetData() {
    this.password = [];
    this.pwCount = 0;
  }

}
