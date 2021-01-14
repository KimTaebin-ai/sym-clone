import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatternCaffeinePageRoutingModule } from './pattern-caffeine-routing.module';

import { PatternCaffeinePage } from './pattern-caffeine.page';
import {SignUpPageModule} from '../../../../../auth/sign-up/sign-up.module';
import {LoadingPageModule} from "../../../../../common/loading/loading.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PatternCaffeinePageRoutingModule,
        SignUpPageModule,
        LoadingPageModule
    ],
  declarations: [PatternCaffeinePage]
})
export class PatternCaffeinePageModule {}
