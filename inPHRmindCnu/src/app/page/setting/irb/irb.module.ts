import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IRBPageRoutingModule } from './irb-routing.module';

import { IRBPage } from './irb.page';
import {SignUpPageModule} from '../../auth/sign-up/sign-up.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IRBPageRoutingModule,
    SignUpPageModule
  ],
  declarations: [IRBPage]
})
export class IRBPageModule {}
