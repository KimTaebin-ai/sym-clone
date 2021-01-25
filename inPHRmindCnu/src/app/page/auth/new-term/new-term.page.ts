import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../mind-module/service/auth.service';
import {AlertController, ModalController, NavController} from '@ionic/angular';
import {MindManager} from '../../../mind-module/mind.manager';
import {PageInfoService} from '../../../services/page-info.service';
import {CommonUtilService} from '../../../util/common/common-util.service';
import {LoadingService} from '../../../util/loading.service';
import {TermModalPage} from '../../modal/term-modal/term-modal.page';
import {StorageUtil} from '../../../mind-module/util/storage.util';
import {ActivatedRoute, NavigationExtras} from '@angular/router';
import {AlertUtilService} from '../../../util/common/alert-util.service';

@Component({
  selector: 'app-new-term',
  templateUrl: './new-term.page.html',
  styleUrls: ['./new-term.page.scss'],
})
export class NewTermPage implements OnInit {



  termList: any = [];
  selectedTerm: any = [];
  pageType = '';
  constructor(
      private authService: AuthService,
      private navController: NavController,
      private modalController: ModalController,
      private mindManager: MindManager,
      private pageInfoService: PageInfoService,
      private commonUtilService: CommonUtilService,
      private ladingService: LoadingService,
      private alertCtrl: AlertController,
      private route: ActivatedRoute,
      private alertUtilService: AlertUtilService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.pageType = params.type;

      }
    });
    this.getTermList();
  }

  ionViewDidEnter() {
  }


  // 약관 리스트 조회
  getTermList() {
    this.authService.getTermInfoList().subscribe(res => {
      for (const item of res) {
        if (item.agreeDt === null) {
          this.termList.push(item);
        }
      }
    }, err => {
      console.log(err);
      this.termList = [];
    });
  }

  // 약관 모두 동의
  selectAll() {
    if (this.selectedTerm.length === this.termList.length) {
      this.selectedTerm = [];
    } else {
      for (let i = 0; i < this.termList.length; i++) {
        if (this.selectedTerm.indexOf(i) === -1) {
          this.selectedTerm.push(i);
        }
      }
    }
  }

  // 약관 선택
  selectTerm(index) {
    const indexOf = this.selectedTerm.indexOf(index);
    if (indexOf === -1) {
      this.selectedTerm.push(index);
    } else {
      this.selectedTerm.splice(indexOf, 1);
    }
  }

  // 선택된 약관 확인
  checkTermYn(type, index) {
    if (type === 'ALL') {
      if (this.selectedTerm.length === this.termList.length) {
        return true;
      } else {
        return false;
      }
    } else if ('LIST') {
      const indexOf = this.selectedTerm.indexOf(index);
      if (indexOf === -1) {
        return false;
      } else {
        return true;
      }
    } else if ('BUTTON') {
      if (this.selectedTerm.length === this.termList.length) {
        return true;
      } else {
        return false;
      }
    }
  }


  async openModal(term, detail) {
    this.mindManager.setModalONOff('ON');
    const modal = await this.modalController.create({
      component: TermModalPage,
      cssClass: 'modal60per',
      componentProps: {
        termTitle: term,
        termDetail: detail
      }
    });
    modal.onDidDismiss()
        .then(() => {
          this.mindManager.setModalONOff('OFF');
        });
    return await modal.present();
  }

  async disagreeTerm() {
    const alert = await this.alertCtrl.create({
      header: '로그아웃',
      message: '로그아웃 하시겠습니까?',
      buttons: [
        {
          text: '예',
          handler: data => {
            this.logout();
          }
        },
        {
          text: '아니요',
          role: 'cancel',
          handler: data => {
          }
        }
      ],
      backdropDismiss: false
    });
    await alert.present();
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

  // 회원가입으로 이동
  saveTerm() {
    console.log(this.selectedTerm)
    const reqVo = [];
    for (const item of this.selectedTerm) {
      reqVo.push(this.termList[item].termSeq);
    }
    this.authService.agreeNewTerm(reqVo).subscribe(res => {
      if (this.pageType === 'autoLoginY') {
        const data: any = {
          url: '/lock',
          title: '잠금화면'
        };
        this.pageInfoService.resetPageInfo(data).then(() => {
          const paramVo = {
            queryParams: {
              code: 1,
              pwYn: false
            }
          };
          const lockPassword = this.mindManager.getLockPw();
          paramVo.queryParams.pwYn = lockPassword ? true : false;
          const navigationExtras: NavigationExtras = paramVo;
          this.navController.navigateRoot(['/lock'], navigationExtras);
        });
      } else {
        const data: any = {
          url: '/main/main/home',
          title: '메인페이지/홈'
        };
        this.pageInfoService.resetPageInfo(data).then(() => {
          this.navController.navigateRoot(['/main/main/home']);
        });
      }
    }, error => {
      this.alertUtilService.showAlert(null, '추가 약관을 동의 받는 도중 오류가 발생하였습니다.');
    });

  }
}
