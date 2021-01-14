import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsertStepPageRoutingModule } from './insert-step-routing.module';

import { InsertStepPage } from './insert-step.page';
import {SignUpPageModule} from '../../auth/sign-up/sign-up.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        InsertStepPageRoutingModule,
        SignUpPageModule
    ],
  declarations: [InsertStepPage]
})
export class InsertStepPageModule {}
