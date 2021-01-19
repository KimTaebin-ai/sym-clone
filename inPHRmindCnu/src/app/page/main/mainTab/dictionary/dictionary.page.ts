import { Component, OnInit } from '@angular/core';
import {DictionaryService} from '../../../../mind-module/service/dictionary.service';
import {ResponseCode} from '../../../../mind-module/data/response.data';
import {AlertUtilService} from '../../../../util/common/alert-util.service';
import {DiaryRegModalPage} from '../../../modal/diary-reg-modal/diary-reg-modal.page';
import {ModalController} from '@ionic/angular';
import {DictionaryModalPage} from '../../../modal/dictionary-modal/dictionary-modal.page';
import {MindManager} from '../../../../mind-module/mind.manager';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.page.html',
  styleUrls: ['./dictionary.page.scss'],
})
export class DictionaryPage implements OnInit {

  // ---증상백과-----------------------------------
  searchKey = '';
  dictionaryList: any = [];

  pageInfo: any = {
    page: 1,
    key: '',
    totalPage: 0
  };

  checkNoData: any = {
    searchKey: '',
    noDataYn : false
  };

  constructor(
      private dictionaryService: DictionaryService,
      private alertUtilService: AlertUtilService,
      private modalController: ModalController,
      private mindManager: MindManager
  ) { }

  ngOnInit() {
    this.getDictionaryList();
  }

  // ---증상백과-----------------------------------

  // 증상백과 조회 타입 제어
  getDictionaryList() {
    if (this.pageInfo.key) {
      this.getListWithKey();
    } else {
      this.getListWithoutKey();
    }
  }

  // 키를 포함한 증상백과 리스트 검색
  getListWithKey() {
    this.searchKey = this.pageInfo.key;
    console.log(this.pageInfo.key)
    this.dictionaryService.getDictionaryListWithKey(this.pageInfo).subscribe(res => {

      for (const item of res.encyclopediaList) {
        this.dictionaryList.push(item);
      }
      this.pageInfo.totalPage = res.totalPage;
      this.checkNoData.searchKey = '';
      this.checkNoData.noDataYn = false;
    }, err => {
      if (err.code !== ResponseCode.NO_MATCHING) {
        this.alertUtilService.showAlert(null, err.message);
      }
      this.checkNoData.searchKey = this.pageInfo.page === 1 ? this.searchKey : '' ;
      this.checkNoData.noDataYn = this.pageInfo.page === 1 ? true : false;
      this.dictionaryList = this.pageInfo.page === 1 ? [] : this.dictionaryList;
      this.pageInfo.page = this.pageInfo.page === 1 ? 1 : this.pageInfo.page - 1;
    });
  }

  // 키를 포함하지 않은 증상백과 리스트 검색
  getListWithoutKey() {
    console.log(this.pageInfo)
    this.dictionaryService.getDictionaryList(this.pageInfo).subscribe(res => {
      for (const item of res.encyclopediaList) {
        this.dictionaryList.push(item);
      }
      this.pageInfo.totalPage = res.totalPage;
      this.checkNoData.searchKey = '';
      this.checkNoData.noDataYn = false;
    }, err => {
      if (err.code !== ResponseCode.NO_MATCHING) {
        this.alertUtilService.showAlert(null, err.message)
      }
      this.checkNoData.noDataYn = this.pageInfo.page === 1
      this.dictionaryList = this.pageInfo.page === 1 ? [] : this.dictionaryList;
      this.pageInfo.page = this.pageInfo.page === 1 ? 1 : this.pageInfo.page - 1;
      this.checkNoData.searchKey = '' ;
    });
  }

  searchDictionary() {
    this.pageInfo.page = 1;
    this.dictionaryList = [];
    console.log(this.searchKey)
    this.pageInfo.key = this.searchKey;
    this.getDictionaryList();
  }

  enterEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.searchDictionary();
    }
  }



  /*---------기타---------------------------------*/

  // infiniteScroll적용
  loadData(event){
    setTimeout(() => {
      this.pageInfo.page++;
      event.target.complete();
      this.getDictionaryList();
      if (this.pageInfo.page >= this.pageInfo.totalPage){
        event.target.disabled = true;
      }
    }, 500);
  }

  // 증상 백과 상세 화면 모달
  async openDetailModal(seq) {
    this.mindManager.setModalONOff('ON');
    const modal = await this.modalController.create({
      component: DictionaryModalPage,
      componentProps: {
        seq
      }
    });
    modal.onDidDismiss()
        .then(() => {
          this.mindManager.setModalONOff('OFF');
        });
    return await modal.present();
  }
/*
  searchDictionary() {
    if (this.searchText) {
      const returnVal: any = [];
      for (let i = 0; i < this.dictionaryList.length; i++) {
        if (this.dictionaryList[i].dictionaryItem.indexOf(this.searchText) !== -1) {
          returnVal.push(this.dictionaryList[i]);
        }
      }
      this.dictionaryListCopy = returnVal;
    } else {
      this.dictionaryListCopy = this.dictionaryList;
    }
  }*/
  // ---------------------------------------------

}
