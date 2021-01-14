import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlarmPageRoutingModule } from './alarm-routing.module';

import { AlarmPage } from './alarm.page';
import {SignUpPageModule} from '../../../auth/sign-up/sign-up.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AlarmPageRoutingModule,
        SignUpPageModule
    ],
  declarations: [AlarmPage]
})
export class AlarmPageModule {}
