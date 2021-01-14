import { Injectable } from '@angular/core';
import {RestApiService} from './rest-api.service';
import {UrlService} from './url.service';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {CredentialData} from '../data/credential.data';
import {MindManager} from '../mind.manager';
import {ProviderModel} from '../model/provider.model';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  constructor(
      private restApiService: RestApiService,
      private urlService: UrlService,
      private mindManager: MindManager
  ) { }

  // 디바이스 목록 조회
  getDeviceList(): Observable<any> {
    return this.restApiService.getDatas(environment.inPHRApi + '/api/device/device-total');
  }

  // 디바이스 목록 조회
  getPlatformList(): Observable<any> {
    return this.restApiService.getDatas(environment.inPHRApi + '/api/device/provider-total');
  }

  // -----------------------------------------------------------------------------------
  // Health Platform
  // -----------------------------------------------------------------------------------
  // Health Platform set creadential
  public setCreadential(providerName, credentialData: CredentialData) {
    if (providerName === 'fitbit') {
      const controller = this.mindManager.getController(providerName);
      console.log('controooooler', controller)
      controller.setCreadential(credentialData);
    }
  }

  // Health Platform synchronization
  public synchronization(providerModel: ProviderModel): Observable<any> {
    return new Observable<any>(observer => {
      const controller = this.mindManager.getController(providerModel.providerName);
      // 이미 동기화 중인지 체크
      if (controller.isSynchronization()) {
        observer.error('이미 동기화 진행중');
      } else {
        controller.synchronization(providerModel).subscribe(data => {
          observer.next(data);
          observer.complete();
        }, err => {
          observer.error(err);
        });
      }
    });
  }
}
