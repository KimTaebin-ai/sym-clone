import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalController, Platform} from '@ionic/angular';
import {AlertUtilService} from '../../../util/common/alert-util.service';
import {EventBusService} from '../../../services/event-bus.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-signature-modal',
  templateUrl: './signature-modal.page.html',
  styleUrls: ['./signature-modal.page.scss'],
})
export class SignatureModalPage implements OnInit {
  @ViewChild('signatureCanvas') canvasEL: any;
  @ViewChild('fixedContainer') fixedContainer: any;
  saveX: number;
  saveY: number;
  signatureImg: any;
  _CONTEXT: any;
  drawingYn = 0;

  // 이벤트 버스
  eventSubscription: Subscription;

  constructor(
      private plt: Platform,
      private alertUtilService: AlertUtilService,
      private modalCtrl: ModalController,
      private eventBusService: EventBusService
  ) { }
  private canvasElement: any;

  ngOnInit() {
    this.eventSubscription = this.eventBusService.modal$.subscribe(event => {
      if (event === 'OFF') {
        this.modalCtrl.dismiss({
          dismissed: true
        });
      }
    });
  }

  ionViewDidEnter() {
    this.canvasElement = this.canvasEL.nativeElement;
    console.log(this.canvasElement)
    this.canvasElement.width = document.getElementById('signature').clientWidth;
    this.canvasElement.height = document.getElementById('signature').clientHeight;
    document.querySelector('.signature-page').shadowRoot.querySelector('.scroll-y').setAttribute('style','overflow: hidden !important;');
  }


  startDrawing(ev) {
    console.log(this.canvasElement)
    const canvasPosition = this.canvasElement.getBoundingClientRect();
    this.saveX = ev.touches[0].pageX - canvasPosition.x;
    this.saveY = ev.touches[0].pageY - canvasPosition.y;
  }

  moved(ev) {
    this.drawingYn++;
    console.log(this.drawingYn)
    const canvasPosition = this.canvasElement.getBoundingClientRect();

    const ctx = this.canvasElement.getContext('2d');
    const currentX = ev.touches[0].pageX - canvasPosition.x;
    const currentY = ev.touches[0].pageY - canvasPosition.y;

    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 5;

    ctx.beginPath();
    ctx.moveTo(this.saveX, this.saveY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();

    ctx.stroke();

    this.saveX = currentX;
    this.saveY = currentY;
  }

  savePad() {
    if (this.drawingYn < 30) {
      this.alertUtilService.showAlert(null, '올바른 서명을 해주세요.');
      this.clearPad();
      return false;
    }

    const dataUrl = this.canvasElement.toDataURL();
    this.signatureImg = dataUrl;
    const ctx = this.canvasElement.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clears the canvas
    const returnInfo: any = {
      img: dataUrl
    }
    this.modalCtrl.dismiss({
      dismissed: true,
      data : returnInfo,
    });
  }

  clearPad() {
    this.drawingYn = 0;
    this._CONTEXT = this.canvasElement.getContext('2d');
    this._CONTEXT.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
      data : null
    });
  }

}
