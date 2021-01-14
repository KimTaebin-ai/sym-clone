import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SleepsPageRoutingModule } from './sleeps-routing.module';

import { SleepsPage } from './sleeps.page';
import {SignUpPageModule} from '../../auth/sign-up/sign-up.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SleepsPageRoutingModule,
    SignUpPageModule
  ],
  declarations: [SleepsPage]
})
export class SleepsPageModule {}
