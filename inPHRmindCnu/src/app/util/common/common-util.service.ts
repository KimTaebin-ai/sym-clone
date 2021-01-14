import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonUtilService {

  constructor() { }

  /*딜레이*/
  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log('fired'));
  }
}
