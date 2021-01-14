import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsertPulsePageRoutingModule } from './insert-pulse-routing.module';

import { InsertPulsePage } from './insert-pulse.page';
import {SignUpPageModule} from '../../auth/sign-up/sign-up.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsertPulsePageRoutingModule,
    SignUpPageModule,
    ReactiveFormsModule
  ],
  declarations: [InsertPulsePage]
})
export class InsertPulsePageModule {}
