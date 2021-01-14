import { Injectable } from '@angular/core';
import {AlertController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertUtilService {

  constructor(private alertCtrl: AlertController) {
  }


  // 알림창
  async showAlert(header: string, message: string) {
    if (header === null) {
      header = '알림';
    }
    const bodyMessage = '<p class="alert-body">' + message + '</p>'
    const alert = await this.alertCtrl.create({
      header,
      message: bodyMessage,
      buttons: [
        {
          text: '닫기',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await alert.present();
  }
}
