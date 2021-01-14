import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatternExPageRoutingModule } from './pattern-ex-routing.module';

import { PatternExPage } from './pattern-ex.page';
import {SignUpPageModule} from '../../../../../auth/sign-up/sign-up.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PatternExPageRoutingModule,
        SignUpPageModule
    ],
  declarations: [PatternExPage]
})
export class PatternExPageModule {}
