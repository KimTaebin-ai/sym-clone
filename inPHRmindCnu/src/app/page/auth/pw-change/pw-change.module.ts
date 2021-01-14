import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PwChangePageRoutingModule } from './pw-change-routing.module';

import { PwChangePage } from './pw-change.page';
import {SignUpPageModule} from "../sign-up/sign-up.module";
import {LoadingPageModule} from "../../common/loading/loading.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PwChangePageRoutingModule,
        SignUpPageModule,
        ReactiveFormsModule,
        LoadingPageModule
    ],
  declarations: [PwChangePage]
})
export class PwChangePageModule {}
