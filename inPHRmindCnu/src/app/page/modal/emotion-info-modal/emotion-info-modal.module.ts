import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmotionInfoModalPageRoutingModule } from './emotion-info-modal-routing.module';

import { EmotionInfoModalPage } from './emotion-info-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmotionInfoModalPageRoutingModule
  ],
  declarations: [EmotionInfoModalPage]
})
export class EmotionInfoModalPageModule {}
