import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-template',
  templateUrl: './template.page.html',
  styleUrls: ['./template.page.scss'],
})
export class TemplatePage implements OnInit {
  private Title: string = 'test';
  constructor() { }

  ngOnInit() {
    
  }
}
