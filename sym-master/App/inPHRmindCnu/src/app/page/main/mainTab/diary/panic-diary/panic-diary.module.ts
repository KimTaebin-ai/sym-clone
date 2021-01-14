import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PanicDiaryPageRoutingModule } from './panic-diary-routing.module';

import { PanicDiaryPage } from './panic-diary.page';
import {SignUpPageModule} from "../../../../auth/sign-up/sign-up.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PanicDiaryPageRoutingModule,
        SignUpPageModule
    ],
  declarations: [PanicDiaryPage]
})
export class PanicDiaryPageModule {}
