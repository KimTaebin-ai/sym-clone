import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsertPsychologicalScalePageRoutingModule } from './insert-psychological-scale-routing.module';

import { InsertPsychologicalScalePage } from './insert-psychological-scale.page';
import {SignUpPageModule} from '../../auth/sign-up/sign-up.module';
import {LoadingPageModule} from '../../common/loading/loading.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        InsertPsychologicalScalePageRoutingModule,
        SignUpPageModule,
        LoadingPageModule
    ],
  declarations: [InsertPsychologicalScalePage]
})
export class InsertPsychologicalScalePageModule {}
