import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PageInfoService {

  constructor(private router: Router) { 
  }


  getPageInfo(type: string) {
    const pageInfo = '';
    let value = '';
    
    if (pageInfo.length && type === 'title') {
      // value = pageInfo[pageInfo.length - 1].title;
    }
  }
}
