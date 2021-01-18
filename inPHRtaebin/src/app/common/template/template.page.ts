import { Component, Input, OnInit, Output } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { PageInfoService } from 'src/app/services/page-info.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.page.html',
  styleUrls: ['./template.page.scss'],
})
export class TemplatePage implements OnInit {
  private Title: string;
  private URL: string;

  constructor(private router: Router, private pageInfoService: PageInfoService) { }

  ngOnInit() {
    this.getPage();
  }

  //라우터 별 데이터

  getPage() {
    const page = 'home';
    const userData: any = {name: '김태빈'};
    const data = this.pageInfoService.getPageInfo(userData);
    this.Title = data.home.page_title;
    
  }
}
