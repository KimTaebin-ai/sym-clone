import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PsychologicalPageRoutingModule } from './psychological-routing.module';

import { PsychologicalPage } from './psychological.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PsychologicalPageRoutingModule
  ],
  declarations: [PsychologicalPage]
})
export class PsychologicalPageModule {}
