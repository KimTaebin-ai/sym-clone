import { Component, OnInit } from '@angular/core';
import {IrbService} from '../../../mind-module/service/irb.service';
import {AlertUtilService} from '../../../util/common/alert-util.service';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {PageInfoService} from '../../../services/page-info.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-update-irb',
  templateUrl: './update-irb.page.html',
  styleUrls: ['./update-irb.page.scss'],
})
export class UpdateIrbPage implements OnInit {

  // IRB
  // 임상 실험 코드
  verificationCode: '';
  irbList: any = [];
  onlineIrb = false;

  constructor(
      private irbService: IrbService,
      private alertUtilService: AlertUtilService,
      private pageInfoService: PageInfoService,
      private navController: NavController,
      private route: ActivatedRoute,
      private router: Router,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.queryParams) {
        if (this.router.getCurrentNavigation().extras.queryParams) {
          const paramData: any = this.router.getCurrentNavigation().extras.queryParams;
          if (paramData.onlineRes) {
            this.onlineIrb = paramData.onlineRes;
          }
        }
      }
    });
    this.getAgreed();
  }

  getAgreed() {
    this.irbService.getAgreed().subscribe(res => {
      for (const i in res) {
        if (res[i].project.projectSeq === 1) {
          if (res[i].useYn === 'Y') {
            this.onlineIrb = true;
          }
        }
      }
      this.irbList = this.irbService.setIrbList(res);
      const data = [];
      for (const i in this.irbList) {
        if (this.irbList[i].useYn === 'Y') {
          const vo = this.irbList[i];
          vo.type = 'OLD';
          data.push(vo);
        }
      }
      this.irbList = data;
    }, err => {
      if (err === '303') {
        this.irbList = [];
        this.onlineIrb = false;
      } else {
        this.alertUtilService.showAlert(null, err);
      }
    });
  }

  /*-------------------------------------------------------*/
  // 오프라인 IRB 등록
  addOfflineAgreement(){
    if (!this.verificationCode) {
      this.alertUtilService.showAlert(null, '임상 시험 코드를 <br>입력해주세요.');
      return false;
    }
    /*    this.termInfo.examCodes.push(this.termInfo.examCode);
        this.termInfo.examCode = '';*/
    this.irbService.addOfflineAgreement(this.verificationCode).subscribe(res => {
      console.log(res)
      this.verificationCode = '';
      const data: any = {
        projectNm: res.project.projectNm,
        projectSeq: res.project.projectSeq,
        agreeSeq: res.agreeSeq,
        type: 'NEW'
      };
      this.irbList.push(data);
    }, err => {
      this.alertUtilService.showAlert(null, ' 임상 시험 코드 입력을<br>실패하였습니다.');
    });
  }

  // 오프라인 IRB 삭제
  delOfflineAgreement(index) {
    this.irbService.delOfflineAgreement(this.irbList[index].agreeSeq).subscribe(res => {
      console.log(index)
      console.log(this.irbList)
      console.log(this.irbList[index])
      this.irbList.splice(index, 1);
    }, err => {
      this.alertUtilService.showAlert(null, ' 임상 시험 코드 삭제를<br>실패하였습니다.');
    });
  }
  /*--------------------------------------------------------*/

  // 약관 모달 실행
  openIrbModal() {
    this.pageInfoService.getToOtherPage('/update-irb', '/irb-agree', '연구 대상자 동의서').then(() => {
      const paramVo = {
        queryParams: {
        },
        animate: false
      }
      const navigationExtras: NavigationExtras = paramVo;
      this.navController.navigateForward(['/irb-agree'], {animated: false});
    });
  }
}
