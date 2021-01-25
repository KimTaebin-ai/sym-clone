import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewTermPageRoutingModule } from './new-term-routing.module';

import { NewTermPage } from './new-term.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewTermPageRoutingModule
  ],
  declarations: [NewTermPage]
})
export class NewTermPageModule {}
