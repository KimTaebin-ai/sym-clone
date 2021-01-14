import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiaryPageRoutingModule } from './diary-routing.module';

import { DiaryPage } from './diary.page';
import {Tab2PageModule} from '../tab2/tab2.module';
import {HomePageModule} from '../home/home.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DiaryPageRoutingModule,
        Tab2PageModule,
        HomePageModule
    ],
  declarations: [DiaryPage]
})
export class DiaryPageModule {}
