import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScaleSubListPageRoutingModule } from './scale-sub-list-routing.module';

import { ScaleSubListPage } from './scale-sub-list.page';
import {SignUpPageModule} from '../../auth/sign-up/sign-up.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScaleSubListPageRoutingModule,
    SignUpPageModule
  ],
  declarations: [ScaleSubListPage]
})
export class ScaleSubListPageModule {}
