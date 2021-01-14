import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sleeps',
  templateUrl: './sleeps.page.html',
  styleUrls: ['./sleeps.page.scss'],
})
export class SleepsPage implements OnInit {

  test: any = {
    deep: 330,
    light: 355,
    rem: 298,
    normal: 800,
    awake: 200,
    awakeCount: 0
  }

  sleepChart: any = {
    deep: 0,
    light: 0,
    rem: 0,
    normal: 0,
    awake: 0,
    awakeCount: 0
  }

  sleepChartLabel: any = {
    deep: 0,
    light: 0,
    rem: 0,
    normal: 0,
    awake: 0,
    awakeCount: 0
  }
  constructor() { }

  ngOnInit() {
    let sum = 0;
    for (const [key, value] of Object.entries(this.test)) {
      if (key !== 'awakeCount') {
        sum = sum + Number(value);
      }
    }
    console.log(sum)
    this.sleepChart = {
      deep: (this.test.deep / sum * 100) * 12 / 100,
      light: (this.test.light / sum * 100) * 12 / 100,
      rem: (this.test.rem / sum * 100) * 12 / 100,
      normal: (this.test.normal / sum * 100) * 12 / 100,
      awake: (this.test.awake / sum * 100) * 12 / 100,
      awakeCount: this.test.awakeCount
    };
    this.sleepChartLabel = {
      deep: Math.round(this.test.deep / sum * 100),
      light: Math.round(this.test.light / sum * 100),
      rem: Math.round(this.test.rem / sum * 100),
      normal: Math.round(this.test.normal / sum * 100),
      awake: Math.round(this.test.awake / sum * 100),
      awakeCount: this.test.awakeCount
    }

    let test = 0;
    for (const [key, value] of Object.entries(this.sleepChart)) {
      if (key !== 'awakeCount') {
        test = test + Number(value);
      }
    }
    console.log(this.sleepChart)
    console.log(test)
  }

}
