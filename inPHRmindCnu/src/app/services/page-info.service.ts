import { Injectable } from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {MindManager} from '../mind-module/mind.manager';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class PageInfoService {

  constructor(
      private mindManager: MindManager,
      private router: Router
  ) { }

  getPageInfo(type) {
    const pageInfo = this.mindManager.getPageInfo();
    let value = '';
    if (pageInfo.length) {
      if (type === 'title') {
        value = pageInfo[pageInfo.length - 1].title;
      } else {
        value = pageInfo[pageInfo.length - 1].url;
      }
    }
    return value;
  }

  getToBack() {
    const pageInfo = this.mindManager.getPageInfo();
    let url = '';
    const from = this.router.url;
    const fromArray = from.split('?');
    if (fromArray[0].indexOf('login') !== -1) {
      // toast 창
      url = 'TOAST';
    } else if (fromArray[0].indexOf('lock') !== -1) {
      url = 'LOGOUT';
    } else {
      if (pageInfo.length > 1) {
        if (pageInfo[pageInfo.length - 1].url.indexOf('main') >= 0 )  {
          if (pageInfo[pageInfo.length - 2].url.indexOf('main') === -1) {
            for (let i = pageInfo.length - 1; i >= 0; i--) {
              if (pageInfo[i].url.indexOf('main') === -1) {
                pageInfo.splice(i, 1);
              } else {
                break;
              }
            }
          }
        }
        const lastData = pageInfo[pageInfo.length - 2];
        this.resetDatas(lastData.url, 'MOVE');
        url = lastData.url;
        pageInfo.pop();
        this.mindManager.setPageInfo(pageInfo);
      } else {
        // toast 창
        url = 'TOAST';
      }
    }
    return url;
  }

  moveToPageForLock() {
    const pageInfo = this.mindManager.getPageInfo();
    let url = '';
    if (pageInfo.length > 1) {
      if (pageInfo[pageInfo.length - 1].url.indexOf('main') >= 0 )  {
        if (pageInfo[pageInfo.length - 2].url.indexOf('main') === -1) {
          for (let i = pageInfo.length - 1; i >= 0; i--) {
            if (pageInfo[i].url.indexOf('main') === -1) {
              pageInfo.splice(i, 1);
            } else {
              break;
            }
          }
        }
      }
      const lastData = pageInfo[pageInfo.length - 2];
      url = lastData.url;
      pageInfo.pop();
      this.mindManager.setPageInfo(pageInfo);
    } else {
      url = '/main/main/home';
    }
    return url;
  }

  async getToOtherPage(startUrl, lastUrl, title) {
    this.resetDatas(lastUrl, 'MOVE');
    let pageInfo = this.mindManager.getPageInfo();

    const data = {
      url: '',
      title: ''
    };
    if (pageInfo) {
      if (Object.keys(pageInfo).length === 0) {
        const startData: any = [
          {
            url: startUrl,
            title: '초기 페이지'
          },
          {
            url: lastUrl,
            title
          },
        ]
        await this.mindManager.setPageInfo(startData);
      } else {
        if (pageInfo.length === 0) {
          data.url = startUrl;
          data.title = '초기 페이지';
          pageInfo = [data];
          data.title = title;
          data.url = lastUrl;
          pageInfo.push(data);
        } else {
          data.title = title;
          data.url = lastUrl;
          pageInfo.push(data);
        }
        await this.mindManager.setPageInfo(pageInfo);
      }
    } else {
      const startData: any = [
        {
          url: startUrl,
          title: '초기 페이지'
        },
        {
          url: lastUrl,
          title
        },
      ]
      await this.mindManager.setPageInfo(startData);
    }
  }


  async resetPageInfo(data) {
    const pageInfo = [];
    if (data.length) {
      pageInfo.push(data);
    }
    this.resetDatas(null, 'RESET');
    await this.mindManager.setPageInfo(pageInfo);
  }

  async moveToTab(url, title) {
    if (url.indexOf('/main/main/diary') === -1) {
      this.resetDatas(url, 'MOVE');
    }
    const from = this.router.url;
    console.log(from);
    const fromArray = from.split('?');
    if (url === '/main/main/home') {
      const startData: any = [
        {
          url: '/main/main/home',
          title: '메인페이지/홈'
        }
      ];
      await this.mindManager.setPageInfo(startData);
    } else {
      if (fromArray[0].indexOf(url) === -1) {
        let pageInfo = this.mindManager.getPageInfo();

        const data = {
          url: '',
          title: ''
        };
        if (!Object.keys(pageInfo).length) {
          const startData: any = [
            {
              url: fromArray[0],
              title: '초기 페이지'
            },
            {
              url,
              title
            },
          ]
          await this.mindManager.setPageInfo(startData);
        } else {
          if (!pageInfo.length) {
            data.url = fromArray[0];
            data.title = '초기 페이지';
            pageInfo = [data];
            data.title = title;
            data.url = url;
            pageInfo.push(data);
          } else {
            for (let i = 0; i < pageInfo.length; i++) {
              if (pageInfo[i].url.indexOf(url) >= 0) {
                pageInfo.splice(i, 1);
              }
            }
            data.title = title;
            data.url = url;
            pageInfo.push(data);
          }
          await this.mindManager.setPageInfo(pageInfo);
        }
      }
    }
  }

  // 데이터 초기화--------------
  resetDatas(url, type) {
    if (type === 'MOVE') {
      // 다이어리 데이터
      if (url.indexOf('/main/main/diary') === -1 && url.indexOf('/panic-diary') === -1 && url.indexOf('/pattern-drinking') === -1 && url.indexOf('/pattern-caffeine') === -1
          && url.indexOf('/pattern-ex') === -1 && url.indexOf('/pattern-smoking') === -1 && url.indexOf('/pattern-meal') === -1 && url.indexOf('/pattern-period') === -1) {
        const diaryDateInfo = this.mindManager.getDateBinding();
        if (diaryDateInfo) {
          if ('dirayDate' in diaryDateInfo) {
            delete diaryDateInfo.dirayDate;
          }
          this.mindManager.setDateBinding(diaryDateInfo);
        }
      }
    } else {
      this.mindManager.setDateBinding({});
    }
  }


  async getStartUrl() {
    const from = this.router.url;
    const fromArray = from.split('?');
    return from;
  }

}
