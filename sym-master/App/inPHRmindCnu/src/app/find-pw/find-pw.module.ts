import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindPwPageRoutingModule } from './find-pw-routing.module';

import { FindPwPage } from './find-pw.page';
import {SignUpPageModule} from '../page/auth/sign-up/sign-up.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FindPwPageRoutingModule,
        ReactiveFormsModule,
        SignUpPageModule
    ],
  declarations: [FindPwPage]
})
export class FindPwPageModule {}
