import { Injectable } from '@angular/core';
import {AlertController} from '@ionic/angular';
import {Toast} from '@ionic-native/toast/ngx';

@Injectable({
  providedIn: 'root'
})
export class AlertUtilService {

  constructor(
      private alertCtrl: AlertController,
      private toast: Toast
      
      ) {

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

  dismiss() {
    this.alertCtrl.dismiss();
  }

  showToast(message) {
    this.toast.show('자동로그인을 설정하여야 잠금 화면을 이용할 수 있습니다.', '5000', 'bottom').subscribe(
        toast => {
          console.log(toast, 'toast');
        }
    );
  }
}
