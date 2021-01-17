import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageHeaderPageRoutingModule } from './page-header-routing.module';

import { PageHeaderPage } from './page-header.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageHeaderPageRoutingModule
  ],
  declarations: [PageHeaderPage]
})
export class PageHeaderPageModule {}
