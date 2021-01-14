import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PsychologicalScalePageRoutingModule } from './psychological-scale-routing.module';

import { PsychologicalScalePage } from './psychological-scale.page';
import {Tab2PageModule} from '../tab2/tab2.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PsychologicalScalePageRoutingModule,
        Tab2PageModule
    ],
    declarations: [PsychologicalScalePage]
})
export class PsychologicalScalePageModule {}
