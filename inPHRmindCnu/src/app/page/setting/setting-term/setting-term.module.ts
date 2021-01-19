import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingTermPageRoutingModule } from './setting-term-routing.module';

import { SettingTermPage } from './setting-term.page';
import {SignUpPageModule} from '../../auth/sign-up/sign-up.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SettingTermPageRoutingModule,
        SignUpPageModule
    ],
  declarations: [SettingTermPage]
})
export class SettingTermPageModule {}
