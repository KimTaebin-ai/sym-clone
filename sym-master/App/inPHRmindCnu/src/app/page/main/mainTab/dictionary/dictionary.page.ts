import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.page.html',
  styleUrls: ['./dictionary.page.scss'],
})
export class DictionaryPage implements OnInit {

  // ---증상백과-----------------------------------
  searchText = '';
  dictionaryList: any = [
    {
      dictionaryItem: '감각저하'
    },
    {
      dictionaryItem: '구내염'
    },
    {
      dictionaryItem: '근육통'
    },
    {
      dictionaryItem: '기침'
    },
    {
      dictionaryItem: '딸꾹질'
    },
    {
      dictionaryItem: '메스꺼움/구토'
    },
    {
      dictionaryItem: '미각의 변화'
    },
  ];
  dictionaryListCopy: any = [
    {
      dictionaryItem: '감각저하'
    },
    {
      dictionaryItem: '구내염'
    },
    {
      dictionaryItem: '근육통'
    },
    {
      dictionaryItem: '기침'
    },
    {
      dictionaryItem: '딸꾹질'
    },
    {
      dictionaryItem: '메스꺼움/구토'
    },
    {
      dictionaryItem: '미각의 변화'
    },
  ];
  constructor() { }

  ngOnInit() {
  }

  // ---증상백과-----------------------------------
  searchDictionary() {
    if (this.searchText) {
      const returnVal: any = [];
      for (let i = 0; i < this.dictionaryList.length; i++) {
        if (this.dictionaryList[i].dictionaryItem.indexOf(this.searchText) !== -1) {
          returnVal.push(this.dictionaryList[i]);
        }
      }
      this.dictionaryListCopy = returnVal;
    } else {
      this.dictionaryListCopy = this.dictionaryList;
    }
  }
  // ---------------------------------------------

}
