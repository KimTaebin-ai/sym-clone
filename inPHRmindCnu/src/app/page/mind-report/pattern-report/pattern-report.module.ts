import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatternReportPageRoutingModule } from './pattern-report-routing.module';

import { PatternReportPage } from './pattern-report.page';
import {SignUpPageModule} from "../../auth/sign-up/sign-up.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatternReportPageRoutingModule,
    SignUpPageModule
  ],
  declarations: [PatternReportPage]
})
export class PatternReportPageModule {}
