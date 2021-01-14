import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IrbAgreePageRoutingModule } from './irb-agree-routing.module';

import { IrbAgreePage } from './irb-agree.page';
import {SignUpPageModule} from '../sign-up/sign-up.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        IrbAgreePageRoutingModule,
        SignUpPageModule
    ],
  declarations: [IrbAgreePage]
})
export class IrbAgreePageModule {}
