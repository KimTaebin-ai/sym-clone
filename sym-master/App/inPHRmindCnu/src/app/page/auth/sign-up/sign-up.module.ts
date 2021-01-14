import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpPageRoutingModule } from './sign-up-routing.module';

import { SignUpPage } from './sign-up.page';
import {PageHeaderComponent} from '../../common/page-header/page-header.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SignUpPageRoutingModule
    ],
    exports: [
        PageHeaderComponent
    ],
    declarations: [SignUpPage, PageHeaderComponent]
})
export class SignUpPageModule {}
