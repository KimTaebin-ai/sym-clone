import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoreInfoModalPageRoutingModule } from './more-info-modal-routing.module';

import { MoreInfoModalPage } from './more-info-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoreInfoModalPageRoutingModule
  ],
  declarations: [MoreInfoModalPage]
})
export class MoreInfoModalPageModule {}
