import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatternDringingPageRoutingModule } from './pattern-dringing-routing.module';

import { PatternDringingPage } from './pattern-dringing.page';
import {SignUpPageModule} from '../../../../../auth/sign-up/sign-up.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatternDringingPageRoutingModule,
    SignUpPageModule
  ],
  declarations: [PatternDringingPage]
})
export class PatternDringingPageModule {}
