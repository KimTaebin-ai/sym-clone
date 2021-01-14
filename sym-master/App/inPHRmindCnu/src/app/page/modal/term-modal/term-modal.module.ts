import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermModalPageRoutingModule } from './term-modal-routing.module';

import { TermModalPage } from './term-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermModalPageRoutingModule
  ],
  declarations: [TermModalPage]
})
export class TermModalPageModule {}
