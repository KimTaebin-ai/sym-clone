import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeviceConnectionPageRoutingModule } from './device-connection-routing.module';

import { DeviceConnectionPage } from './device-connection.page';
import {SignUpPageModule} from '../../auth/sign-up/sign-up.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeviceConnectionPageRoutingModule,
    SignUpPageModule
  ],
  declarations: [DeviceConnectionPage]
})
export class DeviceConnectionPageModule {}
