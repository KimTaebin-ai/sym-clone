import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubScaleListPageRoutingModule } from './sub-scale-list-routing.module';

import { SubScaleListPage } from './sub-scale-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubScaleListPageRoutingModule
  ],
  declarations: [SubScaleListPage]
})
export class SubScaleListPageModule {}
