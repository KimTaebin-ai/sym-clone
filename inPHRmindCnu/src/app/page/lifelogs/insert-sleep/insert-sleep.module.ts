import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsertSleepPageRoutingModule } from './insert-sleep-routing.module';

import { InsertSleepPage } from './insert-sleep.page';
import {SignUpPageModule} from '../../auth/sign-up/sign-up.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsertSleepPageRoutingModule,
    SignUpPageModule
  ],
  declarations: [InsertSleepPage]
})
export class InsertSleepPageModule {}
