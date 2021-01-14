import { Component, OnInit } from '@angular/core';
import {AlertController} from '@ionic/angular';
import {AlertUtilService} from '../../../../../../util/common/alert-util.service';
import {MindManager} from "../../../../../../mind-module/mind.manager";

@Component({
  selector: 'app-pattern-ex',
  templateUrl: './pattern-ex.page.html',
  styleUrls: ['./pattern-ex.page.scss'],
})
export class PatternExPage implements OnInit {


  patternCount = 0;
  reqVo: any = {
    // MORNING, AFTERNOON, NIGHT
    day: 'MORNING',
    type: 'SOJU'
  };

  reportVo: any = {
    day: 'MORNING',
    dayNm: '오전',
    type: 'BALL',
    typeNm: '구기 종목(축구, 농구 등)',
    count: '3060',
    countNm: '30 ~ 60'
  };

  reportList: any = [
    {
      day: 'AFTERNOON',
      dayNm: '오후',
      dataList: [
        {
          type: 'BALL',
          typeNm: '구기 종목(축구, 농구 등)',
          count: '3060',
          countNm: '30 ~ 60'
        },
        {
          type: 'BALL',
          typeNm: '구기 종목(축구, 농구 등)',
          count: '3060',
          countNm: '30 ~ 60'
        },
        {
          type: 'BALL',
          typeNm: '구기 종목(축구, 농구 등)',
          count: '3060',
          countNm: '30 ~ 60'
        }
      ]
    },
    {
      day: 'MORNING',
      dayNm: '오전',
      dataList: [
        {
          type: 'BALL',
          typeNm: '구기 종목(축구, 농구 등)',
          count: '3060',
          countNm: '30 ~ 60'
        },
        {
          type: 'BALL',
          typeNm: '구기 종목(축구, 농구 등)',
          count: '3060',
          countNm: '30 ~ 60'
        },
        {
          type: 'BALL',
          typeNm: '구기 종목(축구, 농구 등)',
          count: '3060',
          countNm: '30 ~ 60'
        }
      ]
    }
  ];

  constructor(
      private alertCtrl: AlertController,
      private alertUtilService: AlertUtilService,
      private mindManager: MindManager
  ) { }

  ngOnInit() {
    const pageInfo: any = {
      url: '/main/main/diary',
      title: '생활패턴 입력'
    };
    this.mindManager.setPageInfo(pageInfo);

    for (let i = 0; i < this.reportList.length; i++){
      for (let j = 0; j < this.reportList[i].dataList.length; j++){
        this.patternCount++;
      }
    }
  }

  delList(dayIndex, dataIndex) {
    this.reportList[dayIndex].dataList.splice(dataIndex, 1);
    this.patternCount--;
    if (this.reportList[dayIndex].dataList.length === 0) {
      this.reportList.splice(dayIndex, 1);
    }
  }

  // 리스트 삭제 확인창
  async delListConfirmAlert(dayIndex, dataIndex) {
    const alert = await this.alertCtrl.create({
      header: '삭제하기',
      message: '<p class="alert-body">선택하신 목록을<br>삭제하시겠습니까?</p>',
      buttons: [
        {
          text: '예',
          handler: data => {
            this.delList(dayIndex, dataIndex);
          }
        },
        {
          text: '아니요',
          role: 'cancel',
          handler: data => {
          }
        }
      ]
    });
    await alert.present();
  }

  // 오전,오후,저녁 선택
  selectDay(type) {
    this.reportVo.day = type;
    if (type === 'MORNING') {
      this.reportVo.dayNm = '오전';
    } else if (type === 'AFTERNOON') {
      this.reportVo.dayNm = '오후';
    } else if (type === 'NIGHT') {
      this.reportVo.dayNm = '저녁';
    }
  }

  // 리스트 추가 확인창
  async addReportConfirmAlert() {
    const alert = await this.alertCtrl.create({
      header: '추가하기',
      message: '<p class="alert-body">추가하시겠습니까?</p>',
      buttons: [
        {
          text: '예',
          handler: data => {
            this.addReport();
          }
        },
        {
          text: '아니요',
          role: 'cancel',
          handler: data => {
          }
        }
      ]
    });
    await alert.present();
  }

  addReport() {
    if (!this.reportVo.count) {
      this.alertUtilService.showAlert(null, '운동 시간을 선택해주세요.');
      return false;
    }

    if (!this.reportVo.day) {
      this.alertUtilService.showAlert(null, '운동한 시간을 선택해주세요.');
      return false;
    }

    if (!this.reportVo.type) {
      this.alertUtilService.showAlert(null, '운동 종류를 선택해주세요.');
      return false;
    }
    if (this.reportVo.type === 'BALL') {
      this.reportVo.typeNm = '구기 종목(축구, 농구 등)';
    }

    if (this.reportVo.count === '3060') {
      this.reportVo.countNm = '30 ~ 60';
    }

    const returnData: any = this.reportList;
    loop : for (let i = 0; i < returnData.length; i++) {
      if (this.findData(returnData, this.reportVo.day, 'DAY')) {
        if (returnData[i].day === this.reportVo.day) {
          const data: any = {
            type: this.reportVo.type,
            typeNm: this.reportVo.typeNm,
            count: this.reportVo.count,
            countNm: this.reportVo.countNm
          }
          this.reportList[i].dataList.push(data);
          this.alertUtilService.showAlert(null, '추가 되었습니다.');
          this.patternCount = 0;
          for (let numIn = 0; numIn < this.reportList.length; numIn++){
            for (let numOut = 0; numOut < this.reportList[numIn].dataList.length; numOut++){
              this.patternCount++;
            }
          }
          break loop;
        }
      } else {
        const data: any = {
          day: this.reportVo.day,
          dayNm: this.reportVo.dayNm,
          dataList: [
            {
              type: this.reportVo.type,
              typeNm: this.reportVo.typeNm,
              count: this.reportVo.count,
              countNm: this.reportVo.countNm
            }
          ]
        };
        this.reportList.push(data);
        this.alertUtilService.showAlert(null, '추가 되었습니다.');
        this.patternCount = 0;
        for (let numIn = 0; numIn < this.reportList.length; numIn++){
          for (let numOut = 0; numOut < this.reportList[numIn].dataList.length; numOut++){
            this.patternCount++;
          }
        }
        break loop;
      }
    }
    console.log(this.reportList);
  }

  findData(data, findItem, type) {
    let returnVal = false;
    if (type === 'DAY') {
      for (let i = 0; i < data.length; i++) {
        if (data[i].day === findItem) {
          returnVal = true;
        }
      }
    } else if (type === 'TYPE') {
      for (let i = 0; i < data.length; i++) {
        if (data[i].type === findItem) {
          returnVal = true;
        }
      }
    }
    return returnVal;
  }
}
