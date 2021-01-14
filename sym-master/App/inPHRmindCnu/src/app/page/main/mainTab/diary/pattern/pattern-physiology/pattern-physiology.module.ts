import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatternPhysiologyPageRoutingModule } from './pattern-physiology-routing.module';

import { PatternPhysiologyPage } from './pattern-physiology.page';
import {SignUpPageModule} from '../../../../../auth/sign-up/sign-up.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PatternPhysiologyPageRoutingModule,
        SignUpPageModule
    ],
  declarations: [PatternPhysiologyPage]
})
export class PatternPhysiologyPageModule {}
