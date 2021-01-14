import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-insert-psychological-scale',
  templateUrl: './insert-psychological-scale.page.html',
  styleUrls: ['./insert-psychological-scale.page.scss'],
})
export class InsertPsychologicalScalePage implements OnInit {

  // 복수형 답변
  multipleAnswers: any = {
   answers: [],
   answer: ''
  }

  constructor() { }

  ngOnInit() {
  }

  addMultipleAnswers(type) {
    if (type === '1-3') {
      this.multipleAnswers.answers.push(this.multipleAnswers.answer);
      this.multipleAnswers.answer = '';
    }
  }

  delMultipleAnswers(index, type) {
    if (type === '1-3') {
      this.multipleAnswers.answers.splice(index, 1);
    }
  }

}
