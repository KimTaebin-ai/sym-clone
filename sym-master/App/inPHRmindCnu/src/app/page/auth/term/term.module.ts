import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermPageRoutingModule } from './term-routing.module';

import { TermPage } from './term.page';
import {SignUpPageModule} from '../sign-up/sign-up.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TermPageRoutingModule,
        SignUpPageModule
    ],
  declarations: [TermPage]
})
export class TermPageModule {}
