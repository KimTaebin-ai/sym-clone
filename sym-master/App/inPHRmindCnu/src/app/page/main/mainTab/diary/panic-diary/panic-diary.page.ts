import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MindManager} from "../../../../../mind-module/mind.manager";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-panic-diary',
  templateUrl: './panic-diary.page.html',
  styleUrls: ['./panic-diary.page.scss'],
})
export class PanicDiaryPage implements OnInit {
    @ViewChild('inputSD', {static: false}) sd: ElementRef; // 기본값 필요하기 때문에 static: false
    @ViewChild('inputST', {static: false}) st: ElementRef;
    @ViewChild('inputDT', {static: false}) dt: ElementRef;

  panicInsertVo: any = {
    startDate : '',
    startTime : '',
    durationTime : '1',
    panicDegree : 0,
    symptomChoiceList : []
  }
  panicInsertList = [];
  panicInsertOk = 'N';

  // 동반증상 리스트
  panicSymptomList = [
      '심박수 증가',
      '진땀',
      '떨림',
      '호흡곤란',
      '질식감',
      '답답함',
      '구역감(복통)',
      '어지럼증',
      '오한(열감)',
      '감각 이상(마비)',
      '비현실감(이인감)',
      '통제상실(미칠 것 같은 두려움)',
      '죽을 것 같은 두려움'
  ];
  symptomClickList = ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'];


  constructor(
      private navController: NavController,
      private mindManager: MindManager
  ) { }

  ngOnInit() {
      const pageInfo: any = {
          url: '/main/main/diary',
          title: '공황 증상 입력'
      };
      this.mindManager.setPageInfo(pageInfo);
  }

  // 공황 강도 선택
  clickPanicDegree(degree){
    this.panicInsertVo.panicDegree = degree;
  }

  // 공황 증상 선택
  clickPanicSymptom(symptom, num) {
      for(let i = 0; i < 13; i++){
          if(i === num){
              if(this.symptomClickList[i] === 'N'){
                  this.symptomClickList[i] = 'Y';
              } else {
                  this.symptomClickList[i] = 'N';
              }
          }
      }

      const search = this.panicInsertVo.symptomChoiceList.indexOf(symptom);
      if(search != -1){
        this.panicInsertVo.symptomChoiceList.splice(search, 1);
      } else {
          this.panicInsertVo.symptomChoiceList.push(symptom);
      }
  }

  // 공황 추가
  addPanicDiary(){
      if(this.panicInsertVo.startDate == ''){
          this.sd.nativeElement.focus();
      } else if(this.panicInsertVo.startTime == ''){
          this.st.nativeElement.focus();
      } else if(this.panicInsertVo.durationTime == ''){
          this.dt.nativeElement.focus();
      }  else if(this.panicInsertVo.panicDegree == 0){
          // alert();
      }  else if(this.panicInsertVo.symptomChoiceList.length == 0){
          // alert();
      } else {
          this.panicInsertList.push(this.panicInsertVo);
          this.dataReset();
      }
  }

  // 공황 리스트에서 삭제
  deletePanicDiary(index){
      this.panicInsertList.splice(index, 1);
  }


  dataReset(){
      this.panicInsertVo = {
          startDate : '',
          startTime : '',
          durationTime : '',
          panicDegree : 0,
          symptomChoiceList : []
      }
      this.symptomClickList = ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'];
  }

}
