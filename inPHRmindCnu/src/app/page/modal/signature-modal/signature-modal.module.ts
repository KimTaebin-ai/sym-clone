import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignatureModalPageRoutingModule } from './signature-modal-routing.module';

import { SignatureModalPage } from './signature-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignatureModalPageRoutingModule
  ],
  declarations: [SignatureModalPage]
})
export class SignatureModalPageModule {}
