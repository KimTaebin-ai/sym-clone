import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { LoginInputComponent } from '../../components/auth/login-input/login-input.component';
import { LoginFindComponent } from '../../components/auth/login-find/login-find.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule
  ],
  declarations: [LoginPage, LoginInputComponent, LoginFindComponent]
})
export class LoginPageModule {}
