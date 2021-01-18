import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiaryPageRoutingModule } from './diary-routing.module';

import { DiaryPage } from './diary.page';
import { TemplatePage } from 'src/app/common/template/template.page';
import { HeaderComponent } from 'src/app/common/header/header.component';
import { TabsPage } from 'src/app/common/tabs/tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiaryPageRoutingModule
  ],
  declarations: [DiaryPage, TemplatePage, HeaderComponent, TabsPage]
})
export class DiaryPageModule {}
