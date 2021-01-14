import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageInfoService} from '../../../services/page-info.service';
import {NavController} from '@ionic/angular';
import {EventBusService} from '../../../services/event-bus.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit, OnDestroy {

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
  };

  // 이벤트 버스
  eventSubscription: Subscription;

  constructor(
      private pageInfoService: PageInfoService,
      private navController: NavController,
      private eventBusService: EventBusService,
      private router: Router,
  ) { }

  ngOnInit() {
    const from = this.router.url;
    if (from.startsWith('/main/main/home')) {
      this.selectTab('HOME');
    } else if (from.startsWith('/main/main/mind-report')) {
      this.selectTab('REPORT');
    } else if (from.startsWith('/main/main/diary')) {
      this.selectTab('DIARY');
    } else if (from.startsWith('/main/main/psychological-scale')) {
      this.selectTab('SCALE');
    }
    this.eventSubscription = this.eventBusService.tabInfo$.subscribe(event => {
      this.selectTab(event);
    });
  }

  ngOnDestroy(): void {
    this.eventSubscription?.unsubscribe();
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
/*      this.pageInfoService.moveToTab('/main/main/tab1', '메인화면/홈').then(data => {
        this.navController.navigateRoot(['/main/main/tab1']);
      });*/

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
