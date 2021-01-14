import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatternSmokingPageRoutingModule } from './pattern-smoking-routing.module';

import { PatternSmokingPage } from './pattern-smoking.page';
import {SignUpPageModule} from '../../../../../auth/sign-up/sign-up.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PatternSmokingPageRoutingModule,
        SignUpPageModule
    ],
  declarations: [PatternSmokingPage]
})
export class PatternSmokingPageModule {}
