import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import {SignUpPageModule} from '../../../../../auth/sign-up/sign-up.module';
import {PatternPeriodPageRoutingModule} from './pattern-period-routing.module';
import {PatternPeriodPage} from './pattern-period.page';
import {LoadingPageModule} from "../../../../../common/loading/loading.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PatternPeriodPageRoutingModule,
        SignUpPageModule,
        LoadingPageModule
    ],
  declarations: [PatternPeriodPage]
})
export class PatternPeriodPageModule {}
