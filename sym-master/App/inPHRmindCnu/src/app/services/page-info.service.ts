import { Injectable } from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {MindManager} from '../mind-module/mind.manager';

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
    console.log(pageInfo)
    let value = '';
    if (pageInfo) {

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
    console.log(pageInfo)
    let url = '';
    if (pageInfo.length > 1) {
      if (pageInfo[pageInfo.length - 1].url.indexOf('main') >= 0 )  {
        if (pageInfo[pageInfo.length - 2].url.indexOf('main') === -1) {
          for (let i = pageInfo.length - 1; i >= 0; i--) {
            console.log(pageInfo);
            console.log(i);
            console.log(pageInfo.length);
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
      // toast 창
      url = 'TOAST';
    }
    return url;
  }

  async getToOtherPage(startUrl, lastUrl, title) {
    let pageInfo = this.mindManager.getPageInfo();

    const data = {
      url: '',
      title: ''
    };
    if (!Object.keys(pageInfo).length) {
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
      console.log(startData)
      await this.mindManager.setPageInfo(startData);
    } else {
      alert(pageInfo.length)
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

  }


  async resetPageInfo(data) {
    const pageInfo = [];
    pageInfo.push(data);
    await this.mindManager.setPageInfo(pageInfo);
  }

  async moveToTab(url, title) {
    const from = this.router.url;
    const fromArray = from.split('?');
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
        console.log(startData)
        await this.mindManager.setPageInfo(startData);
      } else {
        if (pageInfo.length === 0) {
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


  async getStartUrl() {
    const from = this.router.url;
    const fromArray = from.split('?');
    return from;
  }

}
