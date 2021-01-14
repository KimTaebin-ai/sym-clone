import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegCompletedPageRoutingModule } from './reg-completed-routing.module';

import { RegCompletedPage } from './reg-completed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegCompletedPageRoutingModule
  ],
  declarations: [RegCompletedPage]
})
export class RegCompletedPageModule {}
