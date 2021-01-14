import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlatformSignUpPageRoutingModule } from './platform-sign-up-routing.module';

import { PlatformSignUpPage } from './platform-sign-up.page';
import {SignUpPageModule} from '../sign-up/sign-up.module';
import {DirectivesModule} from '../../../util/common/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlatformSignUpPageRoutingModule,
    SignUpPageModule,
    ReactiveFormsModule,
    DirectivesModule
  ],
  declarations: [
    PlatformSignUpPage,
  ]
})
export class PlatformSignUpPageModule {}
