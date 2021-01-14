import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateIrbPageRoutingModule } from './update-irb-routing.module';

import { UpdateIrbPage } from './update-irb.page';
import {SignUpPageModule} from '../sign-up/sign-up.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateIrbPageRoutingModule,
    SignUpPageModule
  ],
  declarations: [UpdateIrbPage]
})
export class UpdateIrbPageModule {}
