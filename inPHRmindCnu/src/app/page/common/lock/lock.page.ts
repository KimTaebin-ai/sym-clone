import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertUtilService} from '../../../util/common/alert-util.service';
import {MindManager} from '../../../mind-module/mind.manager';
import {NavController} from '@ionic/angular';
import {ActivatedRoute, NavigationExtras} from '@angular/router';
import {PageInfoService} from '../../../services/page-info.service';
import {StorageUtil} from '../../../mind-module/util/storage.util';

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
    code: 0,
    pwYn: false,
    pw: 0,
    from: ''
  };
  userInfo: any = {};

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
        this.lockType.code = Number(params.code);
        this.lockType.pwYn = JSON.parse(params.pwYn);
        if (this.lockType.code === 0) {
          this.userInfo = this.mindManager.getMemberModel();
          console.log(this.mindManager.getMemberModel())
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.resetData();
  }

  selectNumber(num) {
    this.password.push(num);
    if (this.password.length === 4) {
      if (!this.lockType.pwYn) {
        if (this.pwCount === 0) {
          let lockPw = '';
          for (const i in this.password) {
            lockPw = lockPw + this.password[i].toString();
          }
          this.lockType.pw = Number(lockPw);
          this.pwCount++;
          this.password = [];
          this.alertUtilService.showAlert(null, '패스워드를 한번 더 입력해주세요.');
        } else {
          let lockPw = '';
          for (const i in this.password) {
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
        for (const i in this.password) {
          lockPw = lockPw + this.password[i].toString();
        }
        if (recentlyData.toString() === lockPw.toString()) {
          this.password = [];
          this.pwCount = 0;
          const url = this.pageInfoService.moveToPageForLock();
          if (url) {
            if (url === 'LOGOUT') {
              // 로그아웃 처리
            } else if (url === 'TOAST') {
              // 마지막 페이지 처리
            }
            if (url === '/insert-psychological-scale') {
              const data = this.mindManager.getSurveyData();
              const navigationExtras: NavigationExtras = {
                queryParams: {
                  data
                }
              };
              this.navController.navigateRoot(['/insert-psychological-scale'], navigationExtras);
            } else {
              this.navController.navigateRoot([url]);
            }

          } else {
            this.alertUtilService.showAlert(null, '잠금번호를 확인하는 도중 오류가 발생하였습니다.');
          }
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
    const versionNumber = localStorage.getItem('versionNumber');
    const versionCode = localStorage.getItem('versionCode');
    const osType = localStorage.getItem('osType');
    const systemSetting = this.mindManager.getSystemInfo();
    const versionInfo = this.mindManager.getLastVersionInfo();
    systemSetting.autoLogin = false;
    const popupInfo = this.mindManager.getAutoLoginPopupInfo();
    this.mindManager.removeMemberToken();
    StorageUtil.clear();
    localStorage.setItem('versionNumber', versionNumber);
    localStorage.setItem('versionCode', versionCode);
    localStorage.setItem('osType', osType);
    this.mindManager.setAutoLoginPopupInfo(popupInfo);
    this.mindManager.setLastVersionInfo(versionInfo);
    this.mindManager.setSystemInfo(systemSetting);
    this.mindManager.setLockState(false);
    this.pageInfoService.resetPageInfo([]).then(() => {
      this.navController.navigateRoot(['/login']);
    });
  }

  resetData() {
    this.password = [];
    this.pwCount = 0;
  }

}
