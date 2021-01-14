import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SnsSignUpPageRoutingModule } from './sns-sign-up-routing.module';

import { SnsSignUpPage } from './sns-sign-up.page';
import {SignUpPageModule} from '../sign-up/sign-up.module';
import {DirectivesModule} from '../../../util/common/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SnsSignUpPageRoutingModule,
    SignUpPageModule,
    ReactiveFormsModule,
    DirectivesModule
  ],
  declarations: [
    SnsSignUpPage,
  ]
})
export class SnsSignUpPageModule {}
