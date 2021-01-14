import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiaryRegModalPageRoutingModule } from './diary-reg-modal-routing.module';

import { DiaryRegModalPage } from './diary-reg-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiaryRegModalPageRoutingModule
  ],
  declarations: [DiaryRegModalPage]
})
export class DiaryRegModalPageModule {}
