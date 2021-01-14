import { Component, OnInit } from '@angular/core';
import {PageInfoService} from '../../../services/page-info.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  tab = 'HOME';
  imgNm: any = {
    home: 'assets/image/mainTabIcon/Icon_home.svg',
    report: 'assets/image/mainTabIcon/Icon_report_n.svg',
    diary: 'assets/image/mainTabIcon/Icon_diary_n.svg',
    chart: 'assets/image/mainTabIcon/Icon_chart_n.svg',
  }

  activeTab: any = {
    home: true,
    report: false,
    diary: false,
    scale: false
  }
  constructor(
      private pageInfoService: PageInfoService,
      private navController: NavController,
  ) { }

  ngOnInit() {
  }

  selectTab(tabNm) {
    if (tabNm === 'HOME') {
      this.imgNm = {
        home: 'assets/image/mainTabIcon/Icon_home.svg',
        report: 'assets/image/mainTabIcon/Icon_report_n.svg',
        diary: 'assets/image/mainTabIcon/Icon_diary_n.svg',
        chart: 'assets/image/mainTabIcon/Icon_chart_n.svg',
      };

      this.changeTab('home');
      this.pageInfoService.moveToTab('/main/main/home', '메인화면/홈').then(data => {
        this.navController.navigateRoot(['/main/main/home']);
      });

    } else if (tabNm === 'REPORT') {
      this.imgNm = {
        home: 'assets/image/mainTabIcon/Icon_home_n.svg',
        report: 'assets/image/mainTabIcon/Icon_report.svg',
        diary: 'assets/image/mainTabIcon/Icon_diary_n.svg',
        chart: 'assets/image/mainTabIcon/Icon_chart_n.svg',
      };
      this.changeTab('report');
      this.pageInfoService.moveToTab('/main/main/mind-report', '메인화면/리포트').then(data => {
        this.navController.navigateRoot(['/main/main/mind-report']);
      });
    } else if (tabNm === 'DIARY') {
      this.imgNm = {
        home: 'assets/image/mainTabIcon/Icon_home_n.svg',
        report: 'assets/image/mainTabIcon/Icon_report_n.svg',
        diary: 'assets/image/mainTabIcon/Icon_diary.svg',
        chart: 'assets/image/mainTabIcon/Icon_chart_n.svg',
      };
      this.changeTab('diary');
      this.pageInfoService.moveToTab('/main/main/diary', '메인화면/다이어리').then(data => {
        this.navController.navigateRoot(['/main/main/diary']);
      });
    } else if (tabNm === 'SCALE') {
      this.imgNm = {
        home: 'assets/image/mainTabIcon/Icon_home_n.svg',
        report: 'assets/image/mainTabIcon/Icon_report_n.svg',
        diary: 'assets/image/mainTabIcon/Icon_diary_n.svg',
        chart: 'assets/image/mainTabIcon/Icon_chart.svg',
      };
      this.changeTab('scale');
      this.pageInfoService.moveToTab('/main/main/psychological-scale', '메인화면/심리척도').then(data => {
        this.navController.navigateRoot(['/main/main/psychological-scale']);
      });
    }
    this.tab = tabNm;
  }

  changeTab(type) {
    for (const key in this.activeTab) {
      const pageKey = this.activeTab[key];
      if (type === key) {
        this.activeTab[key] = true;
      } else {
        this.activeTab[key] = false;
      }
    }
  }
}
