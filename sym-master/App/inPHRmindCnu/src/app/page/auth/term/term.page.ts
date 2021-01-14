import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../mind-module/service/auth.service';
import {ModalController, NavController} from '@ionic/angular';
import {TermModalPage} from '../../modal/term-modal/term-modal.page';
import {EventBusService} from '../../../event-bus.service';
import {MindManager} from '../../../mind-module/mind.manager';
import {PageInfoService} from '../../../services/page-info.service';

@Component({
  selector: 'app-term',
  templateUrl: './term.page.html',
  styleUrls: ['./term.page.scss'],
})
export class TermPage implements OnInit, OnDestroy {

  termList: any = [];
  selectedTerm: any = [];

  constructor(
      private authService: AuthService,
      private navController: NavController,
      private modalController: ModalController,
      private mindManager: MindManager,
      private pageInfoService: PageInfoService
  ) { }

  ngOnInit() {
    const pageInfo: any = {
      url: '/login',
      title: '약관동의'
    };
    this.mindManager.setPageInfo(pageInfo);
    this.getTermList();
  }

  ngOnDestroy(): void {
  }

  // 약관 리스트 조회
  getTermList() {
    this.authService.getTermList().subscribe(res => {
      if (res.code === 200) {
        console.log('성공');
        console.log(res);
        this.termList = res.data;
      } else {
        this.termList = [];
      }
    }, err => {
      console.log('실패');
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
    const modal = await this.modalController.create({
      component: TermModalPage,
      cssClass: 'modal60per',
      componentProps: {
        termTitle: term,
        termDetail: detail
      }
    });
    return await modal.present();
  }


  // 회원가입으로 이동
  signUp() {
    this.pageInfoService.getToOtherPage('/term', '/sign-up', '회원 가입').then(() => {
      this.navController.navigateRoot(['/sign-up']);
    });
  }
}
