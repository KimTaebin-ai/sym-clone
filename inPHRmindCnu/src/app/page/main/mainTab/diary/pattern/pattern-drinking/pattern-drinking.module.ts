import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import {SignUpPageModule} from '../../../../../auth/sign-up/sign-up.module';
import {PatternDrinkingPage} from './pattern-drinking.page';
import {PatternDrinkingPageRoutingModule} from './pattern-dringing-routing.module';
import {LoadingPageModule} from "../../../../../common/loading/loading.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PatternDrinkingPageRoutingModule,
        SignUpPageModule,
        LoadingPageModule
    ],
  declarations: [PatternDrinkingPage]
})
export class PatternDrinkingPageModule {}
