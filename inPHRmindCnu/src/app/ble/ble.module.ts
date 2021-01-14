import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlePageRoutingModule } from './ble-routing.module';

import { BlePage } from './ble.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlePageRoutingModule
  ],
  declarations: [BlePage]
})
export class BlePageModule {}
