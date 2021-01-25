import {Component, Input, OnInit} from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {MindManager} from '../../../mind-module/mind.manager';
import {ActivatedRoute, NavigationExtras} from '@angular/router';
import * as moment from 'moment';
import {ResponseCode} from '../../../mind-module/data/response.data';
import {ReportService} from '../../../report.service';
import {PageInfoService} from '../../../services/page-info.service';
import {Subscription} from 'rxjs';
import {EventBusService} from '../../../services/event-bus.service';

@Component({
  selector: 'app-pattern-report',
  templateUrl: './pattern-report.page.html',
  styleUrls: ['./pattern-report.page.scss'],
})
export class PatternReportPage implements OnInit {
  @Input() type: string;
  @Input() startDt: string;
  patternDetail : any = {
    startDt : '',
    type : '',
    typeNm : ''
  }
  patternAllDataList: any = [];
  patternCodeList : any = [];

  eventSubscription: Subscription;

  constructor(
      private navController: NavController,
      private mindManager: MindManager,
      private route: ActivatedRoute,
      private reportService: ReportService,
      private pageInfoService: PageInfoService,
      private modalController: ModalController,
      private eventBusService: EventBusService
  ) { }

  ngOnInit() {
    this.patternDetail.type = this.type;
    this.patternDetail.startDt = this.startDt;
    this.getCodeList();
    this.pickPatternType();
    this.getPatternDataList();

    this.eventSubscription = this.eventBusService.modal$.subscribe(event => {
      if (event === 'OFF') {
        this.modalController.dismiss({
          dismissed: true
        });
      }
    });
  }

  ionViewWillEnter() {

  }

  // 코드 리스트 조회
  getCodeList(){
    if(this.patternDetail.type === 'drink' || this.patternDetail.type === 'caffeine') {
      let groupId;
      if (this.patternDetail.type === 'drink') {
        groupId = 'alcohol';
      } else if (this.patternDetail.type === 'caffeine') {
        groupId = 'caffeine';
      }
      this.reportService.getCodeList(groupId).subscribe(res => {
        this.patternCodeList = res.data;
        console.log('patternCodeList', this.patternCodeList);
      }, err => {
        console.log('err', err);
      });
    }
  }

  // 조회할 리포트 타입 설정
  pickPatternType(){
    if(this.patternDetail.type === 'drink'){
      this.patternDetail.typeNm = '음주';
    } else if(this.patternDetail.type === 'caffeine'){
      this.patternDetail.typeNm = '카페인';
    } else if(this.patternDetail.type === 'exercise'){
      this.patternDetail.typeNm = '운동';
    } else if(this.patternDetail.type === 'smoke'){
      this.patternDetail.typeNm = '흡연';
    } else if(this.patternDetail.type === 'meal'){
      this.patternDetail.typeNm = '식사';
    } else if(this.patternDetail.type === 'menstruation'){
      this.patternDetail.typeNm = '생리';
    }
  }

  // 생활패턴 데이터 조회
  getPatternDataList(){
    const reqVo = {
      startDt : moment(this.patternDetail.startDt).format('YYYY-MM-DD'),
      type : this.patternDetail.type
    }
    this.reportService.getPatternDataList(reqVo).subscribe(res => {
      console.log('res', res.data);
      if(res.data) {
        const patternDataList = res.data.data;
        if (this.patternDetail.type === 'smoke' || this.patternDetail.type === 'meal' || this.patternDetail.type === 'menstruation') {
          this.patternAllDataList = res.data.data;
        } else {
          for (let pattern in patternDataList) {
            this.patternAllDataList.push(
                {
                  date: pattern,
                  values: patternDataList[pattern]
                }
            )
          }
        }
      }
    }, err => {
      console.log('err', err);
    });
  }

  // 입력창 유닛 설정
  checkUnit(patternCode){
    if(patternCode) {
      const index = this.patternCodeList.findIndex(obj => obj.codeSeq == patternCode);
      const unit = this.patternCodeList[index].unit;

      return unit;
    }
  }

  // 뒤로 가기
  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

}
