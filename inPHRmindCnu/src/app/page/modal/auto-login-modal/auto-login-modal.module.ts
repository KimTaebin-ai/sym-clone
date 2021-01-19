import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AutoLoginModalPageRoutingModule } from './auto-login-modal-routing.module';

import { AutoLoginModalPage } from './auto-login-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutoLoginModalPageRoutingModule
  ],
  declarations: [AutoLoginModalPage]
})
export class AutoLoginModalPageModule {}
