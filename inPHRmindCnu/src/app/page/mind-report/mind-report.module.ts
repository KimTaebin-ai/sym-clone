import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MindReportPageRoutingModule } from './mind-report-routing.module';

import { MindReportPage } from './mind-report.page';
import {Tab2PageModule} from '../main/mainTab/tab2/tab2.module';
import {HomePageModule} from '../main/mainTab/home/home.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MindReportPageRoutingModule,
        Tab2PageModule,
        HomePageModule
    ],
    declarations: [MindReportPage]
})
export class MindReportPageModule {}
