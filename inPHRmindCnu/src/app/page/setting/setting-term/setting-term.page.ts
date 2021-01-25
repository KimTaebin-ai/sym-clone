import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../mind-module/service/auth.service';
import {TermModalPage} from '../../modal/term-modal/term-modal.page';
import {MindManager} from '../../../mind-module/mind.manager';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-setting-term',
  templateUrl: './setting-term.page.html',
  styleUrls: ['./setting-term.page.scss'],
})
export class SettingTermPage implements OnInit {

  termInfoList: any = [];

  constructor(
      private authService: AuthService,
      private mindManager: MindManager,
      private modalController: ModalController
  ) { }

  ngOnInit() {
    this.getTermList();
  }

  getTermList() {
    this.authService.getTermInfoList().subscribe(res => {
      console.log(res)
      this.termInfoList = res;
    }, err => {

    });
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
}
