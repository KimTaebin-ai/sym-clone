import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageInfoService {

  constructor() { }

  getPageInfo(userData?: any) {
    const data:any = {
      home: {
        page_title: `${userData.name}님, 좋은 아침입니다!`,
      },
      diary: {
        page_title: '다이어리',
      }
    }

    return data;
  }
}
