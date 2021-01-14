import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MemberInfoPageRoutingModule } from './member-info-routing.module';

import { MemberInfoPage } from './member-info.page';
import {SignUpPageModule} from '../../auth/sign-up/sign-up.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MemberInfoPageRoutingModule,
    SignUpPageModule
  ],
  declarations: [MemberInfoPage]
})
export class MemberInfoPageModule {}
