import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IrbAgreeModalPageRoutingModule } from './irb-agree-modal-routing.module';

import { IrbAgreeModalPage } from './irb-agree-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IrbAgreeModalPageRoutingModule
  ],
  declarations: [IrbAgreeModalPage]
})
export class IrbAgreeModalPageModule {}
