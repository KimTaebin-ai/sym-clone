import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {MindManager} from "../../../mind-module/mind.manager";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-pattern-report',
  templateUrl: './pattern-report.page.html',
  styleUrls: ['./pattern-report.page.scss'],
})
export class PatternReportPage implements OnInit {

  patternDetail : any = {
    patternType : '',
    patternTypeNm : '',
    patternDataList : [{
      date : '',
      dataList : [{
        typeNm : '',
        ammount: ''
      }]
    }],
  }

  dringkingList : any = [
    {
      date : '2020.11.20',
      dataList : [{
        typeNm : '소주',
        ammount: '2'
      }]
    },
    {
      date : '2020.12.02',
      dataList : [{
        typeNm : '맥주',
        ammount: '1'
      },{
        typeNm : '양주',
        ammount: '1'
      }]
    },
    {
      date : '2020.12.07',
      dataList : [{
        typeNm : '막걸리',
        ammount: '2'
      }]
    }
  ]

  constructor(
      private navController: NavController,
      private mindManager: MindManager,
      private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.patternDetail.patternType = params.patternType;
      }
    });

    this.justicePatternType();

    const pageInfo: any = {
      url: '/mind-report',
      title: this.patternDetail.patternTypeNm + ' 리포트'
    };
    this.mindManager.setPageInfo(pageInfo);
  }

  ionViewWillEnter() {

  }

  justicePatternType(){
    if(this.patternDetail.patternType === 'drinking'){
      this.patternDetail = {
        patternType : 'drinking',
        patternTypeNm : '음주',
        patternDataList : this.dringkingList
      }
    } else if(this.patternDetail.patternType === 'smoking'){
      this.patternDetail = {
        patternType : 'smoking',
        patternTypeNm : '흡연',
        patternDataList : this.dringkingList
      }
    } else if(this.patternDetail.patternType === 'caffeine'){
      this.patternDetail = {
        patternType : 'caffeine',
        patternTypeNm : '카페인',
        patternDataList : this.dringkingList
      }
    } else if(this.patternDetail.patternType === 'meal'){
      this.patternDetail = {
        patternType : 'meal',
        patternTypeNm : '식사',
        patternDataList : this.dringkingList
      }
    } else if(this.patternDetail.patternType === 'ex'){
      this.patternDetail = {
        patternType : 'ex',
        patternTypeNm : '운동',
        patternDataList : this.dringkingList
      }
    } else if(this.patternDetail.patternType === 'physiology'){
      this.patternDetail = {
        patternType : 'physiology',
        patternTypeNm : '생리',
        patternDataList : this.dringkingList
      }
    }
  }

}
