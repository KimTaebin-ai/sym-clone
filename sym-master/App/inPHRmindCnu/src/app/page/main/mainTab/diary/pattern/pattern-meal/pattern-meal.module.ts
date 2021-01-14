import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatternMealPageRoutingModule } from './pattern-meal-routing.module';

import { PatternMealPage } from './pattern-meal.page';
import {SignUpPageModule} from '../../../../../auth/sign-up/sign-up.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PatternMealPageRoutingModule,
        SignUpPageModule
    ],
  declarations: [PatternMealPage]
})
export class PatternMealPageModule {}
