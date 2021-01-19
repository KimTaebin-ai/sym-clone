import { Component, OnInit } from '@angular/core';
import {PageInfoService} from '../../../services/page-info.service';
import {AlertController, ModalController, NavController} from '@ionic/angular';
import {AuthService} from '../../../mind-module/service/auth.service';
import {TermModalPage} from '../../modal/term-modal/term-modal.page';
import {StorageUtil} from '../../../mind-module/util/storage.util';
import {MindManager} from '../../../mind-module/mind.manager';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  versionInfo: any = this.mindManager.getLastVersionInfo();
  nowVersion = localStorage.getItem('versionNumber');

  constructor(
      private pageInfoService: PageInfoService,
      private navController: NavController,
      private authService: AuthService,
      private modalController: ModalController,
      private mindManager: MindManager,
      private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    console.log(this.versionInfo)
  }

  compareVersion() {
    let returnVal = '';
    const serverVersion = Number(this.versionInfo.version.toString().replace('.', ''));
    const nowVersion = Number(this.nowVersion.toString().replace('.', ''));
    if (nowVersion >= serverVersion) {
      returnVal = '최신버전';
    } else if (serverVersion > nowVersion) {
      returnVal = 'ver' + nowVersion.toString();
    }
    return returnVal;
  }

  updateApp() {
    window.open(this.versionInfo.url, '_system');
  }


  async openTermModal(item) {
    const modal = await this.modalController.create({
      component: TermModalPage,
      cssClass: 'modal60per',
      componentProps: {
        termTitle: item.termName,
        termDetail: item.termContent
      }
    });
    return await modal.present();
  }

  goToPage(url, title) {
    this.pageInfoService.getToOtherPage('/setting', url, title).then(() => {
      this.navController.navigateRoot([url]);
    });
  }

  async showLogoutAlert() {
    const alert = await this.alertCtrl.create({
      header: '알림',
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
        }
      ]
    });
    await alert.present();
  }

  // 로그아웃
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

}
