import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SymptomInfoModalPageRoutingModule } from './symptom-info-modal-routing.module';

import { SymptomInfoModalPage } from './symptom-info-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SymptomInfoModalPageRoutingModule
  ],
  declarations: [SymptomInfoModalPage]
})
export class SymptomInfoModalPageModule {}
