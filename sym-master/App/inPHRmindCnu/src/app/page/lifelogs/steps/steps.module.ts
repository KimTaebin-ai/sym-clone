import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StepsPageRoutingModule } from './steps-routing.module';

import { StepsPage } from './steps.page';
import {SignUpPageModule} from '../../auth/sign-up/sign-up.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StepsPageRoutingModule,
    SignUpPageModule
  ],
  declarations: [StepsPage]
})
export class StepsPageModule {}
