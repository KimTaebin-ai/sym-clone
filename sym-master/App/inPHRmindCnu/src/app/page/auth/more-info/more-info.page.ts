import {Component, OnInit, ViewChild} from '@angular/core';
import {IonContent, ModalController, NavController} from '@ionic/angular';
import {TermModalPage} from '../../modal/term-modal/term-modal.page';
import {MoreInfoModalPage} from '../../modal/more-info-modal/more-info-modal.page';
import {AlertUtilService} from '../../../util/common/alert-util.service';
import {NavigationExtras} from '@angular/router';
import {MindManager} from '../../../mind-module/mind.manager';
import {PageInfoService} from '../../../services/page-info.service';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.page.html',
  styleUrls: ['./more-info.page.scss'],
})
export class MoreInfoPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  infoPage = 1;

  // 시험코드
  termInfo: any = {
    examCodes: [],
    examCode: '',
    termYn: 'N'
  }

  diseaseInfo: any = {
    selectedList: [],
    diseaseList: [
      {
        codeId: 'a',
        codeName: '우울장애',
        modalResultYn: 'N',
        detail: {
          year: '',
          month: '',
          diseases: []
        }
      },
      {
        codeId: 'b',
        codeName: '우울장애',
        modalResultYn: 'N',
        detail: {
          year: '',
          month: '',
          diseases: []
        }
      },
      {
        codeId: 'c',
        codeName: '우울장애',
        modalResultYn: 'N',
        detail: {
          year: '',
          month: '',
          diseases: []
        }
      },
      {
        codeId: 'd',
        codeName: '우울장애',
        modalResultYn: 'N',
        detail: {
          year: '',
          month: '',
          diseases: []
        }
      },
      {
        codeId: 'etc',
        codeName: '알코올 의존 혹은 기타 물질 관련 장애',
        modalResultYn: 'N'
      },
    ]
  };


  constructor(
      private modalController: ModalController,
      private alertUtilService: AlertUtilService,
      public navController: NavController,
      private mindManager: MindManager,
      private pageInfoService: PageInfoService
  ) {}

  ngOnInit() {
  }

  selectList(i, type) {
    if (type === 'DISEASE') {
      if (this.diseaseInfo.selectedList.indexOf(i) === -1) {
        this.diseaseInfo.selectedList.push(i);
        console.log(this.diseaseInfo.selectedList);
      } else {
        const index = this.diseaseInfo.selectedList.indexOf(i);
        this.diseaseInfo.selectedList.splice(index, 1);
        console.log(this.diseaseInfo.selectedList);
      }
    }
  }

  async selectMoreInfoModal(i, item, type) {
    if (type === '10-1') {
      if (this.diseaseInfo.diseaseList[i].modalResultYn === 'Y') {
        this.diseaseInfo.diseaseList[i].modalResultYn = 'N';
        this.diseaseInfo.diseaseList[i].detail = {};
      } else {
        const modal = await this.modalController.create({
          component: MoreInfoModalPage,
          cssClass: 'moreInfoModal1',
          componentProps: {
            diseaseNm: item.codeName,
            type
          },
          backdropDismiss: false
        });

        modal.onDidDismiss()
            .then((data) => {
              if (data.data.modalResultYn === 'Y') {
                if (data.data.data) {
                  this.diseaseInfo.diseaseList[i].detail = data.data.data;
                }
                this.diseaseInfo.diseaseList[i].modalResultYn = 'Y';
              }
            });

        return await modal.present();
      }
    } else if (type === '3-1') {
      if (this.diseaseInfo.diseaseList[i].modalResultYn === 'Y') {
        this.diseaseInfo.diseaseList[i].modalResultYn = 'N';
        this.diseaseInfo.diseaseList[i].detail = {};
      } else {
        const modal = await this.modalController.create({
          component: MoreInfoModalPage,
          cssClass: 'moreInfoModal2',
          componentProps: {
            diseaseNm: item.codeName,
            type
          },
          backdropDismiss: false
        });

        modal.onDidDismiss()
            .then((data) => {
              if (data.data.modalResultYn === 'Y') {
                if (data.data.data) {
                  this.diseaseInfo.diseaseList[i].detail = data.data.data;
                }
                this.diseaseInfo.diseaseList[i].modalResultYn = 'Y';
              }
            });

        return await modal.present();
      }
    }

  }


  checkSelectIndex(i, type) {
    if (type === 'DISEASE') {
      if (this.diseaseInfo.selectedList.indexOf(i) >= 0) {
        return true;
      } else {
        return false;
      }
    }
  }

  nextPage() {
    if (this.infoPage === 8) {
      console.log('더이상 페이지가 없음');
    } else {
      this.content.scrollToTop();
      this.infoPage++;
    }
    if (this.infoPage === 8) {
      setTimeout(function() {
        console.log('Works!');
        const ionRangePin = document.querySelector('ion-range').shadowRoot.querySelector('.range-slider').querySelector('.range-pin');
        const ionRangeSlider = document.querySelector('ion-range').shadowRoot.querySelector('.range-slider');
        ionRangePin.setAttribute('style',
            '' +
            'align-items: center;' +
            'display: grid;position: relative;' +
            'top: -6vh;right: 27%;' +
            'transition: transform 0.12s ease 0s, -webkit-transform 0.12s ease 0s;' +
            'color: var(--ion-text-color,#000);' +
            'font-size: 1rem;text-align: center;' +
            'font-weight: 900;' +
            'width: 16vw;' +
            'height: 5vh;' +
            'border-radius: 4px;' +
            'padding: 0;' +
            'content: " %";' +
            'box-shadow: rgba(83, 85, 155, 0.18) 0px 1px 8px 0px;' +
            ''
        );

        ionRangePin.textContent = `0%`;
        ionRangeSlider.querySelector('.range-knob-handle')
            .addEventListener('pointermove', function () {
              const value = this.getAttribute('aria-valuenow');
              this.querySelector('.range-pin').textContent = `${value}%`;
            });

        ionRangeSlider.querySelector('.range-knob-handle').setAttribute('style', 'top: 0;');
        ionRangeSlider.querySelector('.range-knob').setAttribute('style', 'border: 0.6vh solid #44bbc8;');

      }, 200);

      /**/
    }
  }

  // 시험코드 추가
  addExamCode() {
    if (!this.termInfo.examCode) {
      this.alertUtilService.showAlert(null, '임상 시험 코드를 <br>입력해주세요.');
      return false;
    }
    this.termInfo.examCodes.push(this.termInfo.examCode);
    this.termInfo.examCode = '';
  }

  // 시험코드 삭제
  delExamCode(index) {
    this.termInfo.examCodes.splice(index, 1);
  }

  // 약관 모달 실행
  openTermModal() {
    this.pageInfoService.getToOtherPage('/more-info', '/irb-agree', '연구 대상자 동의서');
    this.navController.navigateRoot(['/irb-agree']);
  }

  goBack() {
    if (this.infoPage === 1) {
      console.log('더이상 페이지가 없음');
    } else {
      this.infoPage--;
    }
  }
}
