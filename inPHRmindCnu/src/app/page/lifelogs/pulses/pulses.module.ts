import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PulsesPageRoutingModule } from './pulses-routing.module';

import { PulsesPage } from './pulses.page';
import {SignUpPageModule} from '../../auth/sign-up/sign-up.module';
import {LifelogHeaderComponent} from '../../common/lifelog-header/lifelog-header.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PulsesPageRoutingModule,
        SignUpPageModule
    ],
    exports: [
        LifelogHeaderComponent
    ],
    declarations: [PulsesPage, LifelogHeaderComponent]
})
export class PulsesPageModule {}
